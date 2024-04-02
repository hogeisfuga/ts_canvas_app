import { Canvas } from "../canvas"
import { Drawable } from "../shapes/drawable"
import { DrawCommand } from "./drawCommand"

export class DrawableCreateCommand implements DrawCommand {
  #drawings: Drawable[]

  constructor(drawings: Drawable[]) {
    this.#drawings = drawings
  }

  execute = (canvas: Canvas) => {
    canvas.add([...this.#drawings])
  }

  undo = (canvas: Canvas) => {
    console.log("here!")
    console.log(this.#drawings)
    canvas.remove(this.#drawings.map(drawing => drawing.id))
  }
}