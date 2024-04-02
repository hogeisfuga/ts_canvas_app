import { Drawable } from "./shapes/drawable"

export class DrawingsManager {
  #drawings: Array<Drawable>

  constructor() {
    this.#drawings = []
  }

  getAllDrawings = () => {
    return [...this.#drawings]
  }

  getDrawingById = (id: string) => {
    return this.#drawings.find(drawing => drawing.id === id)
  }

  add = (drawings: Drawable[]) => {
    this.#drawings.push(...drawings)
  }

  /**
   * replace extinting drawings with updated ones
   * @param drawings 
   */
  replace = (drawings: Drawable[]) => {
    const ids = drawings.map(drawing => drawing.id )
    this.#drawings = this.#drawings.filter(drawing => !ids.includes(drawing.id))
    this.#drawings.push(...drawings)
  }

  remove = (ids: string[]) => {
    this.#drawings = this.#drawings.filter(drawing => !ids.includes(drawing.id))
  }
}