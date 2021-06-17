import {Ctx} from "../MainDraw";

export default interface SimObject {
    draw(ctx: Ctx): void;

    update(): void;
}