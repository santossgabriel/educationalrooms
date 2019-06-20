import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Email, Visibility, VisibilityOff } from '@material-ui/icons'
import { CardContent, Zoom, FormHelperText, CircularProgress } from '@material-ui/core'


import GoogleButton from '../../components/main/GoogleButton'
import IconTextInput from '../../components/main/IconTextInput'
import { userChanged } from '../../actions'
import { authService } from '../../services'
import { ButtonAuth, Or, Container } from './styles'

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.onInputChange = this.onInputChange.bind(this)
  }

  componentDidMount() { this._isMounted = true }
  componentWillUnmount() { this._isMounted = false }

  onInputChange(e) {
    this.setState({
      [e.name]: e.value,
      [`${e.name}Valid`]: e.valid,
      errorMessage: ''
    })
  }

  login(e) {
    this.setState({ loading: true })
    if (e)
      e.preventDefault()
    authService.login({
      email: this.state.email,
      password: this.state.password
    }).then(user => {
      if (this._isMounted) {
        this.setState({ loading: false })
        this.props.userChanged(user)
      }
    }).catch(err => {
      if (this._isMounted)
        this.setState({ errorMessage: err.message, loading: false })
    })
  }

  render() {
    return (
      <Zoom in={true}>
        <Container>
          <form onSubmit={e => this.login(e)}>
            <GoogleButton label="Login with google" disabled={this.state.loading} />
            <Or>OR</Or>
            <CardContent>
              <IconTextInput
                label="Email"
                required
                email
                disabled={this.state.loading}
                name="email"
                onChange={this.onInputChange}
                validChanged={valid => this.setState({ emailValid: valid })}
                Icon={<Email />}
              />
              <IconTextInput
                type={this.state.showPassword ? 'text' : 'password'}
                label="Password"
                required
                minlength={4}
                onChange={this.onInputChange}
                name="password"
                disabled={this.state.loading}
                Icon={this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                iconClick={() => this.setState({ showPassword: !this.state.showPassword })} />
            </CardContent>
            <br />
            <div style={{ marginBottom: '10px' }} hidden={!this.state.loading}>
              <CircularProgress />
            </div>
            <div hidden={this.state.loading}>
              <ButtonAuth
                jestid="btnLogin"
                variant="contained"
                disabled={!this.state.emailValid || !this.state.passwordValid}
                type="submit"
                onClick={() => this.login()}
                color="primary">Login</ButtonAuth>
              <br /><br />
              <ButtonAuth
                jestid="btnToCreate"
                variant="outlined"
                onClick={this.props.changeScene}
                color="primary">Create Account</ButtonAuth>
              <FormHelperText jestid="msgLogin" style={{ textTransform: 'uppercase', textAlign: 'center', marginTop: '8px' }}
                hidden={!this.state.errorMessage} error={true}>
                {this.state.errorMessage}
              </FormHelperText>
            </div>
          </form>
        </Container>
      </Zoom >
    )
  }
}

Login.propTypes = {
  changeScene: PropTypes.func,
  userChanged: PropTypes.func
}

const mapDispatchToProps = dispatch => bindActionCreators({ userChanged }, dispatch)

export default connect(null, mapDispatchToProps)(Login)