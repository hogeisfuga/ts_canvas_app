import { Canvas } from "./canvas"
import { CanvasInvoker } from "./canvasInvoker"
import { DrawableCreateCommand } from "./commands/drawCreateCommand"
import { DrawableUpdateCommand } from "./commands/drawUpdateCommend"
import { RedoManager } from "./redoManager"
import { Reactangle, UpdateRectangleProps } from "./shapes/rectangle"
import { UndoManager } from "./undoManager"


const canvas = new Canvas({canvasId: 'canvas'})
const invoker = new CanvasInvoker({undoManager: new UndoManager(), redoManager: new RedoManager(), canvas: canvas})
const rectangle = new Reactangle({x: 100, y:100, width:50, height:50, fillColor: "#5f9", strokeColor: "#00f1" })
invoker.execute(new DrawableCreateCommand(canvas, [rectangle]))

const rectangle2 = new Reactangle({x: 150, y:200, width:50, height:50, fillColor: "#f50", strokeColor: "#f50" })
invoker.execute(new DrawableCreateCommand(canvas, [rectangle2]))

const updatedRectangle = Reactangle.clone(rectangle2)
const updatedProps: UpdateRectangleProps = {x: 33, width: 111, fillColor: "#f48"}
updatedRectangle.update(updatedProps)

invoker.execute(new DrawableUpdateCommand(canvas, [updatedRectangle]))

// invoker.undo()
