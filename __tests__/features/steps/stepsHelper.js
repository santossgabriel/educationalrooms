import { expect } from 'chai'

export const validProps = (json, obj) => {
  const jsonObj = JSON.parse(json)

  if (!jsonObj || !Object.keys(jsonObj).length) {
    expect('Object with no keys').to.eql('')
  }

  if (!obj)
    expect(obj).to.eql(true, 'Obj is invalid.')

  for (let k in jsonObj)
    expect(obj[k]).to.eql(jsonObj[k])
}