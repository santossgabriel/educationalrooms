import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider } from '@material-ui/core'
import MainComponent from './components/main/MainComponent'
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
        <MainComponent>
          <div style={{ fontFamily: 'PTC55F' }}>Main Sidebar</div>
        </MainComponent>
      </MuiThemeProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))

module.hot.accept()