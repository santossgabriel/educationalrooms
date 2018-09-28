import React from 'react'
import ReactDOM from 'react-dom'
import { Button, MuiThemeProvider } from '@material-ui/core'
import Toobar from './components/main/Toolbar'
import Sidebar from './components/main/Sidebar'
import { AppTheme } from './helpers/themes';

const title = 'My Minimal React Webpack Babel Seeetup'

class App extends React.Component {

  constructor() {
    super()
    this.state = { sidebarIsOpen: false }
  }

  render() {
    return (
      <MuiThemeProvider theme={AppTheme}>
        <div>
          <Sidebar
            isOpen={this.state.sidebarIsOpen}
            onSetSidebarOpen={() => this.setState({ sidebarIsOpen: false })} />
          <Toobar openSideBar={() => this.setState({ sidebarIsOpen: true })} />
          <h2>{title}</h2>
          <Button onClick={() => this.setState({ sidebarIsOpen: true })}>Abrir</Button>
        </div>
      </MuiThemeProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))

module.hot.accept()