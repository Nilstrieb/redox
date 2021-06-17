import Button from "./Button";
import Vector from "../classes/Vector";
import {Ctx} from "../MainDraw";
import {rect} from "../Shapes";
import {changeMouseProperties} from "../Particles";

enum ChargeState {
    NEGATIVE = -1,
    NEUTRAL = 0,
    POSITIVE = 1,
}

export default class MouseChargeButton extends Button {
    private _state: ChargeState;

    constructor(pos: Vector, size: Vector) {
        super(pos, size);
        this._state = ChargeState.NEUTRAL;
    }

    public draw(ctx: Ctx) {
        let color;
        switch (this._state) {
            case ChargeState.NEGATIVE:
                color = this._isHovered ? "rgb(78,78,255)" : "blue";
                break;
            case ChargeState.NEUTRAL:
                color = this._isHovered ? "rgb(147,147,147)" : "grey";
                break;
            case ChargeState.POSITIVE:
                color = this._isHovered ? "rgb(255,82,82)" : "red";
        }
        rect(ctx, this._position.x, this._position.y, this._size.x, this._size.y, color);
    }

    public click() {
        switch (this._state) {
            case ChargeState.NEGATIVE:
                this._state = ChargeState.NEUTRAL;
                break;
            case ChargeState.NEUTRAL:
                this._state = ChargeState.POSITIVE;
                break;
            case ChargeState.POSITIVE:
                this._state = ChargeState.NEGATIVE;
        }
        changeMouseProperties(old => (
            {...old, charge: this._state}
        ));
    }
}

export class MouseChargeStrengthButton extends Button {
    private _state: number;

    constructor(pos: Vector, size: Vector) {
        super(pos, size);
        this._state = 0;
    }

    public draw(ctx: Ctx) {
        rect(ctx, this._position.x, this._position.y, this._size.x, this._size.y, "grey");
        rect(ctx, this._position.x, this._position.y, this._size.x, (this._size.y / (10 / this._state)), "green");
    }

    public click() {
        this._state++;
        if (this._state > 10) {
            this._state = 1;
        }
        changeMouseProperties(old => ({
            ...old,
            strength: this._state
        }));
    }
}