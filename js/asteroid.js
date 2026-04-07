class Asteroid {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;          // large=60, medium=30, small=15
    this.speed = 1.5;

    // Dirección aleatoria
    const angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(angle) * this.speed;
    this.vy = Math.sin(angle) * this.speed;
  }

  update(canvasWidth, canvasHeight) {
    this.x += this.vx;
    this.y += this.vy;

    // Wrap around
    if (this.x < 0)            this.x = canvasWidth;
    if (this.x > canvasWidth)  this.x = 0;
    if (this.y < 0)            this.y = canvasHeight;
    if (this.y > canvasHeight) this.y = 0;
  }

  draw(ctx) {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.stroke();
  }
}