import { Canvas } from "../canvas"
import { Drawable } from "../shapes/drawable"
import { DrawCommand } from "./drawCommand"

export class DrawableCreateCommand implements DrawCommand {
  #drawings: Drawable[]
  #canvas: Canvas

  constructor(canvas: Canvas,drawings: Drawable[]) {
    this.#canvas = canvas
    this.#drawings = drawings
  }

  execute = () => {
    this.#canvas.add([...this.#drawings])
  }

  undo = () => {
    this.#canvas.remove(this.#drawings.map(drawing => drawing.id))
  }
}