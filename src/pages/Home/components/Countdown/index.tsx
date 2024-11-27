import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'

import { CountDownContainer, Separator } from './styles'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function Countdown() {
  const { activeCycle, stateCycle, markCycleAsFinished, updateSecondsPassed } =
    useContext(CyclesContext)

  const totalSeconds = activeCycle?.id ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle?.id
    ? totalSeconds - stateCycle.amountSecondsPassed
    : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) document.title = `${minutes}:${seconds}`
  }, [minutes, seconds, activeCycle])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>

    if (activeCycle?.id) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          markCycleAsFinished()
          updateSecondsPassed(totalSeconds)
          console.log('finalizou')
          clearInterval(interval)
        } else {
          updateSecondsPassed(secondsDifference)
        }
      }, 1000)
    }
    return () => {
      /* updateSecondsPassed(totalSeconds) */
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, markCycleAsFinished, updateSecondsPassed])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
