import { Canvas } from "../canvas";
import { Drawable } from "./drawable"
import { v4 as uuidv4 } from 'uuid';

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
  draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = this.#color
    ctx.fillRect(this.#x, this.#y, this.#width, this.#height)
  }
}