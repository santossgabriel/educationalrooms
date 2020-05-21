import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  AssociatedRooms, Auth, EditRoom, Home, MyQuestion, MyRooms,
  OpenRooms, PresentationHome, Quiz, SharedQuestion, UserAccount
} from '../../scenes'

import { History } from 'utils'

export function AppRouter() {
  return (
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route path="/my-questions" component={MyQuestion} />
      <Route path="/shared-questions" component={SharedQuestion} />

      <Route path="/edit-room/:id" component={EditRoom} />
      <Route path="/my-rooms" component={MyRooms} />
      <Route path="/open-rooms" component={OpenRooms} />
      <Route path="/associated-rooms" component={AssociatedRooms} />

      <Route path="/quiz/:id" component={Quiz} />

      <Route path="/user-account" component={UserAccount} />
    </Switch>
  )
}

export function PresentationRouter() {
  useEffect(() => {
    History.push('/')
  }, [])
  return (
    <Switch>
      <Route path="/" exact={true} component={PresentationHome} />
      <Route path="/register" component={Auth} />
    </Switch>
  )
}