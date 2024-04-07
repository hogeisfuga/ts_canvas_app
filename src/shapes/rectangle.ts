import clone from "just-clone";
import { Drawable } from "./drawable"
import { v4 as uuidv4 } from 'uuid';

export type RectangleProps = {
  id?: string,
  x: number,
  y: number,
  strokeColor: string,
  fillColor: string,
  width: number,
  height: number
}

export type UpdateRectangleProps = Partial<Omit<RectangleProps, 'id'>>

export class Reactangle implements Drawable {
  #x: number
  #y: number
  #strokeColor: string
  #fillColor: string
  #width: number
  #height: number
  #id: string

  constructor(props: RectangleProps) {
    const {id, x, y, strokeColor, fillColor, width, height} = props
    this.#x = x
    this.#y = y
    this.#strokeColor = strokeColor
    this.#fillColor = fillColor
    this.#width = width
    this.#height = height
    this.#id = id || uuidv4()
  }

  // getter
  get id() { return this.#id }
  get x() { return this.#x }
  get y() { return this.#y }
  get strokeColor() { return this.#strokeColor }
  get fillColor() { return this.#fillColor }
  get width() { return this.#width }
  get height() { return this.#height }

  update = (props: UpdateRectangleProps) => {
    Object.entries(props).forEach(([key, value]) => {
      if (key === "x") this.#x = value as number
      if (key === "y") this.#y = value as number
      if (key === "strokeColor") this.#strokeColor = value as string
      if (key === "fillColor") this.#fillColor = value as string
      if (key === "width") this.#width = value as number
      if (key === "height") this.#height = value as number
    })
  }

  draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = this.#fillColor
    ctx.strokeStyle = this.#strokeColor
    ctx.beginPath()
    ctx.roundRect(this.#x, this.#y, this.#width, this.#height, 10)
    ctx.stroke()
    ctx.fill()
  }

  static clone = (original: Reactangle) => {
    return clone(original)
  }
}