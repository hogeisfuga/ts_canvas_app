import { CONSTANTS } from "./config/constants";
import { DrawingsManager } from "./drawingsManager";
import { Drawable } from "./shapes/drawable";
type CanvasProps = {
  canvasId: string 
}

export class Canvas {
  #canvasElm: HTMLCanvasElement
  #context: CanvasRenderingContext2D
  #drawingsManager: DrawingsManager
  

  constructor(props: CanvasProps) {
    this.#canvasElm = document.getElementById(props.canvasId)! as HTMLCanvasElement
    this.#context = this.#canvasElm.getContext("2d")!
    this.#canvasElm.width = CONSTANTS.CANVAS.WIDTH
    this.#canvasElm.height = CONSTANTS.CANVAS.HEIGHT
    this.#drawingsManager = new DrawingsManager()
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

  clear = () => {
    this.#context.clearRect(0, 0, this.#canvasElm.width, this.#canvasElm.height)
  }

  draw = () => {
    this.clear()
    const drawings = this.#drawingsManager.getAllDrawings()
    drawings.forEach(drawing => drawing.draw(this.#context))
  }
}
