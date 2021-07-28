export type SelectedGameEngine = 'rabbits_primitive'
export interface GameEngineLike {
  paused: boolean
  run(): void
  pause(): void
}
