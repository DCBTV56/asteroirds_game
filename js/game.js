class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.renderer = new Renderer(this.ctx, this.canvas);

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
    this.level = 1;

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
    playShoot();
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

  restart() {
    this.ship = new Ship(this.canvas.width / 2, this.canvas.height / 2);
    this.asteroids = [];
    this.bullets = [];
    this.score = 0;
    this.lives = 3;
    this.shootCooldown = 0;
    this.gameOver = false;
    this.invincible = 0;
    this.level = 1;

    for (let i = 0; i < 5; i++) {
      this.asteroids.push(new Asteroid(
        Math.random() * this.canvas.width,
        Math.random() * this.canvas.height,
        60
      ));
    }
  }

  nextLevel() {
    this.level++;
    this.bullets = [];
    this.asteroids = [];

    for (let i = 0; i < 4 + this.level; i++) {
      this.asteroids.push(new Asteroid(
        Math.random() * this.canvas.width,
        Math.random() * this.canvas.height,
        60
      ));
    }
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
          playExplosion(asteroid.size);
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
    if (this.gameOver) {
      if (keys['Enter']) {
        keys['Enter'] = false;
        this.restart();
      }
      return;
    }

    if (this.gameOver) {
      if (keys['Enter']) this.restart();
      return;
    }

    if (this.shootCooldown > 0) this.shootCooldown--;
    if (this.invincible > 0) this.invincible--;
    if (keys['Space']) this.shoot();

    playThrust(keys['ArrowUp'] && !this.gameOver);
    this.ship.update(this.canvas.width, this.canvas.height);
    this.bullets.forEach(b => b.update(this.canvas.width, this.canvas.height));
    this.bullets = this.bullets.filter(b => !b.isDead());
    this.asteroids.forEach(a => a.update(this.canvas.width, this.canvas.height));

    if (this.asteroids.length === 0) this.nextLevel();
    this.checkCollisions();
  }

  draw() {
    this.renderer.clearScreen();

    this.renderer.drawShip(this.ship, this.invincible);
    this.bullets.forEach(b => this.renderer.drawBullet(b));
    this.asteroids.forEach(a => this.renderer.drawAsteroid(a));

    this.renderer.drawHUD(this.score, this.lives, this.level);

    if (this.gameOver) {
      this.renderer.drawGameOver(this.score);
    }
  }
}