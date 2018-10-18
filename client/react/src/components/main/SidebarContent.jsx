import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import RoomIcon from '@material-ui/icons/RoomService';
import { Link, withRouter } from 'react-router-dom'
import { AppTexts, AppDefaultLanguage } from '../../helpers/appTexts';

const styles = {
  mainIcon: {
    color: 'white'
  },
  symbolDiv: {
    textAlign: 'center'
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

const appLanguage = AppDefaultLanguage

const MainText = (props) => (
  <ListItemText primary={<span style={styles.mainText}>{props.text}</span>} />
)

const SubMainText = (props) => (
  <ListItemText primary={<span style={styles.subMainText}>{props.text}</span>} />
)

const LinkListItem = (props) => {
  const clickHandle = (location, e) => {
    if (location.pathname === props.to)
      e.preventDefault()
  }
  const LinkRouter = withRouter((routerProps) => (
    <Link to={props.to}
      onClick={e => clickHandle(routerProps.location, e)}
      style={{ textDecoration: 'none' }}>
      <ListItem button >
        <ListItemText primary={<span style={styles.subMainText}>{props.text}</span>} />
      </ListItem>
    </Link>
  ))
  return <LinkRouter />
}

const {
  QuestionTexts,
  RoomTexts,
  ScoreTexts,
  NotificationTexts
} = AppTexts.MainComponent

export default class SidebarContent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.showMenu = this.showMenu.bind(this)
  }

  showMenu(menu) {
    menu = this.state.opened === menu ? '' : menu
    this.setState({ opened: menu })
  }

  render() {
    return (
      <div>
        <div style={styles.symbolDiv}>
          <span style={styles.symbolSpan}>{AppTexts.AppSymbol[appLanguage]}</span>
        </div>
        <List>
          <Divider />
          <ListItem button onClick={() => this.showMenu('question')}>
            <ListItemIcon>
              <QuestionAnswerIcon style={styles.mainIcon} />
            </ListItemIcon>
            <MainText text={QuestionTexts.Questions[appLanguage]} />
          </ListItem>
          <Collapse in={this.state.opened === 'question'} timeout={400} unmountOnExit>
            <List component="div" disablePadding>
              <LinkListItem to="/my-questions" text={QuestionTexts.My[appLanguage]} />
              <LinkListItem to="/shared-questions" text={QuestionTexts.Shared[appLanguage]} />
            </List>
          </Collapse>

          <Divider />
          <Link to="/rooms" style={{ textDecoration: 'none' }}>
            <ListItem button onClick={() => this.showMenu('room')}>
              <ListItemIcon>
                <RoomIcon style={styles.mainIcon} />
              </ListItemIcon>
              <MainText text={RoomTexts.Rooms[appLanguage]} />
            </ListItem>
          </Link>

          <Divider />
          <Link to="/score" style={{ textDecoration: 'none' }}>
            <ListItem button onClick={() => this.showMenu('score')}>
              <ListItemIcon>
                <RoomIcon style={styles.mainIcon} />
              </ListItemIcon>
              <MainText text={ScoreTexts.Scores[appLanguage]} />
            </ListItem>
          </Link>

          <Divider />
          <ListItem button onClick={() => this.showMenu('notification')}>
            <ListItemIcon>
              <RoomIcon style={styles.mainIcon} />
            </ListItemIcon>
            <MainText text={NotificationTexts.Notifications[appLanguage]} />
          </ListItem>
          <Collapse in={this.state.opened === 'notification'} timeout={400} unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button >
                <SubMainText text={NotificationTexts.Notifications[appLanguage]} />
              </ListItem>
            </List>
          </Collapse>
          <Divider />
        </List>
      </div>
    )
  }
}