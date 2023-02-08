import { rect } from "./Shapes.js";
import {
  changeMouseProperties,
  drawParticles,
  initParticles,
  updateParticles,
} from "./Particles.js";
import Vector from "./classes/Vector.js";
import {
  drawUI,
  handleUIClick,
  handleUIMouseMove,
  initUI,
} from "./ui/main/UI.js";

type FillStyle = string | CanvasGradient | CanvasPattern;
type Ctx = CanvasRenderingContext2D;

let CANVAS_WIDTH = 0;
let CANVAS_HEIGHT = 0;

function start() {
  const c = document.getElementById("main-canvas") as HTMLCanvasElement;

  CANVAS_WIDTH = c.width;
  CANVAS_HEIGHT = c.height;

  init();

  const context = c.getContext("2d")!;

  setInterval(() => {
    update();
  }, 1000 / 60);

  draw(context);

  c.addEventListener("mousemove", canvasMouseMove);
  c.addEventListener("click", canvasClick);
}

function init() {
  initParticles();
  initUI();
}

function draw(ctx: Ctx) {
  console.log(CANVAS_HEIGHT, CANVAS_WIDTH);

  rect(ctx, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, "lightgrey");
  drawParticles(ctx);
  drawUI(ctx);
  requestAnimationFrame(() => draw(ctx));
}

function update() {
  updateParticles();
}

function canvasMouseMove(e: MouseEvent) {
  changeMouseProperties((old) => ({ ...old, pos: getMousePos(e) }));
  handleUIMouseMove(getMousePos(e));
}

function canvasClick(e: MouseEvent) {
  handleUIClick(getMousePos(e));
}

function getMousePos(evt: any): Vector {
  const rect = evt.currentTarget.getBoundingClientRect();
  return new Vector(evt.clientX - rect.left, evt.clientY - rect.top);
}

export type { Ctx, FillStyle };
export { start, CANVAS_HEIGHT, CANVAS_WIDTH };
