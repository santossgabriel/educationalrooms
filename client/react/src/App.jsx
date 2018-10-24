import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core'
import { HashRouter } from 'react-router-dom'
import MainComponent from './components/main/MainComponent'

import { AppTheme } from './helpers/themes'
import { Store } from './store'

import './App.css'

class App extends React.Component {

  constructor() {
    super()
    this.state = { sidebarIsOpen: false }
  }

  render() {
    return (
      <Provider store={Store}>
        <MuiThemeProvider theme={AppTheme}>
          <HashRouter>
            <MainComponent />
          </HashRouter>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))

module.hot.accept()