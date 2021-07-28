import { Animal } from 'src/entities/Animal'
import { getRandomVector2DInCircle, Vector2D } from 'src/geometry'
import { RABBIT_IMAGE_SIZE, RABBIT_SPEED } from 'src/utils/constants'
import rabbitImageUrl from '../assets/rabbit.png'

const rabbitImage = new Image(RABBIT_IMAGE_SIZE, RABBIT_IMAGE_SIZE)
rabbitImage.src = rabbitImageUrl

export class Rabbit extends Animal {
  private viewRadius_ = 100
  private hunger_ = 100
  private hungerSpeed_ = 0.04

  constructor(ctx: CanvasRenderingContext2D, initialPosition?: Vector2D) {
    super(ctx, rabbitImage, RABBIT_IMAGE_SIZE, RABBIT_IMAGE_SIZE, RABBIT_SPEED, initialPosition)
  }

  get viewRadius(): number {
    return this.viewRadius_
  }

  get isHungry(): boolean {
    return this.hunger_ < 60
  }

  get isDead(): boolean {
    return this.hunger_ <= 0
  }

  eat(): void {
    this.hunger_ = 100
  }

  update(time: number): void {
    this.hunger_ -= this.hungerSpeed_

    if (this.isHungry) {
      super.goToTarget()

      return
    }

    if (this.animalState_ === 'waiting_target') {
      this.setTarget(getRandomVector2DInCircle(this.position_, this.viewRadius_))

      this.animalState_ = 'wander'
    }

    super.update(time)
  }

  drawViewRadius(): void {
    this.ctx_.strokeStyle = 'lightgray'
    this.ctx_.beginPath()
    this.ctx_.arc(this.position_.x, this.position_.y, this.viewRadius_, 0, 2 * Math.PI)
    this.ctx_.stroke()
    this.ctx_.closePath()

    if (this.targetPosition_) {
      this.ctx_.beginPath()
      this.ctx_.arc(this.targetPosition_.x, this.targetPosition_.y, 1, 0, 2 * Math.PI)
      this.ctx_.stroke()
      this.ctx_.closePath()

      this.ctx_.beginPath()
      this.ctx_.moveTo(this.position_.x, this.position_.y)
      this.ctx_.lineTo(this.targetPosition_.x, this.targetPosition_.y)
      this.ctx_.stroke()
      this.ctx_.closePath()
    }
  }

  drawHunger(): void {
    this.ctx_.fillStyle = this.isHungry ? 'red' : 'lightgreen'
    this.ctx_.fillRect(this.position.x - 22, this.position.y - 20, (44 * this.hunger_) / 100, 7)

    this.ctx_.strokeStyle = 'black'
    this.ctx_.strokeRect(this.position.x - 22, this.position.y - 20, 44, 7)
  }

  draw(): void {
    this.drawViewRadius()
    this.drawHunger()
    super.draw()
  }
}
