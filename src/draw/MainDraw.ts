import {rect} from "./Shapes";
import {updateParticles, particlesInit, drawParticles} from "./Particles";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../App";

type FillStyle = string | CanvasGradient | CanvasPattern;
type Ctx = CanvasRenderingContext2D;

function init() {
    particlesInit();
}

function draw(ctx: Ctx) {
    rect(ctx, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, "lightgrey");
    drawParticles(ctx);
    requestAnimationFrame(() => draw(ctx));
}

function update() {
    updateParticles();
}

export type {Ctx, FillStyle};
export {update, init, draw};
