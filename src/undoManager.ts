import { DrawCommand } from "./commands/drawCommand"

export class UndoManager {
  
  #undoStack: Array<DrawCommand>
  
  constructor() {
    this.#undoStack = []
  }

  add = (cmd: DrawCommand) => {
    console.log("added")
    this.#undoStack.push(cmd)
  }

  pop = () => {
    return this.#undoStack.shift()
  }
}