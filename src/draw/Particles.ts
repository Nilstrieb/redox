import {Ctx} from "./MainDraw";
import Particle from "./classes/Particle";
import Vector from "./classes/Vector";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../App";

const particles: Particle[] = [];

export function initParticles() {
    const chargeToMass = [0.1, 1, 10];
    for (let i = 0; i < 200; i++) {
        const charge = Math.random() < 0.3 ? 0 : Math.random() < 0.5 ? 1 : -1;
        particles.push(new Particle(new Vector(
            Math.random() * (CANVAS_WIDTH - 100) + 50,
            Math.random() * (CANVAS_HEIGHT - 100) + 50
        ), charge, chargeToMass[charge + 1]));
    }
}

export function drawParticles(ctx: Ctx) {
    particles.forEach(p => p.draw(ctx));
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
                    if (dist < 1000 && dist > 0.30) {
                        const f1 = innerParticle.position.sub(particle.position).scale(0.5 / dist ** 2);
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
        }
    }
}