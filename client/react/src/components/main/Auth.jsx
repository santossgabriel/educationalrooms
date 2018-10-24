import React from 'react'
import axios from 'axios'

import {
  CardContent,
  Card,
  TextField,
  Button
} from '@material-ui/core'

const styles = {
  Card: {
    width: '300px',
    margin: '0 auto',
    textAlign: 'center',
    paddingBottom: '20px',
    marginTop: '150px'
  }
}

class Auth extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  onEmailChange(t) {
    this.setState({ email: t })
  }

  onPasswordChange(t) {
    this.setState({ password: t })
  }

  login() {
    axios.post('/api/token', this.state)
      .then(res => console.log(res))
      .catch(err => {
        console.log('erro tratado')
        console.log(err.message)
      })
  }

  render() {
    return (
      <Card style={styles.Card}>
        <CardContent>
          <TextField label="Email"
            onChange={(e) => this.onEmailChange(e.target.value)}
          />
          <TextField label="Password"
            type="password"
            style={{ marginTop: '10px' }}
            onChange={(e) => this.onPasswordChange(e.target.value)}
          />
        </CardContent>
        <br />
        <Button style={{ width: '60%' }}
          variant="contained"
          onClick={() => this.login()}
          color="primary">Entrar</Button>
        <br /><br />
        <Button color="primary">Nova Conta</Button>
      </Card>
    )
  }
}

export default Auth