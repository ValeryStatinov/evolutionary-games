import { makeAutoObservable } from 'mobx'
import { SelectedGameEngine } from 'src/engines/types'

class AppStore {
  selectedGameEngine_: SelectedGameEngine = 'rabbits_primitive'
  simulationSpeed_ = 10

  constructor() {
    makeAutoObservable(this)
  }
}

export const appStore = new AppStore()
