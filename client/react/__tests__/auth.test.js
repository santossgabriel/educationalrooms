import React from 'react'
import { configure, mount } from 'enzyme'
import PropTypes from 'prop-types'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import Auth from '../src/scenes/auth/Auth'
import Login from '../src/scenes/auth/Login'
import Create from '../src/scenes/auth/Create'

import service from '../src/__mocks__/httpService'


// import { getMatchMedia } from '../src/helpers'

const mockStore = configureMockStore()({})

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    value: jest.fn(() => { return { matches: true } })
  })
})

const App = ({ name }) => <h2>{name}</h2>

App.propTypes = {
  name: PropTypes.string
}

configure({ adapter: new Adapter() })

it('Login test', () => {
  const props = { name: 'Fulaninho' }
  const app = mount(<Provider store={mockStore}><Auth {...props} /></Provider>)
  expect(app.find(Create)).toHaveLength(1)
})

// it('', () => {
//   const props = { name: 'Fulaninho' }
//   const app = mount(<Provider store={mockStore}><Auth {...props} /></Provider>)
//   expect(app.find(Login)).toHaveLength(1)
// })

it('Login test 2', () => {
  return service.get().then(res => expect(res.data.name === 'Fulano' ? [2] : []).toHaveLength(1))
})