import React from 'react'
import classnames from 'classnames/bind'

import styles from './App.module.scss'
import { CanvasPage } from 'src/components/CanvasPage/CanvasPage'

const cx = classnames.bind(styles)

export const App = (): JSX.Element => {
  return (
    <div className={cx('app')}>
      <CanvasPage />
    </div>
  )
}
