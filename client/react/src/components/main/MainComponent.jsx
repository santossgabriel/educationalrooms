import React from 'react'
import Sidebar from 'react-sidebar'
import { connect } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { Colors } from '../../helpers/themes'
import Toobar from './Toolbar'
import SidebarContent from './SidebarContent'
import AppRouter from './AppRouter'
import Auth from '../../scenes/auth/Auth'
import { AlertModal } from '../main/Modal'

const mql = window.matchMedia(`(min-width: 800px)`)

class MainComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarDocked: mql.matches,
      sidebarIsOpen: false,
      showModal: false
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

  componentDidMount() {
    // axios.interceptors.response.use(response => response, error => {
    //   console.log(error.response)
    //   if (error.response && error.response.status === 401)
    //     this.setState({ showModal: true })
    //   return Promise.reject(error.response)
    // })
  }

  render() {
    return (
      <div>
        {this.props.user ?
          <HashRouter>
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
          </HashRouter>
          :
          <Auth />
        }
        <AlertModal title="Sessão expirou!"
          text="Você será redirecionado para a tela de login."
          show={this.state.showModal}
          onClose={() => this.setState({ showModal: false })} />
      </div>
    )
  }
}

const mapStateToProps = state => ({ user: state.appState.user })

export default connect(mapStateToProps)(MainComponent)