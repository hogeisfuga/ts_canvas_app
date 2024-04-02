import { Canvas } from "./canvas"
import { DrawableCreateCommand } from "./commands/drawCreateCommand"
import { DrawableUpdateCommand } from "./commands/drawUpdateCommend"
import { Reactangle } from "./shapes/rectangle"


const canvas = new Canvas({canvasId: 'myCanvas'})
const rectangle = new Reactangle({x: 100, y:100, width:50, height:50})
canvas.execute(new DrawableCreateCommand([rectangle]))

const rectangle2 = new Reactangle({x: 150, y:200, width:50, height:50, color: "#f50"})
canvas.execute(new DrawableCreateCommand([rectangle2]))

rectangle2.color = '#ff45'
rectangle2.width = 100
canvas.execute(new DrawableUpdateCommand([rectangle2]))

canvas.undo()
canvas.undo()
canvas.undo()