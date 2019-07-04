import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { CardContent, Zoom, FormHelperText } from '@material-ui/core'
import { Email, Visibility, VisibilityOff, Person } from '@material-ui/icons'

import IconTextInput from '../../components/main/IconTextInput'
import { authService } from '../../services'
import { userChanged } from '../../actions'
import { ButtonAuth, Container } from './styles'

export default function Create({ changeScene }) {

  const [form, setForm] = useState({ name: {}, email: {}, password: {}, confirm: {} })
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const dispatch = useDispatch()

  function fieldChanged(e) {
    form[e.name] = e
    const { name, email, password, confirm } = form
    form.valid = name.valid && email.valid && password.valid && confirm.valid
    setForm({ ...form })
  }

  async function send() {
    try {
      const user = {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value
      }
      const res = await authService.createAccount(user)
      dispatch(userChanged(res))
    } catch (ex) {
      setErrorMessage(ex.message)
    }
  }

  return (
    <Zoom in={true}>
      <Container>
        <form onSubmit={() => send()}>
          <CardContent>
            <IconTextInput
              label="Name"
              required
              minlength={5}
              name="name"
              onChange={e => fieldChanged(e)}
              Icon={<Person />}
            />
            <IconTextInput
              label="Email"
              email
              required
              name="email"
              onChange={e => fieldChanged(e)}
              Icon={<Email />}
            />
            <IconTextInput
              type={showPassword ? 'text' : 'password'}
              required
              label="Password"
              name="password"
              onChange={e => fieldChanged(e)}
              minlength={4}
              Icon={showPassword ? <VisibilityOff /> : <Visibility />}
              iconClick={() => setShowPassword(!showPassword)}
            />
            <IconTextInput
              required
              type={showConfirm ? 'text' : 'password'}
              label="Confirm"
              name="confirm"
              onChange={e => fieldChanged(e)}
              pattern={`^${form.password.value}$`}
              patternMessage="The passwords do not match."
              Icon={showConfirm ? <VisibilityOff /> : <Visibility />}
              iconClick={() => setShowConfirm(!showConfirm)}
            />
          </CardContent>
          <br />
          <ButtonAuth
            jestid="btnCreate"
            variant="contained"
            type="submit"
            onClick={() => send()}
            disabled={!form.valid}
            color="primary">Send</ButtonAuth>
          <br /><br />
          <ButtonAuth variant="outlined"
            jestid="btnToLogin"
            onClick={changeScene}
            color="primary">back to Login</ButtonAuth>
          <FormHelperText style={{ textTransform: 'uppercase', textAlign: 'center', marginTop: '8px' }}
            jestid="msgCreate"
            hidden={!errorMessage} error={true}>
            {errorMessage}
          </FormHelperText>
        </form>
      </Container>
    </Zoom>
  )
}

Create.propTypes = {
  changeScene: PropTypes.func.isRequired
}