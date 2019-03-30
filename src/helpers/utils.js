export const cloneObject = (obj) => {
  if (obj === null || 'object' != typeof obj)
    return obj
  let cloned = {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key))
      cloned[key] = obj[key]
  }
  return cloned
}

export const Languages = {
  EN: 'en',
  BR: 'br'
}