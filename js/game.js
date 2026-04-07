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
    for (let i = 0; i < 5; i++) {
      this.asteroids.push(new Asteroid(
        Math.random() * this.canvas.width,
        Math.random() * this.canvas.height,
        60
      ));
    }
  }

  update() {
    this.ship.update(this.canvas.width, this.canvas.height);
    this.asteroids.forEach(a => a.update(this.canvas.width, this.canvas.height));
  }

  draw() {
    // Limpiar pantalla
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Dibujar todo
    this.ship.draw(this.ctx);
    this.asteroids.forEach(a => a.draw(this.ctx));
  }
}