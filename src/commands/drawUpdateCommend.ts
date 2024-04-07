import { Canvas } from "../canvas"
import { Drawable } from "../shapes/drawable"
import { DrawCommand } from "./drawCommand"

export class DrawableUpdateCommand implements DrawCommand {
  #drawings: Drawable[]
  #olds: Drawable[]
  #canvas: Canvas

  constructor(canvas: Canvas, drawings: Drawable[]) {
    this.#drawings = drawings
    this.#olds = []
    this.#canvas = canvas
    
  }

  execute = () => {
    this.#drawings.forEach(d => {
      const old = this.#canvas.findDrawingById(d.id)
      if(old != null) this.#olds.push(old)
    })

    this.#canvas.replace([...this.#drawings])
  }

  undo = () => {
    this.#canvas.replace(this.#olds)
  }

}