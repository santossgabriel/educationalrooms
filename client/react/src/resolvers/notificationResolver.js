import { storageService } from 'services'
import { notificationMessage, elapsedTime } from 'helpers/translates/notifications'

export const dateToElapsedTime = (date, lang) => {
  const diff = Math.floor((new Date()).getTime() - new Date(date).getTime())
  const seconds = Math.floor(diff / 1000)
  if (seconds < 60)
    return `${seconds} ${elapsedTime.seconds[lang]}`
  const min = Math.floor(seconds / 60)
  if (min < 60)
    return `${min} ${elapsedTime.minutes[lang]}`
  const hour = Math.floor(min / 60)
  if (hour < 24)
    return `${hour} ${elapsedTime.hours[lang]}`
  return `${Math.floor(hour / 24)} ${elapsedTime.days[lang]}`
}

export const notificationResolver = arr => {
  if (!Array.isArray(arr))
    return arr
  const lang = storageService.getLanguage()
  arr.forEach(p => {
    p.description = (notificationMessage[p.type] || {})[lang] || ''
    p.elapsedTime = dateToElapsedTime(p.createdAt, lang)
  })
  return arr
}