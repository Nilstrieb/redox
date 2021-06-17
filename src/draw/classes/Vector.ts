export default class Vector {
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public add(b: Vector): Vector {
        return new Vector(this.x + b.x, this.y + b.y);
    }

    public sub(b: Vector) {
        return new Vector(this.x - b.x, this.y - b.y);
    }

    public scale(number: number) {
        return new Vector(this.x * number, this.y * number);
    }

    public magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public distance(b: Vector) {
        return Math.sqrt((this.x - b.x) ** 2 + (this.y - b.y) ** 2)
    }

    public negated() {
        return new Vector(-this.x, -this.y);
    }

    public normalized() {
        const factor = this.magnitude();
        return new Vector(this.x / factor, this.y / factor);
    }
}