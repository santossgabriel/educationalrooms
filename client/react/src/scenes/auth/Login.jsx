import React from 'react'
import axios from 'axios'
import {
  CardContent,
  Card,
  Button,
  Zoom
} from '@material-ui/core'

import { Email, Visibility, VisibilityOff } from '@material-ui/icons'

import GoogleButton from '../../components/main/GoogleButton'
import IconTextInput from '../../components/main/IconTextInput'


const styles = {
  Card: {
    width: '300px',
    margin: '0 auto',
    textAlign: 'center',
    paddingBottom: '20px',
    paddingTop: '20px',
    marginTop: '150px'
  },
  Or: {
    textAlign: 'center',
    color: '#666',
    marginTop: '25px',
    fontWeight: 'bold',
    fontFamily: 'Arial'
  }
}

export default class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = { showPassword: false }
  }

  onEmailChange(t) { this.setState({ email: t }) }

  onPasswordChange(t) { this.setState({ password: t }) }

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
      <div>
        <Zoom in={true}>
          <Card style={styles.Card}>
            <GoogleButton label="Login with google" />
            <div style={styles.Or}>OR</div>
            <CardContent>
              <IconTextInput
                label="Email"
                required
                email
                onChange={(t) => this.onEmailChange(t)}
                Icon={<Email />}
              />

              <IconTextInput
                type={this.state.showPassword ? 'text' : 'password'}
                label="Password"
                required
                minlength={4}
                onChange={(t) => this.onPasswordChange(t)}
                Icon={this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                iconClick={() => this.setState({ showPassword: !this.state.showPassword })} />
            </CardContent>
            <br />
            <Button style={{ width: '250px' }}
              variant="contained"
              onClick={() => this.login()}
              color="primary">Login</Button>
            <br /><br />
            <Button style={{ width: '250px' }}
              variant="outlined"
              onClick={this.props.changeScene}
              color="primary">Create Account</Button>
          </Card>
        </Zoom>
      </div>
    )
  }
}