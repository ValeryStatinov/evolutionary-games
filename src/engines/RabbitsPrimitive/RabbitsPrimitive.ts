import { Blueberrie } from 'src/entities/Blueberrie'
import { Rabbit } from 'src/entities/Rabbit'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from 'src/utils/constants'

const INITIAL_RABBITS_NUMBER = 50
const INITIAL_BLUEBERRIES_NUMBER = 30

export class RabbitsPrimitive {
  rabbits_: Set<Rabbit> = new Set()
  blueberries_: Set<Blueberrie> = new Set()

  constructor(private ctx_: CanvasRenderingContext2D) {
    for (let i = 0; i < INITIAL_RABBITS_NUMBER; i++) {
      this.rabbits_.add(new Rabbit(this.ctx_))
    }

    for (let i = 0; i < INITIAL_BLUEBERRIES_NUMBER; i++) {
      this.blueberries_.add(new Blueberrie(this.ctx_))
    }
  }

  updateAndDraw(ellapsed: number): void {
    this.ctx_.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    this.rabbits_.forEach((r) => {
      r.update(ellapsed)
      r.draw()
    })

    this.blueberries_.forEach((b) => {
      b.draw()
    })
  }

  run(): void {
    let then = performance.now()

    const draw = (): void => {
      const now = performance.now()
      const ellapsed = now - then
      then = now

      this.updateAndDraw(ellapsed)

      requestAnimationFrame(draw)
    }

    requestAnimationFrame(draw)
  }
}
