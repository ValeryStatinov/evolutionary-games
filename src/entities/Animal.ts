import { Entity } from 'src/entities/Entity'
import { distanceBetween, Vector2D } from 'src/geometry'
import { WANDERING_WAIT_TIME } from 'src/utils/constants'

export type AnimalState = 'stay' | 'wander' | 'waiting_target'

export class Animal extends Entity {
  protected targetPosition_: Vector2D | null = null
  protected animalState_: AnimalState = 'stay'
  protected remainingStayTime_ = Math.random() * WANDERING_WAIT_TIME
  protected direction_: Vector2D = new Vector2D(0, 0)

  constructor(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    width: number,
    height: number,
    protected speed_: number,
    initialPosition?: Vector2D,
  ) {
    super(ctx, img, width, height, initialPosition)
  }

  get hasTarget(): boolean {
    return !!this.targetPosition_
  }

  public setTarget(t: Vector2D): void {
    this.targetPosition_ = t
    this.direction_ = new Vector2D(t.x - this.position_.x, t.y - this.position_.y).normalize()
  }

  protected goToTarget(): void {
    if (!this.targetPosition_) return

    if (distanceBetween(this.position, this.targetPosition_) <= this.speed_) {
      this.animalState_ = 'stay'
      this.remainingStayTime_ = Math.random() * WANDERING_WAIT_TIME
      this.targetPosition_ = null

      return
    }

    const dxdy = new Vector2D(this.direction_).scalarMultiply(this.speed_)
    this.position_.addVector2D(dxdy)
  }

  protected stay(time: number): void {
    this.remainingStayTime_ -= time

    if (this.remainingStayTime_ < 0) {
      this.animalState_ = 'waiting_target'
    }
  }

  protected update(time: number): void {
    if (this.animalState_ === 'wander') {
      this.goToTarget()

      return
    }

    if (this.animalState_ === 'stay') {
      this.stay(time)
    }
  }
}
