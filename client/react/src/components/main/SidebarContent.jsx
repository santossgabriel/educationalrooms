import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import RoomIcon from '@material-ui/icons/RoomService';
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
  }
}

const appLanguage = AppDefaultLanguage

const MainText = (props) => (
  <ListItemText primary={<span style={{ color: '#FFF' }}>{props.text}</span>} />
)

const SidebarContent = () => (
  <div>
    <div style={styles.symbolDiv}>
      <span style={styles.symbolSpan}>{appLanguage === 'enus' ? 'ER' : 'SE'}</span>
    </div>
    <List>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <QuestionAnswerIcon style={styles.mainIcon} />
        </ListItemIcon>
        <MainText text={AppTexts.MainComponent.Question[appLanguage]} />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <RoomIcon style={styles.mainIcon} />
        </ListItemIcon>
        <MainText text={AppTexts.MainComponent.Rooms[appLanguage]} />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <RoomIcon style={styles.mainIcon} />
        </ListItemIcon>
        <MainText text={AppTexts.MainComponent.Scores[appLanguage]} />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <RoomIcon style={styles.mainIcon} />
        </ListItemIcon>
        <MainText text={AppTexts.MainComponent.Notification[appLanguage]} />
      </ListItem>
      <Divider />
    </List>
  </div>
)

export default SidebarContent