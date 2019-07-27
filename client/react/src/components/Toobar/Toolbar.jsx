import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Button, Badge } from '@material-ui/core/'
import Typography from '@material-ui/core/Typography'
import * as Icons from '@material-ui/icons'
import Menu from '@material-ui/core/Menu'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { Link, MenuIconButton, UserName, UserEmail, MenuFooter, NotificationTitle, NotificationContainer } from './styles'

import { AppTexts, Languages } from 'helpers/appTexts'
import { BrazilFlag, UnitedStatesFlag } from 'components'
import { languageChanged, userChanged, notificationsChanged } from '../../actions'
import { authService, notificationService } from 'services'
import { UserPicture } from './UserPicture'

export default function AppToolbar({ dockedMenu, openSideBar }) {

  const [anchorMenu, setAnchorMenu] = useState(null)
  const [anchorNotification, setAnchorNotification] = useState(null)
  const { language, user, online, notifications } = useSelector(state => state.appState)
  const dispatch = useDispatch()

  useEffect(() => {
    notificationService.getAll().then(res => {
      dispatch(notificationsChanged(res))
    })
  }, [])

  function changeLanguage(l) {
    dispatch(languageChanged(l))
    document.title = AppTexts.AppTitle[l]
    setAnchorMenu(null)
  }

  function logout() {
    authService.logout()
    dispatch(userChanged(null))
  }

  function markRead() {
    notificationService.markRead().then(() => {
      notifications.forEach(p => p.read = true)
      dispatch(notificationsChanged(notifications))
    })
  }

  function removeAll() {
    notificationService.removeAll().then(() => {
      dispatch(notificationsChanged([]))
    })
  }

  function remove(n) {
    notificationService.removeAll(n.id).then(() => {
      dispatch(notificationsChanged(notifications.filter(p => p.id !== n.id)))
    })
  }

  return (
    <div style={{ flexGrow: 1 }} >
      <AppBar position='static' color='primary'>
        <Toolbar>
          {
            dockedMenu ? null :
              <MenuIconButton color="inherit" aria-label="Menu"
                onClick={() => openSideBar()}>
                <Icons.Menu />
              </MenuIconButton>
          }
          <Typography variant="h5" color="inherit" style={{ flexGrow: 2, textTransform: 'uppercase' }}>
            {AppTexts.AppTitle[language]}
          </Typography>

          <MenuIconButton color="inherit" onClick={e => setAnchorNotification(e.currentTarget)}>
            <Badge color="secondary" badgeContent={notifications.filter(p => !p.read).length}
              invisible={!notifications.filter(p => !p.read).length}>
              <Icons.Notifications />
            </Badge>
          </MenuIconButton>

          <MenuIconButton color="inherit">
            <Icons.Help />
          </MenuIconButton>

          <Button onClick={e => setAnchorMenu(e.currentTarget)}>
            <UserPicture image={user && user.picture} online={online} />
          </Button>

          <Menu
            style={{ margin: '0', padding: '0' }}
            id="simple-menu"
            anchorEl={anchorNotification}
            open={!!anchorNotification && !!notifications.length}
            onClose={() => setAnchorNotification(null)}>
            <NotificationTitle>Notificações</NotificationTitle>
            <NotificationContainer>
              {notifications.map(n => (
                <div key={n.id} style={{ borderTop: '1px solid #666', padding: '10px 10px 0px 10px' }}>
                  <div style={{ fontSize: '10px', textAlign: 'end' }}>
                    {!n.read && <Icons.Lens style={{ color: 'aqua' }} fontSize="inherit" />}
                    <Icons.Close onClick={() => remove(n)} style={{ color: '#B44', cursor: 'pointer' }} fontSize="inherit" />
                  </div>
                  <div>
                    <span style={{ fontWeight: 'bold', paddingRight: '4px' }}>{n.origin}:</span>
                    {n.description}
                  </div>
                  <div style={{ textAlign: 'end' }}>{n.elapsedTime}</div>
                </div>
              ))}
            </NotificationContainer>
            <MenuFooter>
              <Link onClick={() => markRead()} href="javascript:void(0)">Marcar como lidas</Link>
              <Link onClick={() => removeAll()} href="javascript:void(0)">Remover Todas</Link>
            </MenuFooter>
          </Menu>

          <Menu
            style={{ margin: '0', padding: '0' }}
            id="simple-menu"
            anchorEl={anchorMenu}
            open={!!anchorMenu}
            onClose={() => setAnchorMenu(null)}>
            <div style={{ display: 'inline-block' }}>
              <UserPicture image={user && user.picture} online={online} />
              <div style={{ marginLeft: '12px' }}>
                <UnitedStatesFlag onClick={() => changeLanguage(Languages.EN_US)} />
                <BrazilFlag onClick={() => changeLanguage(Languages.PT_BR)} />
              </div>
            </div>
            <div style={{ display: 'inline-block', marginLeft: '8px', marginRight: '8px' }}>
              <UserName>{user && user.name || ''}</UserName>
              <UserEmail>{user && user.email || ''}</UserEmail>
            </div>
            <MenuFooter>
              <Button autoFocus={true} variant="contained" color="primary">{AppTexts.Toolbar.EditAccount[language]}</Button>
              <Button
                style={{ marginLeft: '10px' }}
                onClick={() => logout()}
                variant="contained">{AppTexts.Toolbar.Logout[language]}</Button>
            </MenuFooter>
          </Menu>
        </Toolbar>
      </AppBar>
    </div >
  )
}

AppToolbar.propTypes = {
  dockedMenu: PropTypes.bool,
  openSideBar: PropTypes.func.isRequired
}