import { Footer, GlobalToast, OpenedQuizLinkList, Toolbar } from 'components'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import Auth from 'scenes/auth/Auth'
import { authService } from 'services'
import { hideAlert, userChanged } from 'store/actions'
import { AlertModal } from '../main/Modal'
import AppRouter from './AppRouter'

export function MainComponent() {

  const user = useSelector(state => state.appState.user)
  const modal = useSelector(state => state.modalState)

  const dispatch = useDispatch()

  useEffect(() => {
    if (user)
      authService.getAccount()
        .then(res => {
          if (!res)
            dispatch(userChanged(null))
        })
  }, [])

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {user ?
        <HashRouter>
          <>
            <Toolbar />
            <div style={{ flex: 1 }}>
              <AppRouter />
            </div>
            <OpenedQuizLinkList />
            <GlobalToast />
            <AlertModal type={modal.type}
              text={modal.message}
              show={modal.show}
              onClose={() => dispatch(hideAlert())} />
            <Footer />
          </>
        </HashRouter>
        :
        <Auth />
      }
    </div>
  )
}