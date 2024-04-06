import { Canvas } from "./canvas"
import { DrawableCreateCommand } from "./commands/drawCreateCommand"
import { DrawableUpdateCommand } from "./commands/drawUpdateCommend"
import { Reactangle } from "./shapes/rectangle"


const canvas = new Canvas({canvasId: 'myCanvas'})
const rectangle = new Reactangle({x: 100, y:100, width:50, height:50})
canvas.execute(new DrawableCreateCommand([rectangle]))

const rectangle2 = new Reactangle({x: 150, y:200, width:50, height:50, color: "#f50"})
canvas.execute(new DrawableCreateCommand([rectangle2]))

const updatedProps = {x: 33, width: 111, color: "#ff4"}
const updatedRectangle = Reactangle.copy(rectangle2)
updatedRectangle.update(updatedProps)

canvas.execute(new DrawableUpdateCommand([updatedRectangle]))





