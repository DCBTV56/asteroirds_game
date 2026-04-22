class Asteroid {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = 1.5;

    // Dirección aleatoria
    const angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(angle) * this.speed;
    this.vy = Math.sin(angle) * this.speed;

    // Generar forma irregular
    this.vertices = [];
    const numVertices = Math.floor(Math.random() * 4) + 7; // entre 7 y 10 vértices
    for (let i = 0; i < numVertices; i++) {
      const vertexAngle = (i / numVertices) * Math.PI * 2;
      const radius = size * (0.7 + Math.random() * 0.4); // entre 70% y 110% del tamaño
      this.vertices.push({
        x: Math.cos(vertexAngle) * radius,
        y: Math.sin(vertexAngle) * radius
      });
    }
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
}