class Bullet {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.vx = Math.cos(angle) * this.speed;
    this.vy = Math.sin(angle) * this.speed;
    this.radius = 3;
    this.life = 60;        // frames antes de desaparecer
  }

  update(canvasWidth, canvasHeight) {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;

    // Wrap around
    if (this.x < 0)            this.x = canvasWidth;
    if (this.x > canvasWidth)  this.x = 0;
    if (this.y < 0)            this.y = canvasHeight;
    if (this.y > canvasHeight) this.y = 0;
  }

  isDead() {
    return this.life <= 0;
  }
}