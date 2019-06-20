import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import Auth from '../src/scenes/auth/Auth'
import Login from '../src/scenes/auth/Login'
import Create from '../src/scenes/auth/Create'

// import { getMatchMedia } from '../src/helpers'

const mockStore = configureMockStore()({})

// beforeAll(() => {
//   Object.defineProperty(window, 'matchMedia', {
//     value: jest.fn(() => { return { matches: true } })
//   })
// })

configure({ adapter: new Adapter() })

it('Alterar entre telas de login e de criação de conta', () => {
  const app = mount(<Provider store={mockStore}><Auth /></Provider>)
  expect(app.find(Login)).toHaveLength(1)
  expect(app.find(Create)).toHaveLength(0)
  app.find('button[jestid="btnToCreate"]').first().simulate('click')
  expect(app.find(Login)).toHaveLength(0)
  expect(app.find(Create)).toHaveLength(1)
  app.find('button[jestid="btnToLogin"]').first().simulate('click')
  expect(app.find(Login)).toHaveLength(1)
  expect(app.find(Create)).toHaveLength(0)
})

it('Erro no login', () => {
  const screen = mount(<Provider store={mockStore}><Auth /></Provider>).find(Login)
  screen.find('[name="email"] input').props().onChange({ target: { value: 'jest@mail.com' } })
  screen.find('[name="password"] input').props().onChange({ target: { value: '12345' } })
  screen.find('button[jestid="btnLogin"]').simulate('click')
  return new Promise((resolve) => {
    setTimeout(() => {
      expect(screen.find('p[jestid="msgLogin"]').text()).toEqual('Credenciais inválidas.')
      resolve()
    }, 0)
  })
})

it('Sucesso no login', () => {
  const screen = mount(<Provider store={mockStore}><Auth /></Provider>).find(Login)
  screen.find('[name="email"] input').props().onChange({ target: { value: 'jest@mail.com' } })
  screen.find('[name="password"] input').props().onChange({ target: { value: '123456' } })
  screen.find('button[jestid="btnLogin"]').simulate('click')
  return new Promise((resolve) => {
    setTimeout(() => {
      expect(screen.find('p[jestid="msgLogin"]').text()).toEqual('')
      resolve()
    }, 0)
  })
})

it('Erro ao criar conta', () => {
  const screen = mount(<Provider store={mockStore}><Auth /></Provider>)
  screen.find('button[jestid="btnToCreate"]').first().simulate('click')
  screen.find(Create).find('[name="name"] input').props().onChange({ target: { value: 'jestteste' } })
  screen.find(Create).find('[name="email"] input').props().onChange({ target: { value: 'jest@mail.com' } })
  screen.find(Create).find('[name="password"] input').props().onChange({ target: { value: '123456' } })
  screen.find(Create).find('[name="confirm"] input').props().onChange({ target: { value: '123456' } })
  screen.find(Create).find('button[jestid="btnCreate"]').simulate('click')
  return new Promise((resolve) => {
    setTimeout(() => {
      expect(screen.find(Create).find('p[jestid="msgCreate"]').text()).toEqual('Este email já está em uso.')
      resolve()
    }, 0)
  })
})

it('Sucesso ao criar conta', () => {
  const screen = mount(<Provider store={mockStore}><Auth /></Provider>)
  screen.find('button[jestid="btnToCreate"]').first().simulate('click')
  screen.find(Create).find('[name="name"] input').props().onChange({ target: { value: 'jestteste' } })
  screen.find(Create).find('[name="email"] input').props().onChange({ target: { value: 'jest2@mail.com' } })
  screen.find(Create).find('[name="password"] input').props().onChange({ target: { value: '123456' } })
  screen.find(Create).find('[name="confirm"] input').props().onChange({ target: { value: '123456' } })
  screen.find(Create).find('button[jestid="btnCreate"]').simulate('click')
  return new Promise((resolve) => {
    setTimeout(() => {
      expect(screen.find(Create).find('p[jestid="msgCreate"]').text()).toEqual('')
      resolve()
    }, 0)
  })
})