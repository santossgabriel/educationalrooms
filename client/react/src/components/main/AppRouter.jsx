import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { createHashHistory } from 'history'
import {
  MyQuestion,
  SharedQuestion,
  MyRooms,
  OpenRooms,
  AssociatedRooms,
  EditRoom,
  Quiz
} from '../../scenes'

const history = createHashHistory()
const isAuthenticated = true
const freeRoutes = ['/', '/about']

let currentPath = location.hash.replace('#', '')

export const getCurrentPath = () => currentPath

history.listen((location) => {
  if (freeRoutes.indexOf(location.pathname) === -1 && !isAuthenticated) {
    window.location.hash = '#/'
    currentPath = '/'
  } else
    currentPath = location.pathname
})

export default class AppRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact={true} component={MyQuestion} />
        <Route path="/my-questions" component={MyQuestion} />
        <Route path="/shared-questions" component={SharedQuestion} />

        <Route path="/edit-room/:id" component={EditRoom} />
        <Route path="/my-rooms" component={MyRooms} />
        <Route path="/open-rooms" component={OpenRooms} />
        <Route path="/associated-rooms" component={AssociatedRooms} />

        <Route path="/quiz/:id" component={Quiz} />
      </Switch>
    )
  }
}