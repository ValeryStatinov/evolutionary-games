import { Blueberrie } from 'src/entities/Blueberrie'
import { Rabbit } from 'src/entities/Rabbit'
import { distanceBetween, getRandomVector2DOnCircle } from 'src/geometry'
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

  updateRabbits(ellapsed: number): void {
    this.rabbits_.forEach((r) => {
      if (r.isDead) {
        this.rabbits_.delete(r)

        return
      }

      if (r.isHungry) {
        for (const blueberrie of this.blueberries_) {
          const distance = distanceBetween(blueberrie.position, r.position)

          if (distance < r.viewRadius) {
            r.setTarget(blueberrie.position)
          }

          if (distance < 1) {
            r.eat()
            this.blueberries_.delete(blueberrie)
          }
        }

        if (!r.hasTarget) {
          r.setTarget(getRandomVector2DOnCircle(r.position, r.viewRadius))
        }
      }

      r.update(ellapsed)
      r.draw()
    })
  }

  updateAndDraw(ellapsed: number): void {
    this.ctx_.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    this.blueberries_.forEach((b) => {
      b.draw()
    })

    this.updateRabbits(ellapsed)
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
