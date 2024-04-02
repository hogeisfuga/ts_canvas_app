import { Canvas } from "../canvas"

export interface DrawCommand {
  execute: (canvas: Canvas) => void
  undo: (canvas: Canvas) => void
}