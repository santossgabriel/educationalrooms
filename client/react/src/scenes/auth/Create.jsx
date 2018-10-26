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
    this.state = {
      name: '',
      email: '',
      password: '',
      confirm: '',
      validName: false,
      validEmail: false,
      validPassword: false,
      validConfirm: false,
      showPassword: false
    }
  }

  onNameChange(t) { this.setState({ name: t }) }

  onEmailChange(t) { this.setState({ email: t }) }

  onPasswordChange(t) { this.setState({ password: t }) }

  onConfirmChange(t) { this.setState({ confirm: t }) }

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
              required
              minlength={5}
              onChange={(t) => this.onNameChange(t)}
              validChanged={valid => this.setState({ validName: valid })}
              Icon={<Person />}
            />
            <IconTextInput
              label="Email"
              email
              required
              onChange={(t) => this.onEmailChange(t)}
              validChanged={valid => this.setState({ validEmail: valid })}
              Icon={<Email />}
            />
            <IconTextInput
              type={this.state.showPassword ? 'text' : 'password'}
              required
              label="Password"
              onChange={(t) => this.onPasswordChange(t)}
              minlength={4}
              validChanged={valid => this.setState({ validPassword: valid })}
              Icon={this.state.showPassword ? <VisibilityOff /> : <Visibility />}
              iconClick={() => this.setState({ showPassword: !this.state.showPassword })}
            />
            <IconTextInput
              required
              type={this.state.showConfirm ? 'text' : 'password'}
              label="Confirm"
              onChange={(t) => this.onConfirmChange(t)}
              validChanged={valid => this.setState({ validConfirm: valid })}
              pattern={`^${this.state.password}$`}
              patternMessage="The passwords do not match."
              Icon={this.state.showConfirm ? <VisibilityOff /> : <Visibility />}
              iconClick={() => this.setState({ showConfirm: !this.state.showConfirm })}
            />
          </CardContent>
          <br />
          <Button style={{ width: '250px' }}
            variant="contained"
            onClick={() => this.login()}
            disabled={!this.state.validName || !this.state.validEmail || !this.state.validPassword || !this.state.validConfirm}
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