import { DrawCommand } from "./commands/drawCommand";
import { DrawingsManager } from "./drawingsManager";
import { Drawable } from "./shapes/drawable";
import { UndoManager } from "./undoManager";
import { RedoManager } from "./redoManager";

type CanvasProps = {
  canvasId: string 
}

export class Canvas {
  #canvasElm: HTMLCanvasElement
  #context: CanvasRenderingContext2D
  #drawingsManager: DrawingsManager
  #undoManager: UndoManager
  #redoManager: RedoManager
  

  constructor(props: CanvasProps) {
    this.#canvasElm = document.getElementById(props.canvasId)! as HTMLCanvasElement
    this.#context = this.#canvasElm.getContext("2d")!
    this.#canvasElm.width = 500
    this.#canvasElm.height = 500
    this.#drawingsManager = new DrawingsManager()
    this.#undoManager = new UndoManager()
    this.#redoManager = new RedoManager()
  }

  /**
   * delegate to DrawingsManager
   * @param drawings 
   */
  add = (drawings: Drawable[]) => {
    this.#drawingsManager.add(drawings)
  }
  
  /**
   * delegate to DrawingsManager
   */
  remove = (ids: string[]) => {
    this.#drawingsManager.remove(ids)
  }

  /**
   * delegate to DrawingsManager
   */
  replace = (drawings: Drawable[]) => {
    this.#drawingsManager.replace(drawings)
  }

  findDrawingById = (id: string) => {
    return this.#drawingsManager.getDrawingById(id)
  }

  execute = (cmd: DrawCommand) => {
    cmd.execute(this)
    this.#redoManager.clear()
    this.#undoManager.add(cmd)
    this.#draw()
  }

  undo = () => {
    const cmd = this.#undoManager.pop()
    if (cmd) {
      cmd.undo(this)
      this.#redoManager.add(cmd)
    }
    this.#draw()
  }

  redo = () => {
    const cmd = this.#redoManager.pop()
    if (cmd) {
      console.log(cmd)
      cmd.execute(this)
    }
    this.#draw()
  }


  clear = () => {
    this.#context.clearRect(0, 0, this.#canvasElm.width, this.#canvasElm.height)
  }

  #draw = () => {
    this.clear()
    const drawings = this.#drawingsManager.getAllDrawings()
    drawings.forEach(drawing => drawing.draw(this.#context))
  }
}
