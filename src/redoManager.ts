import { DrawCommand } from "./commands/drawCommand"

export class RedoManager {
  
  #redoStack: Array<DrawCommand>
  
  constructor() {
    this.#redoStack = []
  }

  add = (cmd: DrawCommand) => {
    console.log("redo pushed")
    this.#redoStack.push(cmd)
  }

  pop = () => {
    return this.#redoStack.pop()
  }

  clear = () => {
    this.#redoStack = []
  }
}