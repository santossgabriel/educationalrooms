import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { More, Menu } from '@material-ui/icons'
import { AppTexts, AppDefaultLanguage } from '../../helpers/appTexts';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    textTransform: 'uppercase'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

const appLanguage = AppDefaultLanguage

document.title = AppTexts.AppTitle[appLanguage]

const ButtonAppBar = (props) => {
  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar position='static' color='primary'>
        <Toolbar>
          {
            props.dockedMenu ? null :
              <IconButton className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={() => props.openSideBar()}>
                <Menu />
              </IconButton>
          }
          <Typography variant="title" color="inherit" className={classes.grow}>
            {AppTexts.AppTitle[appLanguage]}
          </Typography>
          <IconButton className={classes.menuButton}
            color="inherit"
            aria-label="More"
            onClick={() => props.openSideBar()}>
            <More />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar)