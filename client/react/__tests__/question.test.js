import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { TableBody, TablePagination, CardActions, CardMedia } from '@material-ui/core'

import MyQuestion from '../src/scenes/question/MyQuestion'
import { Languages } from '../src/helpers'

import { Stars } from '../src/components'

const mockStore = configureMockStore()({ appState: { language: Languages.PT_BR } })

configure({ adapter: new Adapter() })

it('Listar questões', () => {
  const screen = mount(<Provider store={mockStore}><MyQuestion /></Provider>)

  return new Promise((resolve) => {
    setTimeout(() => {
      expect(screen.find(MyQuestion).find('tbody')).toHaveLength(2)
      resolve()
    }, 100)
  })
})

//  [jestid="trMyQuestions"]