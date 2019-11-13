import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { HashRouter } from 'react-router-dom'

import { Toolbar, Footer, OpenedQuizLinkList, GlobalToast } from 'components'
import AppRouter from './AppRouter'
import Auth from 'scenes/auth/Auth'
import { AlertModal } from '../main/Moda'
import { hideAlert, userChanged } from 'store/actions'
import { authService } from 'services'


class MainComponent extends React.Component {

  componentDidMount() {
    if (this.props.user) {
      authService.getAccount()
        .then(res => {
          if (!res)
            this.props.userChanged(null)
        })
    }
  }

  render() {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {this.props.user ?
          <HashRouter>
            <>
              <Toolbar />
              <div style={{ flex: 1 }}>
                <AppRouter />
              </div>
              <OpenedQuizLinkList />
              <GlobalToast />
              <AlertModal type={this.props.modal.type}
                text={this.props.modal.message}
                show={this.props.modal.show}
                onClose={() => this.props.hideAlert()} />
              <Footer />
            </>
          </HashRouter>
          :
          <Auth />
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.appState.user,
  modal: state.modalState,
  language: state.appState.language
})

const mapDispatchToProps = dispatch => bindActionCreators({ hideAlert, userChanged }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent)