import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from '@material-ui/core'
import Toobar from './components/Toolbar'

const title = 'My Minimal React Webpack Babel Seeetup'

ReactDOM.render(
  <div>
    <Toobar></Toobar>
    <h2>{title}</h2>
    <Button>Buscar dados</Button>
  </div>,
  document.getElementById('app')
);

module.hot.accept()