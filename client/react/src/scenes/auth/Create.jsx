import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { CardContent, Zoom, FormHelperText } from '@material-ui/core'
import { Email, Visibility, VisibilityOff, Person } from '@material-ui/icons'

import IconTextInput from '../../components/main/IconTextInput'
import { authService } from '../../services'
import { userChanged } from '../../actions'
import { ButtonAuth, Container } from './styles'

class Create extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
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

  send() {
    authService.createAccount({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      if (this._isMounted)
        this.props.userChanged(res)
    }).catch(err => {
      if (this._isMounted)
        this.setState({ errorMessage: err.message })
    })
  }

  render() {
    return (
      <Zoom in={true}>
        <Container>
          <CardContent>
            <IconTextInput
              label="Name"
              required
              minlength={5}
              name="name"
              onChange={e => this.onInputChange(e)}
              Icon={<Person />}
            />
            <IconTextInput
              label="Email"
              email
              required
              name="email"
              onChange={e => this.onInputChange(e)}
              Icon={<Email />}
            />
            <IconTextInput
              type={this.state.showPassword ? 'text' : 'password'}
              required
              label="Password"
              name="password"
              onChange={e => this.onInputChange(e)}
              minlength={4}
              Icon={this.state.showPassword ? <VisibilityOff /> : <Visibility />}
              iconClick={() => this.setState({ showPassword: !this.state.showPassword })}
            />
            <IconTextInput
              required
              type={this.state.showConfirm ? 'text' : 'password'}
              label="Confirm"
              name="confirm"
              onChange={e => this.onInputChange(e)}
              pattern={`^${this.state.password}$`}
              patternMessage="The passwords do not match."
              Icon={this.state.showConfirm ? <VisibilityOff /> : <Visibility />}
              iconClick={() => this.setState({ showConfirm: !this.state.showConfirm })}
            />
          </CardContent>
          <br />
          <ButtonAuth
            jestid="btnCreate"
            variant="contained"
            type="submit"
            onClick={() => this.send()}
            disabled={!this.state.nameValid || !this.state.emailValid || !this.state.passwordValid || !this.state.confirmValid}
            color="primary">Send</ButtonAuth>
          <br /><br />
          <ButtonAuth variant="outlined"
            jestid="btnToLogin"
            onClick={this.props.changeScene}
            color="primary">back to Login</ButtonAuth>
          <FormHelperText style={{ textTransform: 'uppercase', textAlign: 'center', marginTop: '8px' }}
            jestid="msgCreate"
            hidden={!this.state.errorMessage} error={true}>
            {this.state.errorMessage}
          </FormHelperText>
        </Container>
      </Zoom>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ userChanged }, dispatch)

export default connect(null, mapDispatchToProps)(Create)

Create.propTypes = {
  changeScene: PropTypes.func,
  userChanged: PropTypes.func
}