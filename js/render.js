class Renderer {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
  }

  clearScreen() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawShip(ship, invincible) {
    if (invincible > 0 && Math.floor(invincible / 10) % 2 !== 0) return;

    this.ctx.save();
    this.ctx.translate(ship.x, ship.y);
    this.ctx.rotate(ship.angle);

    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(ship.size, 0);
    this.ctx.lineTo(-ship.size, -ship.size * 0.6);
    this.ctx.lineTo(-ship.size * 0.5, 0);
    this.ctx.lineTo(-ship.size, ship.size * 0.6);
    this.ctx.closePath();
    this.ctx.stroke();

    this.ctx.restore();
  }

  drawAsteroid(asteroid) {
    this.ctx.save();
    this.ctx.translate(asteroid.x, asteroid.y);
    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(asteroid.vertices[0].x, asteroid.vertices[0].y);
    for (let i = 1; i < asteroid.vertices.length; i++) {
      this.ctx.lineTo(asteroid.vertices[i].x, asteroid.vertices[i].y);
    }
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawBullet(bullet) {
    this.ctx.fillStyle = 'white';
    this.ctx.beginPath();
    this.ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawHUD(score, lives, level) {
    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px Arial';
    this.ctx.fillText('Score: ' + score, 20, 30);
    this.ctx.fillText('Lives: ' + lives, 20, 55);
    this.ctx.fillText('Level: ' + level, 20, 80);
  }

  drawGameOver(score) {
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    this.ctx.font = '48px Arial';
    this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.font = '24px Arial';
    this.ctx.fillText('Score: ' + score, this.canvas.width / 2, this.canvas.height / 2 + 40);
    this.ctx.font = '18px Arial';
    this.ctx.fillText('Press Enter to play again', this.canvas.width / 2, this.canvas.height / 2 + 80);
    this.ctx.textAlign = 'left';
  }
}