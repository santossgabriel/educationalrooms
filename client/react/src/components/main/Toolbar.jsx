import React from 'react'
import { AppBar, Toolbar, Button } from '@material-ui/core/'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import * as Icons from '@material-ui/icons'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { AppTexts, Languages } from '../../helpers/appTexts'
import { BrazilFlag, UnitedStatesFlag } from './Flags'
import { languageChanged } from '../../actions';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 2,
    textTransform: 'uppercase'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
}

class AppToolbar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.changeLanguage = this.changeLanguage.bind(this)
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose() {
    this.setState({ anchorEl: null })
  }

  changeLanguage(l) {
    this.props.languageChanged(l)
    document.title = AppTexts.AppTitle[l]
    this.handleClose()
  }

  render() {
    return (
      <div style={styles.root} >
        <AppBar position='static' color='primary'>
          <Toolbar>
            {
              this.props.dockedMenu ? null :
                <IconButton style={styles.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={() => this.props.openSideBar()}>
                  <Icons.Menu />
                </IconButton>
            }
            <Typography variant="title" color="inherit" style={styles.grow}>
              {AppTexts.AppTitle[this.props.language]}
            </Typography>
            <IconButton
              color="inherit"
              aria-label="Person"
              onClick={this.handleClick}>
              <Icons.Person />
            </IconButton>

            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}>
              <span>menu principal do site da aplicação</span>
              <UnitedStatesFlag onClick={() => this.changeLanguage(Languages.EN_US)} />
              <BrazilFlag onClick={() => this.changeLanguage(Languages.PT_BR)} />
              <MenuItem onClick={this.handleClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleClose}>My account</MenuItem>
              <MenuItem onClick={this.handleClose}>Logout</MenuItem>
              <div style={{ padding: '10px' }}>
                <Button variant="contained" color="primary">Editar Conta</Button>
                <Button style={{ marginLeft: '10px' }} variant="contained">Sair</Button>
              </div>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const mapStateToProps = state => ({ language: state.appState.language })

const mapDispatchToProps = dispatch => bindActionCreators({ languageChanged }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AppToolbar)