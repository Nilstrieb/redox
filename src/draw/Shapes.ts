import {Ctx, FillStyle} from "./MainDraw";


export function rect(ctx: Ctx, x: number, y: number, w: number, h: number, color: FillStyle = "black"): void {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

export function circle(ctx: Ctx, x: number, y: number, r: number, color: FillStyle = "black"): void {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r, 0, 0, 50);
    ctx.fill();
}