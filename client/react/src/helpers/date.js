const addLeftZero = val => (val > 9 ? '' : '0') + val

export const toDateFormat = p => {
  if (!p)
    return p
  const date = new Date(p)
  if (date.toString() === 'Invalid Date')
    return p
  const year = String(date.getFullYear()).substring(2, 4)
  const month = addLeftZero(date.getMonth() + 1)
  const day = addLeftZero(date.getDate())
  const min = addLeftZero(date.getMinutes())
  const hours = addLeftZero(date.getHours())
  return `${day}/${month}/${year} ${hours}:${min}`
}