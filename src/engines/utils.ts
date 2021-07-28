import { RabbitsPrimitive } from 'src/engines'
import { GameEngineLike, SelectedGameEngine } from 'src/engines/types'

export const createGameEngine = (
  selectedGameEngine: SelectedGameEngine,
  ctx: CanvasRenderingContext2D,
): GameEngineLike => {
  switch (selectedGameEngine) {
    case 'rabbits_primitive':
      return new RabbitsPrimitive(ctx)
  }
}
