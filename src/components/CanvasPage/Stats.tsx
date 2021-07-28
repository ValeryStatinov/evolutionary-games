import { observer } from 'mobx-react'
import React from 'react'
import classnames from 'classnames/bind'
import { appStore } from 'src/stores/appStore'
import styles from './Stats.module.scss'

const cx = classnames.bind(styles)

export const Stats = observer(() => {
  const { avgHungerSpeed, populationSize } = appStore

  return (
    <div className={cx('stats')}>
      <div>AVG HUNGER SPEED: {avgHungerSpeed.toFixed(6)}</div>
      <div>POPULATION SIZE: {populationSize}</div>
    </div>
  )
})
