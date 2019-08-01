import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { Email, Lock } from '@material-ui/icons'
import { CardContent, Zoom, FormHelperText, CircularProgress } from '@material-ui/core'


import GoogleButton from 'components/main/GoogleButton'
import IconTextInput from 'components/main/IconTextInput'
import { userChanged } from 'store/actions'
import { authService } from 'services'
import { ButtonAuth, Or, Container } from './styles'

export default function Login({ changeScene }) {

  const [form, setForm] = useState({ email: {}, password: {} })
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  function fieldChanged(e) {
    form[e.name] = e
    const { email, password } = form
    form.valid = email.valid && password.valid
    setForm({ ...form })
    setErrorMessage('')
  }

  async function login() {
    setLoading(true)
    try {
      const user = await authService.login({
        email: form.email.value,
        password: form.password.value
      })
      setLoading(false)
      dispatch(userChanged(user))
    } catch (ex) {
      setLoading(false)
      setErrorMessage(ex.message)
    }
  }

  return (
    <Zoom in={true}>
      <Container>
        <form onSubmit={() => login()}>
          <GoogleButton label="Login with google" disabled={loading} />
          <Or>OR</Or>
          <CardContent>
            <IconTextInput
              label="Email"
              required
              email
              disabled={loading}
              name="email"
              onChange={(e) => fieldChanged(e)}
              Icon={<Email />}
            />
            <IconTextInput
              type="password"
              label="Password"
              required
              minlength={4}
              onChange={(e) => fieldChanged(e)}
              name="password"
              disabled={loading}
              Icon={<Lock />} />
          </CardContent>
          <br />
          <div style={{ marginBottom: '10px' }} hidden={!loading}>
            <CircularProgress />
          </div>
          <div hidden={loading}>
            <ButtonAuth
              jestid="btnLogin"
              variant="contained"
              disabled={!form.valid}
              type="submit"
              color="primary">Login</ButtonAuth>
            <br /><br />
            <ButtonAuth
              jestid="btnToCreate"
              variant="outlined"
              onClick={changeScene}
              color="primary">Create Account</ButtonAuth>
            <FormHelperText jestid="msgLogin" style={{ textTransform: 'uppercase', textAlign: 'center', marginTop: '8px' }}
              hidden={!errorMessage} error={true}>
              {errorMessage}
            </FormHelperText>
          </div>
        </form>
      </Container>
    </Zoom >
  )
}

Login.propTypes = {
  changeScene: PropTypes.func,
  userChanged: PropTypes.func
}