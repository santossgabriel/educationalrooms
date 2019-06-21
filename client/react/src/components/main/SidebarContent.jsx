import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import RoomIcon from '@material-ui/icons/RoomService'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { AppTexts } from '../../helpers/appTexts'
import { getCurrentPath } from './AppRouter'

const styles = {
  mainIcon: {
    color: 'white'
  },
  symbolDiv: {
    textAlign: 'center',
    width: '260px'
  },
  symbolSpan: {
    color: '#FFF',
    fontFamily: 'FrederickaGreat',
    fontSize: '60px'
  },
  mainText: {
    color: '#FFF',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  subMainText: {
    color: '#FFF',
    marginLeft: '30px',
    fontSize: '14px'
  }
}

const {
  QuestionTexts,
  RoomTexts,
  ScoreTexts,
  NotificationTexts
} = AppTexts.MainComponent

const MainText = ({ sub, text }) => (
  <ListItemText primary={<span style={sub ? styles.subMainText : styles.mainText}>{text}</span>} />
)

const LinkListItem = ({ to, onClick, text }) => {
  const clickHandle = (e) => {
    if (getCurrentPath() === to)
      e.preventDefault()
    onClick()
  }
  return (
    <Link to={to}
      onClick={e => clickHandle(e)}
      style={{ textDecoration: 'none' }}>
      <ListItem button >
        <ListItemText primary={<span style={styles.subMainText}>{text}</span>} />
      </ListItem>
    </Link>
  )
}

export default function SidebarContent(props) {

  const language = useSelector(state => state.appState.language)
  const [opened, setOpened] = useState('')

  function showMenu(menu) {
    setOpened(opened === menu ? '' : menu)
  }

  return (
    <div>
      <div style={styles.symbolDiv}>
        <span style={styles.symbolSpan}>{AppTexts.AppSymbol[language]}</span>
      </div>
      <List>
        <Divider />

        <ListItem button onClick={() => showMenu('question')}>
          <ListItemIcon>
            <QuestionAnswerIcon style={styles.mainIcon} />
          </ListItemIcon>
          <MainText text={QuestionTexts.Questions[language]} />
        </ListItem>

        <Collapse in={opened === 'question'} timeout={400} unmountOnExit>
          <List component="div" disablePadding>
            <LinkListItem onClick={() => props.closeSidebar()} to="/my-questions" text={QuestionTexts.My[language]} />
            <LinkListItem onClick={() => props.closeSidebar()} to="/shared-questions" text={QuestionTexts.Shared[language]} />
          </List>
        </Collapse>

        <Divider />
        <ListItem button onClick={() => showMenu('room')}>
          <ListItemIcon>
            <RoomIcon style={styles.mainIcon} />
          </ListItemIcon>
          <MainText text={RoomTexts.Rooms[language]} />
        </ListItem>

        <Collapse in={opened === 'room'} timeout={400} unmountOnExit>
          <List component="div" disablePadding>
            <LinkListItem onClick={() => props.closeSidebar()} to="/my-rooms" text={RoomTexts.My[language]} />
            <LinkListItem onClick={() => props.closeSidebar()} to="/open-rooms" text={RoomTexts.Open[language]} />
            <LinkListItem onClick={() => props.closeSidebar()} to="/associate-rooms" text={RoomTexts.Associate[language]} />
          </List>
        </Collapse>

        <Divider />
        <Link to="/score" style={{ textDecoration: 'none' }}>
          <ListItem button onClick={() => showMenu('score')}>
            <ListItemIcon>
              <RoomIcon style={styles.mainIcon} />
            </ListItemIcon>
            <MainText text={ScoreTexts.Scores[language]} />
          </ListItem>
        </Link>

        <Divider />
        <ListItem button onClick={() => showMenu('notification')}>
          <ListItemIcon>
            <RoomIcon style={styles.mainIcon} />
          </ListItemIcon>
          <MainText text={NotificationTexts.Notifications[language]} />
        </ListItem>
        <Collapse in={opened === 'notification'} timeout={400} unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button >
              <MainText sub text={NotificationTexts.Notifications[language]} />
            </ListItem>
          </List>
        </Collapse>
        <Divider />
      </List>
    </div>
  )
}

MainText.propTypes = {
  sub: PropTypes.bool,
  text: PropTypes.string
}

LinkListItem.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string
}

SidebarContent.propTypes = {
  closeSidebar: PropTypes.func
}