import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import createHistory from 'history/createHashHistory'
import {
  MyQuestion,
  SharedQuestion,
  MyRooms,
  OpenRooms,
  AssociateRooms,
  EditRoom
} from '../../scenes'

const history = createHistory()
const isAuthenticated = true
const freeRoutes = ['/', '/about']

let currentPath = location.hash.replace('#', '')

export const getCurrentPath = () => currentPath

history.listen((location, action) => {
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
        <Route path="/associate-rooms" component={AssociateRooms} />
      </Switch>
    )
  }
}