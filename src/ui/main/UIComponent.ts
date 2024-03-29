import { Ctx } from "../../MainDraw.js";
import Vector from "../../classes/Vector.js";

export default abstract class UIComponent {
  protected _size: Vector;
  protected _position: Vector;
  protected _isHovered: boolean;

  private _wasHovered: boolean;

  protected constructor(pos: Vector, size: Vector) {
    this._position = pos;
    this._size = size;
    this._wasHovered = false;
    this._isHovered = false;
  }

  public abstract draw(ctx: Ctx): void;

  public abstract click(mousePos: Vector): void;

  public onHoverEnter(): void {
    this._isHovered = true;
  }

  public onHoverLeave(): void {
    this._isHovered = false;
  }

  get wasHovered(): boolean {
    return this._wasHovered;
  }

  set wasHovered(wasHovered) {
    this._wasHovered = wasHovered;
  }

  get size(): Vector {
    return this._size;
  }

  get position(): Vector {
    return this._position;
  }

  public isInside(coords: Vector): boolean {
    return (
      coords.x > this._position.x &&
      coords.x < this._position.x + this._size.x &&
      coords.y > this._position.y &&
      coords.y < this._position.y + this._size.y
    );
  }
}
