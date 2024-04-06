import { Canvas } from "./canvas"
import { DrawCommand } from "./commands/drawCommand"
import { RedoManager } from "./redoManager"
import { UndoManager } from "./undoManager"

type CanvasInvokerProps = {
  undoManager: UndoManager
  redoManager: RedoManager
  canvas: Canvas
}

export class CanvasInvoker {
  #undoManager: UndoManager
  #redoManager: RedoManager
  #canvas: Canvas
  
  constructor(props: CanvasInvokerProps) {
    this.#undoManager = props.undoManager
    this.#redoManager = props.redoManager
    this.#canvas = props.canvas
  }

  execute = (cmd: DrawCommand) => {
    cmd.execute(this.#canvas)
    this.#redoManager.clear()
    this.#undoManager.add(cmd)
    this.#canvas.draw()
  }

  undo = () => {
    const cmd = this.#undoManager.pop()
    if (cmd) {
      cmd.undo(this.#canvas)
      this.#redoManager.add(cmd)
    }
    this.#canvas.draw()
  }

  redo = () => {
    const cmd = this.#redoManager.pop()
    if (cmd) {
      console.log(cmd)
      cmd.execute(this.#canvas)
    }
    this.#canvas.draw()
  }

}