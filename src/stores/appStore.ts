import { makeAutoObservable } from 'mobx'
import { RabbitsPrimitive } from 'src/engines/RabbitsPrimitive/RabbitsPrimitive'

export type SelectedGameEngine = 'rabbits_primitive'
export interface GameEngineLike {
  run(): void
}

class AppStore {
  selectedGameEngine: SelectedGameEngine = 'rabbits_primitive'

  constructor() {
    makeAutoObservable(this)
  }

  createGameEngine(ctx: CanvasRenderingContext2D): GameEngineLike {
    switch (this.selectedGameEngine) {
      case 'rabbits_primitive':
        return new RabbitsPrimitive(ctx)
    }
  }
}

export const appStore = new AppStore()
