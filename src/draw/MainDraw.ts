import {rect} from "./Shapes";
import {drawParticles, initParticles, updateParticles} from "./Particles";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../App";
import {MouseEvent} from "react";
import Vector from "./classes/Vector";
import {drawUI, handleUIMouseMove, handleUIClick, initUI} from "./ui/UI";

type FillStyle = string | CanvasGradient | CanvasPattern;
type Ctx = CanvasRenderingContext2D;
type MouseEvt = MouseEvent<HTMLCanvasElement>;

function init() {
    initParticles();
    initUI();
}

function draw(ctx: Ctx) {
    rect(ctx, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, "lightgrey");
    drawParticles(ctx);
    drawUI(ctx);
    requestAnimationFrame(() => draw(ctx));
}

function update() {
    updateParticles();
}

function canvasMouseMove(e: MouseEvt) {
    console.log(getMousePos(e))
    handleUIMouseMove(getMousePos(e));
}

function canvasClick(e: MouseEvt) {
    console.log(getMousePos(e))
    handleUIClick(e);
}

function getMousePos(evt: MouseEvt): Vector {
    const rect = evt.currentTarget.getBoundingClientRect();
    return new Vector(
        evt.clientX - rect.left,
        evt.clientY - rect.top
    );
}

export type {Ctx, FillStyle, MouseEvt};
export {update, init, draw, canvasClick, canvasMouseMove};
