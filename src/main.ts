import { Canvas } from "./canvas"
import { DrawableCreateCommand } from "./commands/drawCreateCommand"
import { DrawableUpdateCommand } from "./commands/drawUpdateCommend"
import { Reactangle } from "./shapes/rectangle"


const canvas = new Canvas({canvasId: 'myCanvas'})
const rectangle = new Reactangle({x: 100, y:100, width:50, height:50})
canvas.execute(new DrawableCreateCommand([rectangle]))

const rectangle2 = new Reactangle({x: 150, y:200, width:50, height:50, color: "#f50"})
canvas.execute(new DrawableCreateCommand([rectangle2]))

const copiedProps = {x: rectangle2.x, y: rectangle2.y, width: rectangle2.width, height: rectangle2.height, id: rectangle2.id, color: rectangle2.color}
const updatedRectangle = new Reactangle(copiedProps)

updatedRectangle.color = '#ff4'
updatedRectangle.x = 33
updatedRectangle.width = 111
canvas.execute(new DrawableUpdateCommand([updatedRectangle]))

canvas.undo()
canvas.undo()
canvas.undo()
canvas.redo()
canvas.redo()
canvas.redo()
