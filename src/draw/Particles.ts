import {Ctx} from "./MainDraw";
import Particle, {colorFromCharge} from "./classes/Particle";
import Vector from "./classes/Vector";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../App";
import {circle} from "./Shapes";
import {LeftClickAction} from "./ui/main/UI";

let particles: Particle[] = [];
let mouseProperties: MouseProperties = {charge: 0, strength: 1, pos: new Vector()};

export function initParticles() {
    particles = [];
    const chargeToMass = [1, 1, 1];

    for (let i = 0; i < 200; i++) {
        const charge = Math.random() < 0.3 ? 0 : Math.random() < 0.5 ? 1 : -1;
        particles.push(new Particle(new Vector(
            Math.random() * (CANVAS_WIDTH - 100) + 50,
            Math.random() * (CANVAS_HEIGHT - 100) + 50
        ), charge, chargeToMass[charge + 1]));
    }
}

interface MouseProperties {
    charge: number,
    strength: number,
    pos: Vector
}

export function getMousePosition(): Vector {
    return mouseProperties.pos;
}

export function invokeDefaultLeftClickAction(action: LeftClickAction, mousePos: Vector) {
    particles = action(mousePos, particles);
}

export function changeMouseProperties(transformer: (old: MouseProperties) => MouseProperties) {
    mouseProperties = transformer(mouseProperties);
}

export function drawParticles(ctx: Ctx) {
    particles.forEach(p => p.draw(ctx));
    circle(ctx, mouseProperties.pos.x, mouseProperties.pos.y, 5, colorFromCharge(mouseProperties.charge));
}

export function updateParticles() {
    calculateChargedForces();
    particles.forEach(p => p.update());
}

function calculateChargedForces() {
    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        if (particle.charge !== 0) {
            for (let j = i + 1; j < particles.length; j++) {
                const innerParticle = particles[j];
                if (innerParticle.charge !== 0) {
                    const dist = particle.position.distance(innerParticle.position);
                    if (dist < 300 && dist > 0) {
                        const f1 = innerParticle.position.sub(particle.position).scale(0.5 / dist ** 2)
                        /*
                        that does not actually work because the world does not work like that
                       but there is probably something missing here if the charges aren't equal
                       .scale(Math.max(Math.abs(particle.charge), Math.abs(innerParticle.charge))
                       / Math.min(Math.abs(particle.charge), Math.abs(innerParticle.charge)));
                       */
                        if (particle.charge === innerParticle.charge) {
                            particle.applyForce(f1.negated());
                            innerParticle.applyForce(f1);
                        } else {
                            particle.applyForce(f1);
                            innerParticle.applyForce(f1.negated());
                        }
                    }
                }
            }

            // mouse
            const dist = particle.position.distance(mouseProperties.pos);
            if (mouseProperties.charge !== 0 && dist < 10000 && dist > 0.30) {
                const f1 = mouseProperties.pos
                    .sub(particle.position)
                    .scale(0.5 / dist ** 2)
                    .scale(mouseProperties.strength * 5);
                if (particle.charge === mouseProperties.charge) {
                    particle.applyForce(f1.negated());
                } else {
                    particle.applyForce(f1);
                }
            }
        }
    }
}