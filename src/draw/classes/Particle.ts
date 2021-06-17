import Vector from "./Vector";
import SimObject from "./SimObject";
import {Ctx, FillStyle} from "../MainDraw";
import {circle} from "../Shapes";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../../App";

const PARTICLE_SIZE = 5;
const PARTICLE_EDGE_REPULSION_FORCE = 0.1;
const FRICTION = 0.99;
const RANDOM_ACCELERATION = 2;

export default class Particle implements SimObject {
    private _position: Vector;
    private _velocity: Vector;
    private readonly _mass: number;
    private readonly _charge: number;

    constructor(position: Vector, charge = 0, mass = 1) {
        this._position = position;
        this._velocity = new Vector();
        this._charge = charge;
        this._mass = mass;
    }

    public applyForce(force: Vector) {
        this._velocity = this._velocity.add(force.scaleInverse(this._mass));
    }

    public draw(ctx: Ctx): void {
        circle(ctx, this._position.x, this._position.y, PARTICLE_SIZE, colorFromCharge(this._charge));
    }

    public update(): void {
        this._position = this._position.add(this._velocity);
        this._velocity = this._velocity.scale(FRICTION);

        // random movement
        if (this._velocity.magnitude() < 0.1 && Math.random() > 0.4) {
            this.applyForce(new Vector((Math.random() - 0.5) * RANDOM_ACCELERATION, (Math.random() - 0.5) * RANDOM_ACCELERATION));
        }

        if (this._position.x < 50) {
            this.applyForce(new Vector(PARTICLE_EDGE_REPULSION_FORCE, 0));
        }
        if (this._position.x > CANVAS_WIDTH - 50) {
            this.applyForce(new Vector(-PARTICLE_EDGE_REPULSION_FORCE, 0));
        }
        if (this._position.y > CANVAS_HEIGHT - 50) {
            this.applyForce(new Vector(0, -PARTICLE_EDGE_REPULSION_FORCE));
        }
        if (this._position.y < 50) {
            this.applyForce(new Vector(0, PARTICLE_EDGE_REPULSION_FORCE));
        }
    }

    public get charge() {
        return this._charge;
    }

    public get position() {
        return this._position;
    }
}

function colorFromCharge(charge: number): FillStyle {
    if (charge === 0) {
        return "black";
    }
    if (charge < 0) {
        return "blue";
    }
    return "red";
}