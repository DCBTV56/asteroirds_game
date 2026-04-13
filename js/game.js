class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    // Tamaño del canvas
    this.canvas.width = 800;
    this.canvas.height = 600;

    // Crear la nave en el centro
    this.ship = new Ship(this.canvas.width / 2, this.canvas.height / 2);

    // Crear asteroides en posiciones aleatorias
    this.asteroids = [];
    this.bullets = [];
    this.score = 0;
    this.lives = 3;
    this.shootCooldown = 0;
    this.gameOver = false;
    this.invincible = 0;      // frames de invencibilidad tras ser golpeado

    for (let i = 0; i < 5; i++) {
      this.asteroids.push(new Asteroid(
        Math.random() * this.canvas.width,
        Math.random() * this.canvas.height,
        60
      ));
    }
  }

  shoot() {
    if (this.shootCooldown > 0) return;

    const bullet = new Bullet(
      this.ship.x + Math.cos(this.ship.angle) * this.ship.size,
      this.ship.y + Math.sin(this.ship.angle) * this.ship.size,
      this.ship.angle
    );
    this.bullets.push(bullet);
    this.shootCooldown = 15;
  }

  resetShip() {
    this.ship.x = this.canvas.width / 2;
    this.ship.y = this.canvas.height / 2;
    this.ship.vx = 0;
    this.ship.vy = 0;
    this.ship.angle = 0;
    this.invincible = 180;    // 3 segundos de invencibilidad
  }

  checkCollisions() {
    // Balas vs asteroides
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      for (let j = this.asteroids.length - 1; j >= 0; j--) {
        const bullet = this.bullets[i];
        const asteroid = this.asteroids[j];

        const dx = bullet.x - asteroid.x;
        const dy = bullet.y - asteroid.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < asteroid.size) {
          this.bullets.splice(i, 1);

          if (asteroid.size === 60) this.score += 20;
          if (asteroid.size === 30) this.score += 50;
          if (asteroid.size === 15) this.score += 100;

          if (asteroid.size === 60) {
            this.asteroids.push(new Asteroid(asteroid.x, asteroid.y, 30));
            this.asteroids.push(new Asteroid(asteroid.x, asteroid.y, 30));
          } else if (asteroid.size === 30) {
            this.asteroids.push(new Asteroid(asteroid.x, asteroid.y, 15));
            this.asteroids.push(new Asteroid(asteroid.x, asteroid.y, 15));
          }

          this.asteroids.splice(j, 1);
          break;
        }
      }
    }

    // Nave vs asteroides
    if (this.invincible > 0) return;

    for (let j = this.asteroids.length - 1; j >= 0; j--) {
      const asteroid = this.asteroids[j];
      const dx = this.ship.x - asteroid.x;
      const dy = this.ship.y - asteroid.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < asteroid.size + this.ship.size) {
        this.lives--;
        if (this.lives <= 0) {
          this.gameOver = true;
        } else {
          this.resetShip();
        }
        break;
      }
    }
  }

  update() {
    if (this.gameOver) return;

    if (this.shootCooldown > 0) this.shootCooldown--;
    if (this.invincible > 0) this.invincible--;
    if (keys['Space']) this.shoot();

    this.ship.update(this.canvas.width, this.canvas.height);
    this.bullets.forEach(b => b.update(this.canvas.width, this.canvas.height));
    this.bullets = this.bullets.filter(b => !b.isDead());
    this.asteroids.forEach(a => a.update(this.canvas.width, this.canvas.height));

    this.checkCollisions();
  }

  draw() {
    // Limpiar pantalla
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Parpadeo cuando es invencible
    if (this.invincible === 0 || Math.floor(this.invincible / 10) % 2 === 0) {
      this.ship.draw(this.ctx);
    }

    this.bullets.forEach(b => b.draw(this.ctx));
    this.asteroids.forEach(a => a.draw(this.ctx));

    // HUD
    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px Arial';
    this.ctx.fillText('Score: ' + this.score, 20, 30);
    this.ctx.fillText('Lives: ' + this.lives, 20, 55);

    // Game over
    if (this.gameOver) {
      this.ctx.fillStyle = 'white';
      this.ctx.font = '48px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2);
      this.ctx.font = '24px Arial';
      this.ctx.fillText('Score: ' + this.score, this.canvas.width / 2, this.canvas.height / 2 + 40);
      this.ctx.textAlign = 'left';
    }
  }
}