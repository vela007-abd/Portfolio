const canvas = document.getElementById('shooting-star-canvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

class ShootingStar {
  constructor() {
    this.reset();
  }
  
  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height / 2;
    this.len = 100 + Math.random() * 80;
    this.speed = 10 + Math.random() * 10;
    this.angle = Math.PI / 4; // 45 degrees diagonal
    this.size = 2 + Math.random() * 1.5;
    this.opacity = 0;
    this.opacitySpeed = 0.03 + Math.random() * 0.02;
    this.trailLengthDelta = 0;
    this.isFadingIn = true;
  }

  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
    if (this.isFadingIn) {
      this.opacity += this.opacitySpeed;
      if (this.opacity >= 1) this.isFadingIn = false;
    } else {
      this.opacity -= this.opacitySpeed / 1.5;
    }
    if (this.opacity <= 0 || this.x > width || this.y > height) {
      this.reset();
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.lineWidth = this.size;
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.len * Math.cos(this.angle), this.y - this.len * Math.sin(this.angle));
    ctx.stroke();
    ctx.restore();
  }
}

const shootingStars = [];
const maxStars = 8;

for (let i = 0; i < maxStars; i++) {
  shootingStars.push(new ShootingStar());
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  shootingStars.forEach(star => {
    star.update();
    star.draw(ctx);
  });
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

animate();

