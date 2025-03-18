class Particle {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.alpha = 1;
        this.velocity = {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
        };
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
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
        this.size -= 0.05;
    }
}

class MouseTrailEffect {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.isGlowing = true;
        this.hue = 45; // Gold color
        
        // Configurable parameters
        this.particleCount = 3;
        this.particleSize = 4;
        this.trailLength = 20;
        
        this.init();
        this.bindEvents();
    }

    init() {
        this.resize();
        this.animate();
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.addParticles();
        });
        
        // Add particles on click
        document.addEventListener('click', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            for(let i = 0; i < 15; i++) {
                this.addParticles(true);
            }
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    addParticles(isClick = false) {
        for (let i = 0; i < (isClick ? 5 : this.particleCount); i++) {
            const size = Math.random() * this.particleSize + 2;
            const x = this.mouse.x + Math.random() * 20 - 10;
            const y = this.mouse.y + Math.random() * 20 - 10;
            const color = `hsl(45, 100%, 50%)`; // Gold color
            this.particles.push(new Particle(x, y, size, color));
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.isGlowing) {
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = 'gold';
        }

        this.particles.forEach((particle, index) => {
            if (particle.alpha <= 0 || particle.size <= 0.5) {
                this.particles.splice(index, 1);
            } else {
                particle.draw(this.ctx);
                particle.update();
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the effect when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('mouseTrailCanvas');
    const effect = new MouseTrailEffect(canvas);
}); 