export const dateToElapsedTime = (date) => {
  const diff = Math.floor((new Date()).getTime() - date.getTime())
  const seconds = Math.floor(diff / 1000)
  if (seconds < 60)
    return `${seconds} segundos atrás`
  const min = Math.floor(seconds / 60)
  if (min < 60)
    return `${min} minutos atrás`
  const hour = Math.floor(min / 60)
  if (hour < 24)
    return `${hour} horas atrás`
  return `${Math.floor(hour / 24)} dias atrás`
}