import { Canvas } from "../canvas"
import { Drawable } from "../shapes/drawable"
import { DrawCommand } from "./drawCommand"

export class DrawableUpdateCommand implements DrawCommand {
  #drawings: Drawable[]
  #olds: Drawable[]

  constructor(drawings: Drawable[]) {
    this.#drawings = drawings
    this.#olds = []
    
  }

  execute = (canvas: Canvas) => {
    this.#drawings.forEach(d => {
      const old = canvas.findDrawingById(d.id)
      if(old != null) this.#olds.push(old)
    })

    canvas.replace([...this.#drawings])
  }

  undo = (canvas: Canvas) => {
    console.log(this.#olds[0])
    canvas.replace(this.#olds)
  }

}