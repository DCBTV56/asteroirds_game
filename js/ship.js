class Ship {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;        // en radianes, 0 = apuntando a la derecha
    this.vx = 0;           // velocidad en x
    this.vy = 0;           // velocidad en y
    this.rotSpeed = 0.05;  // qué tan rápido rota
    this.thrust = 0.1;     // fuerza de aceleración
    this.friction = 0.99;  // fricción del espacio (menos de 1 = se frena poco a poco)
    this.size = 15;        // tamaño de la nave
  }

  update(canvasWidth, canvasHeight) {
    // Rotar
    if (keys['ArrowLeft'])  this.angle -= this.rotSpeed;
    if (keys['ArrowRight']) this.angle += this.rotSpeed;

    // Acelerar en la dirección que apunta
    if (keys['ArrowUp']) {
      this.vx += Math.cos(this.angle) * this.thrust;
      this.vy += Math.sin(this.angle) * this.thrust;
    }

    // Aplicar fricción (inercia espacial)
    this.vx *= this.friction;
    this.vy *= this.friction;

    // Mover
    this.x += this.vx;
    this.y += this.vy;

    // Wrap around
    if (this.x < 0)            this.x = canvasWidth;
    if (this.x > canvasWidth)  this.x = 0;
    if (this.y < 0)            this.y = canvasHeight;
    if (this.y > canvasHeight) this.y = 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.size, 0);                         // punta delantera
    ctx.lineTo(-this.size, -this.size * 0.6);         // esquina trasera izquierda
    ctx.lineTo(-this.size * 0.5, 0);                  // centro trasero
    ctx.lineTo(-this.size, this.size * 0.6);          // esquina trasera derecha
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }
}