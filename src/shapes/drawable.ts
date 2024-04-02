export interface Drawable {
  id: string
  draw: (ctx: CanvasRenderingContext2D) => void
}