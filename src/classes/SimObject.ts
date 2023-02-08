import { Ctx } from "../MainDraw.js";

export default interface SimObject {
  draw(ctx: Ctx): void;

  update(): void;
}
