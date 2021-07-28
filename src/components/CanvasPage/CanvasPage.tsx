import React, { useEffect, useRef } from 'react'
import classnames from 'classnames/bind'

import styles from './CanvasPage.module.scss'
import { appStore } from 'src/stores/appStore'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from 'src/utils/constants'
import { createGameEngine } from 'src/engines/utils'

const cx = classnames.bind(styles)

export const CanvasPage = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext('2d')

    if (!ctx) return

    const gameEngine = createGameEngine(appStore.selectedGameEngine_, ctx)
    gameEngine.run()

    const handleSpace = (e: KeyboardEvent): void => {
      if (e.key === ' ') {
        gameEngine.paused ? gameEngine.run() : gameEngine.pause()
      }
    }

    window.addEventListener('keydown', handleSpace)

    return (): void => window.removeEventListener('keydown', handleSpace)
  }, [])

  return (
    <>
      <canvas id="canvas" className={cx('canvas')} ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
    </>
  )
}
