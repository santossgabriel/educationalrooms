import React from 'react'
import axios from 'axios'
import {
  CardContent,
  Card,
  Button,
  Zoom
} from '@material-ui/core'

import { Email, Visibility, VisibilityOff, Person } from '@material-ui/icons'

import IconTextInput from '../../components/main/IconTextInput'

const styles = {
  Card: {
    width: '300px',
    margin: '0 auto',
    textAlign: 'center',
    paddingBottom: '20px',
    paddingTop: '20px',
    marginTop: '150px'
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
      <Zoom in={true}>
        <Card style={styles.Card}>
          <CardContent>
            <IconTextInput
              label="Name"
              onChange={(t) => this.onEmailChange(t)}
              Icon={<Person />}
            />
            <IconTextInput
              label="Email"
              onChange={(t) => this.onEmailChange(t)}
              Icon={<Email />}
            />
            <IconTextInput
              type={this.state.showPassword ? 'text' : 'password'}
              label="Password"
              onChange={(t) => this.onPasswordChange(t)}
              Icon={this.state.showPassword ? <VisibilityOff /> : <Visibility />}
              iconClick={() => this.setState({ showPassword: !this.state.showPassword })} />
            <IconTextInput
              type={this.state.showConfirm ? 'text' : 'password'}
              label="Confirm"
              onChange={(t) => this.onPasswordChange(t)}
              Icon={this.state.showConfirm ? <VisibilityOff /> : <Visibility />}
              iconClick={() => this.setState({ showConfirm: !this.state.showConfirm })} />
          </CardContent>
          <br />
          <Button style={{ width: '250px' }}
            variant="contained"
            onClick={() => this.login()}
            color="primary">Send</Button>
          <br /><br />
          <Button variant="outlined"
            onClick={this.props.changeScene}
            style={{ width: '250px' }} color="primary">back to Login</Button>
        </Card>
      </Zoom>
    )
  }
}