class Particle {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.alpha = 1;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.alpha -= 0.02;
        this.size -= 0.1;
    }
}

class MouseTrailEffect {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.isGlowing = true;
        this.hue = 0;
        
        // Configurable parameters
        this.particleCount = 20;
        this.particleSize = 8;
        this.trailLength = 20;
        this.baseColor = `hsl(${this.hue}, 100%, 50%)`;

        this.init();
        this.bindEvents();
    }

    init() {
        this.resize();
        this.animate();
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.addParticles();
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    addParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            const size = Math.random() * this.particleSize + 2;
            const x = this.mouse.x + Math.random() * 20 - 10;
            const y = this.mouse.y + Math.random() * 20 - 10;
            const color = `hsl(${this.hue}, 100%, 50%)`;
            this.particles.push(new Particle(x, y, size, color));
        }

        // Limit the number of particles
        if (this.particles.length > this.trailLength * this.particleCount) {
            this.particles = this.particles.slice(-this.trailLength * this.particleCount);
        }
    }

    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.isGlowing) {
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = `hsl(${this.hue}, 100%, 50%)`;
        } else {
            this.ctx.shadowBlur = 0;
        }

        this.particles.forEach((particle, index) => {
            particle.draw(this.ctx);
            particle.update();

            if (particle.alpha <= 0 || particle.size <= 0.5) {
                this.particles.splice(index, 1);
            }
        });

        this.hue = (this.hue + 0.5) % 360;
        requestAnimationFrame(() => this.animate());
    }

    // Control methods
    setParticleCount(count) {
        this.particleCount = count;
    }

    setParticleSize(size) {
        this.particleSize = size;
    }

    setTrailLength(length) {
        this.trailLength = length;
    }

    toggleGlow() {
        this.isGlowing = !this.isGlowing;
    }

    changeColor() {
        this.hue = Math.random() * 360;
    }
}

// Initialize the effect
const canvas = document.getElementById('canvas');
const effect = new MouseTrailEffect(canvas);

// Control handlers
document.getElementById('particleCount').addEventListener('input', (e) => {
    effect.setParticleCount(parseInt(e.target.value));
});

document.getElementById('particleSize').addEventListener('input', (e) => {
    effect.setParticleSize(parseInt(e.target.value));
});

document.getElementById('trailLength').addEventListener('input', (e) => {
    effect.setTrailLength(parseInt(e.target.value));
});

function toggleGlow() {
    effect.toggleGlow();
}

function changeColor() {
    effect.changeColor();
} 