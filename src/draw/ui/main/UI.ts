import {Ctx} from "../../MainDraw";
import Vector from "../../classes/Vector";
import {CANVAS_WIDTH} from "../../../App";
import UIComponent from "./UIComponent";
import MouseChargeButton, {MouseChargeStrengthButton} from "../MouseChargeButton";
import initToolbar from "../toolbar/Toolbar";
import Particle from "../../classes/Particle";
import {invokeDefaultLeftClickAction} from "../../Particles";

export type LeftClickAction = (pos: Vector, particles: Particle[]) => Particle[];
export const leftClickNoOp: LeftClickAction = (_, p) => p;

const uiComponents: UIComponent[] = [];
let defaultLeftClickAction: LeftClickAction = leftClickNoOp;

export function initUI() {
    uiComponents.push(new MouseChargeButton(
        new Vector(CANVAS_WIDTH - 60, 10),
        new Vector(50, 50),
    ));
    uiComponents.push(new MouseChargeStrengthButton(
        new Vector(CANVAS_WIDTH - 60, 70),
        new Vector(50, 50),
    ));
    uiComponents.push(initToolbar());
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

export function setDefaultLeftClickAction(action: LeftClickAction) {
    defaultLeftClickAction = action;
}

export function handleUIClick(coords: Vector) {
    for (let component of uiComponents) {
        if (component.isInside(coords)) {
            component.click(coords);
            return;
        }
    }

    invokeDefaultLeftClickAction(defaultLeftClickAction, coords);
}

export function drawUI(ctx: Ctx) {
    uiComponents.forEach(uic => uic.draw(ctx))
}