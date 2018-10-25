import React from 'react'
import Sidebar from 'react-sidebar'
import { connect } from 'react-redux'

import { Colors } from '../../helpers/themes'
import Toobar from './Toolbar'
import SidebarContent from './SidebarContent'
import AppRouter from './AppRouter'
import Auth from '../../scenes/auth/Auth'

const mql = window.matchMedia(`(min-width: 800px)`)

class MainComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarDocked: mql.matches,
      sidebarIsOpen: false
    }
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this)
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged)
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged)
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches })
  }

  render() {
    return (
      this.props.user ?
        <Sidebar
          sidebar={<SidebarContent />}
          open={this.state.sidebarIsOpen}
          onSetOpen={open => this.setState({ sidebarIsOpen: open })}
          docked={this.state.sidebarDocked}
          styles={{ sidebar: { background: Colors.AppGreen } }}>
          <Toobar
            dockedMenu={this.state.sidebarDocked}
            openSideBar={() => this.setState({ sidebarIsOpen: true })}
          />
          <AppRouter />
        </Sidebar>
        :
        <Auth />
    )
  }
}

const mapStateToProps = state => ({ user: state.appState.user })

export default connect(mapStateToProps)(MainComponent)