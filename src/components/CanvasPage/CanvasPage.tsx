import React, { useEffect, useRef } from 'react'
import classnames from 'classnames/bind'

import styles from './CanvasPage.module.scss'
import { appStore } from 'src/stores/appStore'

const cx = classnames.bind(styles)

export const CanvasPage = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext('2d')

    if (!ctx) return

    const gameEngine = appStore.createGameEngine(ctx)
    gameEngine.run()
  }, [])

  return (
    <>
      <canvas
        id="canvas"
        className={cx('canvas')}
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </>
  )
}