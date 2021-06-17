import {Ctx, MouseEvt} from "../MainDraw";
import Vector from "../classes/Vector";
import Button from "./Button";
import {CANVAS_WIDTH} from "../../App";
import UIComponent from "./UIComponent";

const uiComponents: UIComponent[] = [];

export function initUI() {
    uiComponents.push(new Button(
        new Vector(CANVAS_WIDTH - 60, 10),
        new Vector(50, 50),
    ));
    uiComponents.push(new Button(
        new Vector(CANVAS_WIDTH - 60, 70),
        new Vector(50, 50)
    ));
}

export function handleUIMouseMove(coords: Vector) {
    for (let component of uiComponents) {
        const isInside = component.isInside(coords);
        if (isInside && !component.wasHovered) {
            component.onHoverEnter();
        } else if (!isInside && component.wasHovered) {
            component.onHoverLeave();
        }
        component.wasHovered = isInside;
    }
}

export function handleUIClick(e: MouseEvt) {

}

export function drawUI(ctx: Ctx) {
    uiComponents.forEach(uic => uic.draw(ctx))
}