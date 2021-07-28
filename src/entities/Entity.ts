import { getRandomVector2D, Vector2D } from 'src/geometry'

export class Entity {
  protected position_: Vector2D

  constructor(
    protected ctx_: CanvasRenderingContext2D,
    protected img_: HTMLImageElement,
    protected width_: number,
    protected height_: number,
    initialPosition?: Vector2D,
  ) {
    this.position_ = initialPosition || getRandomVector2D()
  }

  draw(): void {
    this.ctx_.drawImage(
      this.img_,
      this.position_.x - this.width_ / 2,
      this.position_.y - this.height_ / 2,
      this.width_,
      this.height_,
    )
  }

  get position(): Vector2D {
    return this.position_
  }
}
