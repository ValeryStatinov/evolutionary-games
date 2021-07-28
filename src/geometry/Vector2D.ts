import { CANVAS_HEIGHT, CANVAS_WIDTH } from 'src/utils/constants'

export class Vector2D {
  private x_: number
  private y_: number

  constructor(x_: number, y_: number)
  constructor(v: Vector2D)
  constructor(firstArg: Vector2D | number, y?: number) {
    if (firstArg instanceof Vector2D) {
      this.x_ = firstArg.x
      this.y_ = firstArg.y
    } else {
      this.x_ = firstArg
      this.y_ = y as number
    }
  }

  get x(): number {
    return this.x_
  }

  get y(): number {
    return this.y_
  }

  get length(): number {
    return Math.sqrt(this.x_ * this.x_ + this.y_ * this.y_)
  }

  addVector2D(v: Vector2D): Vector2D {
    this.x_ += v.x
    this.y_ += v.y

    return this
  }

  scalarMultiply(m: number): Vector2D {
    this.x_ *= m
    this.y_ *= m

    return this
  }

  normalize(): Vector2D {
    const reciprocal = 1.0 / (this.length + 1.0e-37) // Prevent division by zero.

    return this.scalarMultiply(reciprocal)
  }
}

export const getRandomVector2D = (): Vector2D => {
  const x = Math.random() * CANVAS_WIDTH
  const y = Math.random() * CANVAS_HEIGHT

  return new Vector2D(x, y)
}

export const getRandomVector2DInCircle = (center: Vector2D, radius: number): Vector2D => {
  const r = radius * Math.sqrt(Math.random())
  const angle = Math.random() * 2 * Math.PI

  let x = r * Math.cos(angle) + center.x
  let y = r * Math.sin(angle) + center.y

  if (x >= CANVAS_WIDTH) {
    x = CANVAS_WIDTH
  }

  if (x <= 0) {
    x = 0
  }

  if (y >= CANVAS_HEIGHT) {
    y = CANVAS_HEIGHT
  }

  if (y <= 0) {
    y = 0
  }

  return new Vector2D(x, y)
}

export const getRandomVector2DOnCircle = (center: Vector2D, radius: number): Vector2D => {
  const angle = Math.random() * 2 * Math.PI

  let x = radius * Math.cos(angle) + center.x
  let y = radius * Math.sin(angle) + center.y

  if (x >= CANVAS_WIDTH) {
    x = CANVAS_WIDTH
  }

  if (x <= 0) {
    x = 0
  }

  if (y >= CANVAS_HEIGHT) {
    y = CANVAS_HEIGHT
  }

  if (y <= 0) {
    y = 0
  }

  return new Vector2D(x, y)
}

export const distanceBetween = (p1: Vector2D, p2: Vector2D): number =>
  Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
