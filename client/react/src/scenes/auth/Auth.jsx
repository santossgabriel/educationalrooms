import React, { useState } from 'react'
import Login from './Login'
import Create from './Create'

export default function AuthComponent() {

  const [showLogin, setShowLogin] = useState(true)

  return (
    <div>
      {
        showLogin ?
          <Login changeScene={() => setShowLogin (false)} />
          :
          <Create changeScene={() => setShowLogin(true)} />
      }
    </div>
  )
}