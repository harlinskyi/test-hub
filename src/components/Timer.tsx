import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

interface TimePassed {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const Timer: React.FC<{ startDate: dayjs.Dayjs; endDate?: dayjs.Dayjs }> = ({
  startDate,
  endDate,
}) => {
  const [timePassed, setTimePassed] = useState<TimePassed>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = dayjs()
      const diff = now.diff(startDate) // Різниця від startDate до поточного часу
      const durationObj = dayjs.duration(diff)

      setTimePassed({
        days: durationObj.days(),
        hours: durationObj.hours(),
        minutes: durationObj.minutes(),
        seconds: durationObj.seconds(),
      })
    }, 1000) // Оновлюється кожну секунду

    return () => clearInterval(intervalId) // Очистка інтервалу при розмонтуванні компонента
  }, [startDate])

  const getTimeString = (time: TimePassed) => {
    const timer = []

    if (time.days) {
      timer.push(`${time.days} д.`)
    }
    if (time.hours) {
      timer.push(`${time.hours}`)
    }
    timer.push(`${time.minutes}`)
    timer.push(`${time.seconds < 10 ? '0' + time.seconds : time.seconds}`)

    return timer.join(':')
  }

  const getDiffBetweenDates = (
    startDate: dayjs.Dayjs,
    endDate: dayjs.Dayjs
  ) => {
    const diff = endDate.diff(startDate)
    const durationObj = dayjs.duration(diff)

    return {
      days: durationObj.days(),
      hours: durationObj.hours(),
      minutes: durationObj.minutes(),
      seconds: durationObj.seconds(),
    }
  }

  return (
    <span>
      {endDate
        ? getTimeString(getDiffBetweenDates(startDate, endDate))
        : getTimeString(timePassed)}
    </span>
  )
}

export default Timer
