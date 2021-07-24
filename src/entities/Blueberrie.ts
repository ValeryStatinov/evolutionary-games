import { Entity } from 'src/entities/Entity'
import { Vector2D } from 'src/geometry'
import { BLUEBERRY_IMAGE_SIZE } from 'src/utils/constants'
import blueberrieImageUrl from '../assets/blueberry.png'

const blueberrieImage = new Image(BLUEBERRY_IMAGE_SIZE, BLUEBERRY_IMAGE_SIZE)
blueberrieImage.src = blueberrieImageUrl

export class Blueberrie extends Entity {
  constructor(ctx: CanvasRenderingContext2D, initialPosition?: Vector2D) {
    super(ctx, blueberrieImage, BLUEBERRY_IMAGE_SIZE, BLUEBERRY_IMAGE_SIZE, initialPosition)
  }
}
