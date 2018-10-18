import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider } from '@material-ui/core'
import { HashRouter } from 'react-router-dom'
import MainComponent from './components/main/MainComponent'
import AppRouter from './components/main/AppRouter'
import { AppTheme } from './helpers/themes'

import './App.css'

class App extends React.Component {

  constructor() {
    super()
    this.state = { sidebarIsOpen: false }
  }

  render() {
    return (
      <MuiThemeProvider theme={AppTheme}>
        <HashRouter>
          <MainComponent>
            <AppRouter />
          </MainComponent>
        </HashRouter>
      </MuiThemeProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))

module.hot.accept()