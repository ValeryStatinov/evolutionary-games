export class RabbitsPrimitive {
  constructor(private ctx: CanvasRenderingContext2D) {}

  draw(): void {
    this.ctx.fillStyle = 'rgb(200, 0, 0)'
    this.ctx.fillRect(10, 10, 50, 50)

    this.ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
    this.ctx.fillRect(30, 30, 50, 50)

    requestAnimationFrame(() => this.draw())
  }

  run(): void {
    requestAnimationFrame(() => this.draw())
  }
}
