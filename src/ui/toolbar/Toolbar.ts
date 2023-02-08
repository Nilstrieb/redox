import UIComponent from "../main/UIComponent.js";
import { CANVAS_HEIGHT, Ctx, FillStyle } from "../../MainDraw.js";
import Vector from "../../classes/Vector.js";
import { rect, text } from "../../Shapes.js";
import {
  LeftClickAction,
  leftClickNoOp,
  setDefaultLeftClickAction,
} from "../main/UI.js";
import Particle from "../../classes/Particle.js";
import { getMousePosition } from "../../Particles.js";

export default function initToolbar(): Toolbar {
  const toolbar = new Toolbar(new Vector(50, CANVAS_HEIGHT - 100), 50);

  toolbar.pushTool(
    new ToolbarTool(
      "rgb(255,134,134)",
      "rgb(255,0,0)",
      (mousePos, particles) => [...particles, new Particle(mousePos, 1)],
      "Create a new + particle"
    )
  );

  toolbar.pushTool(
    new ToolbarTool(
      "rgb(156,187,255)",
      "rgb(0,84,255)",
      (mousePos, particles) => [...particles, new Particle(mousePos, -1)],
      "Create a new - particle"
    )
  );

  toolbar.pushTool(
    new ToolbarTool(
      "rgb(255,203,145)",
      "rgb(255,169,0)",
      (pos, particles) =>
        particles.filter((p) => p.position.distance(pos) > 50),
      "Delete all particles near the mouse"
    )
  );

  toolbar.pushTool(
    new ToolbarTool(
      "rgb(152,255,185)",
      "rgb(58,141,0)",
      () => [],
      "Delete all particles"
    )
  );

  return toolbar;
}

class Toolbar extends UIComponent {
  private _tools: ToolbarTool[];
  private readonly _scale: number;

  private _activeIndex: number;

  constructor(pos: Vector, size: number) {
    super(pos, new Vector(0, size));
    this._tools = [];
    this._scale = size;
    this._activeIndex = -1;
  }

  private recalculateSize(): void {
    this._size = new Vector(this._scale * this._tools.length, this._scale);
  }

  pushTool(tool: ToolbarTool): void {
    this._tools.push(tool);
    this.recalculateSize();
  }

  click(mousePos: Vector): void {
    const index = Math.floor((mousePos.x - this._position.x) / this._scale);
    if (this._activeIndex === index) {
      this._activeIndex = -1;
      setDefaultLeftClickAction(leftClickNoOp);
      return;
    }
    this._activeIndex = index;
    setDefaultLeftClickAction(this._tools[index].leftClickAction);
  }

  draw(ctx: Ctx): void {
    let description = undefined;
    const mousePos = getMousePosition();
    this._tools.forEach((tool, i) => {
      tool.drawTool(
        ctx,
        new Vector(this.position.x + this.scale * i, this.position.y),
        this._scale,
        this._activeIndex === i
      );
      const index = Math.floor((mousePos.x - this._position.x) / this._scale);

      if (index === i) {
        description = tool.description;
      }
    });
    if (description && this._isHovered) {
      text(ctx, mousePos.x, mousePos.y, description);
    }
  }

  get scale(): number {
    return this._scale;
  }
}

class ToolbarTool {
  private readonly _leftClickAction: LeftClickAction;
  private readonly _color: FillStyle;
  private readonly _activeColor: FillStyle;
  private readonly _description: string;

  constructor(
    color: FillStyle,
    activeColor: FillStyle,
    leftClick: LeftClickAction,
    description: string
  ) {
    this._color = color;
    this._activeColor = activeColor;
    this._leftClickAction = leftClick;
    this._description = description;
  }

  get description(): string {
    return this._description;
  }

  get leftClickAction(): LeftClickAction {
    return this._leftClickAction;
  }

  drawTool(ctx: Ctx, pos: Vector, size: number, active: boolean): void {
    rect(
      ctx,
      pos.x,
      pos.y,
      size,
      size,
      active ? this._activeColor : this._color
    );
  }
}
