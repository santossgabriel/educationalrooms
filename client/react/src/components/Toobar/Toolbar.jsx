import { Badge, Button } from '@material-ui/core/'
import Menu from '@material-ui/core/Menu'
import { Close, Help, Lens, Notifications, School } from '@material-ui/icons'
import { BrazilFlag, UnitedStatesFlag } from 'components'
import { AppTexts, Languages } from 'helpers/appTexts'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as LinkRouter } from 'react-router-dom'
import { authService, notificationService } from 'services'
import { languageChanged, notificationsChanged, userChanged } from 'store/actions'
import {
  AppMenu, Container, Link, LinkMenu, MenuFooter, MenuIconButton,
  NotificationContainer, NotificationTitle, Title, Toolbar, UserEmail, UserName
} from './styles'
import { UserPicture } from './UserPicture'

const {
  QuestionTexts,
  RoomTexts,
  ScoreTexts
} = AppTexts.MainComponent

export default function AppToolbar() {

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
    <Container>
      <Toolbar style={{
        backgroundColor: '#002900AA',
        color: 'white',
        margin: 0,
        padding: 0,
        boxShadow: '2px 2px 2px black'
      }}>
        <LinkRouter to="/"
          style={{
            marginLeft: '10px',
            display: 'flex',
            color: 'inherit',
            textDecoration: 'none',
            flexDirection: 'row'
          }} >
          <School />
          <Title>{AppTexts.AppTitle[language]}</Title>
        </LinkRouter>

        {user ?
          <>
            <AppMenu>
              <li>
                <label>{QuestionTexts.Questions[language]}</label>
                <ul>
                  <LinkMenu to="/my-questions"><li>{QuestionTexts.My[language]}</li></LinkMenu>
                  <LinkMenu to="/shared-questions"><li>{QuestionTexts.Shared[language]}</li></LinkMenu>
                </ul>
              </li>
              <li>
                <label>{RoomTexts.Rooms[language]}</label>
                <ul>
                  <LinkMenu to="/my-rooms"><li>{RoomTexts.My[language]}</li></LinkMenu>
                  <LinkMenu to="/open-rooms"><li>{RoomTexts.Open[language]}</li></LinkMenu>
                  <LinkMenu to="/associated-rooms"><li>{RoomTexts.Associate[language]}</li></LinkMenu>
                </ul>
              </li>
              <li>
                <label>{ScoreTexts.Scores[language]}</label>
              </li>
            </AppMenu>

            <MenuIconButton color="inherit" onClick={e => setAnchorNotification(e.currentTarget)}>
              <Badge color="secondary" badgeContent={notifications.filter(p => !p.read).length}
                invisible={!notifications.filter(p => !p.read).length}>
                <Notifications />
              </Badge>
            </MenuIconButton>

            <MenuIconButton color="inherit">
              <Help />
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
                      {!n.read && <Lens style={{ color: 'aqua' }} fontSize="inherit" />}
                      <Close onClick={() => remove(n)}
                        style={{ color: '#B44', cursor: 'pointer' }}
                        fontSize="inherit" />
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
                <LinkRouter to="/user-account">
                  <Button
                    autoFocus={true}
                    variant="contained"
                    onClick={() => setAnchorMenu(null)}
                    color="primary">{AppTexts.Toolbar.EditAccount[language]}</Button>
                </LinkRouter>
                <Button
                  style={{ marginLeft: '10px' }}
                  onClick={() => logout()}
                  variant="contained">{AppTexts.Toolbar.Logout[language]}</Button>
              </MenuFooter>
            </Menu>
          </>
          :
          <>
            <AppMenu>
              <li>
                <label>About</label>
              </li>
              <li>
                <label>Contact</label>
              </li>
            </AppMenu>
            <LinkRouter to="/register">
              <Button
                style={{ marginLeft: '10px', marginRight: '10px' }}
                onClick={() => logout()}
                variant="contained">Sign In</Button>
            </LinkRouter>
          </>
        }
      </Toolbar>
    </Container >
  )
}