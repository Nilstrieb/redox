import { Ctx } from "../../MainDraw.js";
import Vector from "../../classes/Vector.js";
import { rect } from "../../Shapes.js";
import UIComponent from "./UIComponent.js";

class Button extends UIComponent {
  private _clicked: boolean;

  constructor(pos: Vector, size: Vector) {
    super(pos, size);
    this._clicked = false;
  }

  public draw(ctx: Ctx) {
    const color = this._isHovered ? "red" : "grey";
    rect(
      ctx,
      this._position.x,
      this._position.y,
      this._size.x,
      this._size.y,
      color
    );
  }

  public click() {
    this._clicked = true;
  }
}

export default Button;
