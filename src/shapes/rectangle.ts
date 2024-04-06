import { Canvas } from "../canvas";
import { Drawable } from "./drawable"
import { v4 as uuidv4 } from 'uuid';

export type RectangleProps = {
  id?: string,
  x: number,
  y: number,
  color?: string,
  width: number,
  height: number
}

export type UpdateRectangleProps = Partial<Omit<RectangleProps, 'id'>>

export class Reactangle implements Drawable {
  #x: number
  #y: number
  #color: string
  #width: number
  #height: number
  #id: string

  constructor(props: RectangleProps) {
    const {id, x, y, color, width, height} = props
    this.#x = x
    this.#y = y
    this.#color = color || "#6C0"
    this.#width = width
    this.#height = height
    this.#id = id || uuidv4()
  }

  // getter
  get id() { return this.#id }
  get x() { return this.#x }
  get y() { return this.#y }
  get color() { return this.#color }
  get width() { return this.#width }
  get height() { return this.#height }

  update = (props: UpdateRectangleProps) => {
    Object.entries(props).forEach(([key, value]) => {
      if (key === "x") this.#x = value as number
      if (key === "y") this.#y = value as number
      if (key === "color") this.#color = value as string
      if (key === "width") this.#width = value as number
      if (key === "height") this.#height = value as number
    })
  }

  draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = this.#color
    ctx.fillRect(this.#x, this.#y, this.#width, this.#height)
  }

  static copy = (original: Reactangle) => {
    return new Reactangle({
      x: original.x,
      y: original.y,
      color: original.color,
      width: original.width,
      height: original.height,
      id: original.id
    })
  }
}