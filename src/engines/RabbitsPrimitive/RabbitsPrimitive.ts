import { runInAction } from 'mobx'
import { Blueberrie } from 'src/entities/Blueberrie'
import { Rabbit } from 'src/entities/Rabbit'
import { distanceBetween, getRandomVector2DOnCircle, Vector2D } from 'src/geometry'
import { appStore } from 'src/stores/appStore'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from 'src/utils/constants'

const INITIAL_RABBITS_NUMBER = 50
const INITIAL_BLUEBERRIES_NUMBER = 20
const BLUEBERRIES_PER_MINUTE = 30

export class RabbitsPrimitive {
  paused_ = false
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

  get paused(): boolean {
    return this.paused_
  }

  spawnBlueberries(): void {
    const rand = Math.random()

    if (rand < (BLUEBERRIES_PER_MINUTE * appStore.simulationSpeed_) / ((1000 * 60) / 16)) {
      this.blueberries_.add(new Blueberrie(this.ctx_))
    }
  }

  updateRabbits(ellapsed: number): void {
    this.rabbits_.forEach((r) => {
      if (r.isDead) {
        this.rabbits_.delete(r)

        return
      }

      if (r.wantsToMate) {
        let closestMate = null
        let minDistance = Infinity

        for (const potentialMate of this.rabbits_) {
          if (!potentialMate.wantsToMate || potentialMate === r) continue

          const distance = distanceBetween(potentialMate.position, r.position)

          if (distance < r.viewRadius && distance < minDistance) {
            closestMate = potentialMate
            minDistance = distance
          }
        }

        if (closestMate) {
          r.setTarget(closestMate.position)
        }

        if (closestMate && minDistance < 1) {
          r.satisfyUrgeToreproduce()
          closestMate.satisfyUrgeToreproduce()

          const hungerSpeed = Math.random() > 0.5 ? r.hungerSpeed : closestMate.hungerSpeed
          const mutatedHungerSpeed = Math.random() < 0.2 ? hungerSpeed + (Math.random() * 0.0005 - 0.001) : hungerSpeed

          this.rabbits_.add(new Rabbit(this.ctx_, new Vector2D(r.position), mutatedHungerSpeed))
        }
      }

      if (r.isHungry && !r.wantsToMate) {
        let closestBlueberrie = null
        let minDistance = Infinity

        for (const blueberrie of this.blueberries_) {
          const distance = distanceBetween(blueberrie.position, r.position)

          if (distance < r.viewRadius && distance < minDistance) {
            closestBlueberrie = blueberrie
            minDistance = distance
          }
        }

        if (closestBlueberrie) {
          r.setTarget(closestBlueberrie.position)
        }

        if (closestBlueberrie && minDistance < 1) {
          r.eat()
          this.blueberries_.delete(closestBlueberrie)
        }
      }

      if ((r.isHungry || r.wantsToMate) && !r.hasTarget) {
        r.setTarget(getRandomVector2DOnCircle(r.position, r.viewRadius))
      }

      r.update(ellapsed)
      r.draw()
    })
  }

  collectStatistics(): void {
    let sumHungerSpeed = 0
    this.rabbits_.forEach((r) => (sumHungerSpeed += r.hungerSpeed))

    runInAction(() => {
      appStore.avgHungerSpeed = sumHungerSpeed / this.rabbits_.size
      appStore.populationSize = this.rabbits_.size
    })
  }

  updateAndDraw(ellapsed: number): void {
    this.ctx_.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    this.spawnBlueberries()

    this.blueberries_.forEach((b) => {
      b.draw()
    })

    this.updateRabbits(ellapsed)
    this.collectStatistics()
  }

  pause(): void {
    this.paused_ = true
  }

  run(): void {
    this.paused_ = false
    let then = performance.now()

    const loop = (): void => {
      const now = performance.now()
      const ellapsed = now - then
      then = now

      this.updateAndDraw(ellapsed)

      if (!this.paused_) {
        requestAnimationFrame(loop)
      }
    }

    requestAnimationFrame(loop)
  }
}
