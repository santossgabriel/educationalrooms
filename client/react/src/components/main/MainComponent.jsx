import { Footer, GlobalToast, OpenedQuizLinkList, Toolbar } from 'components'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { authService } from 'services'
import { hideAlert, userChanged } from 'store/actions'
import { AlertModal } from '../main/Modal'
import { AppRouter, PresentationRouter } from './AppRouter'

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
      <HashRouter>
        <Toolbar />
        {user ?
          <>
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
          :
          <PresentationRouter />
        }
      </HashRouter>
    </div>
  )
}