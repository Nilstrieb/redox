import { Ctx, FillStyle } from "./MainDraw.js";

export function rect(
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number,
  color: FillStyle = "black"
): void {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

export function circle(
  ctx: Ctx,
  x: number,
  y: number,
  r: number,
  color: FillStyle = "black"
): void {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, r, r, 0, 0, 50);
  ctx.fill();
}

export function text(
  ctx: Ctx,
  x: number,
  y: number,
  text: string,
  fontSize: number = 15,
  color: FillStyle = "black"
) {
  ctx.fillStyle = color;
  ctx.font = `${fontSize}px Arial`;
  ctx.fillText(text, x, y);
}
