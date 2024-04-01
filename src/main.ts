import { v4 as uuidv4 } from 'uuid';

interface Drawable {
  id: string
  draw: (canvas: Canvas) => void
}

export class DrawingsManager {
  #drawings: Array<Drawable>

  constructor() {
    this.#drawings = []
  }

  getAllDrawings = () => {
    return [...this.#drawings]
  }

  add = (drawings: Drawable[]) => {
    this.#drawings.push(...drawings)
  }

  /**
   * replace extinting drawings with updated ones
   * @param drawings 
   */
  replace = (drawings: Drawable[]) => {
    const ids = drawings.map(drawing => drawing.id )
    this.#drawings = this.#drawings.filter(drawing => !ids.includes(drawing.id))
    this.#drawings.push(...drawings)
    
  }

  remove = (ids: string[]) => {
    this.#drawings = this.#drawings.filter(drawing => !ids.includes(drawing.id))
  }
}

type CanvasProps = {
  canvasId: string 
}
export class Canvas {
  #canvas: HTMLCanvasElement
  #context: CanvasRenderingContext2D
  #DrawingsManager: DrawingsManager;
  

  constructor(props: CanvasProps) {
    this.#canvas = document.getElementById(props.canvasId)! as HTMLCanvasElement
    this.#context = this.#canvas.getContext("2d")!
    this.#canvas.width = 500
    this.#canvas.height = 500
    this.#DrawingsManager = new DrawingsManager()
  }

  getContext = () => this.#context

  /**
   * delegate to DrawingsManager
   * @param drawings 
   */
  add = (drawings: Drawable[]) => {
    this.#DrawingsManager.add(drawings)
  }
  
  /**
   * delegate to DrawingsManager
   */
  remove = (ids: string[]) => {
    this.#DrawingsManager.remove(ids)
  }

  replace = (drawings: Drawable[]) => {
    this.#DrawingsManager.replace(drawings)
  }

  execute = (cmd: DrawCommand) => {
    cmd.execute(this)
    this.#draw()
  }

  clear = () => {
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
  }

  #draw = () => {
    this.clear()
    const drawings = this.#DrawingsManager.getAllDrawings()
    drawings.forEach(drawing => drawing.draw(this))
  }
}

export interface DrawCommand {
  execute: (canvas: Canvas) => void
  undo: (canvas: Canvas) => void
}

export type RectangleProps = {
  x: number,
  y: number,
  color?: string,
  width: number,
  height: number
}

export class Reactangle implements Drawable {
  #x: number
  #y: number
  #color: string
  #width: number
  #height: number
  #id: string

  set x(x: number) {
    this.#x = x
  }

  set y(y: number) {
    this.y = y
  }

  set color(color: string) {
    this.#color = color
  }

  set width(width: number) {
    this.#width = width
  }

  set height(height: number) {
    this.#height = height
  }

  get id() {
    return this.#id
  }

  constructor(props: RectangleProps) {
    const {x, y, color, width, height} = props
    this.#x = x
    this.#y = y
    this.#color = color || "#6C0"
    this.#width = width
    this.#height = height
    this.#id = uuidv4()
  }
  draw = (canvas: Canvas) => {
    const ctx = canvas.getContext()
    ctx.fillStyle = this.#color
    ctx.fillRect(this.#x, this.#y, this.#width, this.#height)
  }
}

class DrawableCreateCommand implements DrawCommand {
  #drawings: Drawable[]

  constructor(drawings: Drawable[]) {
    this.#drawings = drawings
  }

  execute = (canvas: Canvas) => {
    canvas.add([...this.#drawings])
  }

  undo = (canvas: Canvas) => {
    canvas.remove(this.#drawings.map(drawing => drawing.id))
  }
}

class DrawableUpdateCommand implements DrawCommand {
  #drawings: Drawable[]

  constructor(drawings: Drawable[]) {
    this.#drawings = drawings
  }

  execute = (canvas: Canvas) => {
    canvas.replace([...this.#drawings])
  }

  undo = (canvas: Canvas) => {
    canvas.remove(this.#drawings.map(drawing => drawing.id))
  }

}


const canvas = new Canvas({canvasId: 'myCanvas'})
const rectangle = new Reactangle({x: 100, y:100, width:50, height:50})
canvas.execute(new DrawableCreateCommand([rectangle]))

const rectangle2 = new Reactangle({x: 150, y:200, width:50, height:50, color: "#f50"})
canvas.execute(new DrawableCreateCommand([rectangle2]))

rectangle2.color = '#ff45'
rectangle2.width = 100
canvas.execute(new DrawableUpdateCommand([rectangle2]))