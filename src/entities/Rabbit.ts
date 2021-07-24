import { Animal } from 'src/entities/Animal'
import { getRandomVector2DInCircle, Vector2D } from 'src/geometry'
import { RABBIT_IMAGE_SIZE, RABBIT_SPEED } from 'src/utils/constants'
import rabbitImageUrl from '../assets/rabbit.png'

const rabbitImage = new Image(RABBIT_IMAGE_SIZE, RABBIT_IMAGE_SIZE)
rabbitImage.src = rabbitImageUrl

export class Rabbit extends Animal {
  private viewRadius_ = 100

  constructor(ctx: CanvasRenderingContext2D, initialPosition?: Vector2D) {
    super(ctx, rabbitImage, RABBIT_IMAGE_SIZE, RABBIT_IMAGE_SIZE, RABBIT_SPEED, initialPosition)
  }

  update(time: number): void {
    if (this.animalState_ === 'waiting_target') {
      this.setTarget(getRandomVector2DInCircle(this.position_, this.viewRadius_))

      this.animalState_ = 'wander'
    }

    super.update(time)
  }

  draw(): void {
    // this.ctx_.beginPath()
    // this.ctx_.arc(this.position_.x, this.position_.y, this.viewRadius_, 0, 2 * Math.PI)
    // this.ctx_.stroke()
    // this.ctx_.closePath()

    // if (this.targetPosition_) {
    //   this.ctx_.beginPath()
    //   this.ctx_.arc(this.targetPosition_.x, this.targetPosition_.y, 1, 0, 2 * Math.PI)
    //   this.ctx_.stroke()
    //   this.ctx_.closePath()

    //   this.ctx_.beginPath()
    //   this.ctx_.moveTo(this.position_.x, this.position_.y)
    //   this.ctx_.lineTo(this.targetPosition_.x, this.targetPosition_.y)
    //   this.ctx_.stroke()
    //   this.ctx_.closePath()
    // }

    super.draw()
  }
}
