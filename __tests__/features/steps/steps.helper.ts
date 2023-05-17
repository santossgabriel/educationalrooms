import { expect } from 'chai'
import supertest from 'supertest'

import app from '../../../src/server'

export const validProps = (json: string, obj: any) => {
  const jsonObj = JSON.parse(json)

  if (!jsonObj || !Object.keys(jsonObj).length) {
    expect('Object with no keys').to.eql('')
  }

  if (!obj)
    expect(obj).to.eql(true, 'Obj is invalid.')

  for (const k in jsonObj)
    expect(obj[k]).to.eql(jsonObj[k])
}

export const createHttpClient = () => supertest(app)