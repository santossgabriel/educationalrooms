import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { Email, Lock } from '@material-ui/icons'
import { CardContent, Zoom, FormHelperText, CircularProgress } from '@material-ui/core'

import { GoogleButton } from 'components'
import IconTextInput from 'components/main/IconTextInput'
import { userChanged } from 'store/actions'
import { authService } from 'services'
import { ButtonAuth, Or, Container } from './styles'

export default function Login({ changeScene }) {

  const [form, setForm] = useState({ email: {}, password: {} })
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => startGoogleApi(), [])

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
      setTimeout(() => {
        setLoading(false)
        console.log(user)
        dispatch(userChanged(user))
      }, 500)
    } catch (ex) {
      setLoading(false)
      setErrorMessage(ex.message)
    }
  }

  function startGoogleApi() {
    let auth2
    window.gapi.load('auth2', () => {
      auth2 = window.gapi.auth2.init({
        client_id: '177211292368-ro5aar6klvjkustdlga8616m8cds2iru.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      })
      auth2.attachClickHandler(document.getElementById('btnGoogle'), {},
        googleUser => googleCallback(googleUser),
        error => console.log(error))
    })
  }

  async function googleCallback(googleUser) {
    const perfil = googleUser.getBasicProfile()
    const user = {
      id: perfil.getId(),
      name: perfil.getName(),
      email: perfil.getEmail(),
      image: perfil.getImageUrl(),
      googleToken: googleUser.getAuthResponse().id_token
    }
    try {
      const result = await authService.sendGoogleToken(user.googleToken)
      dispatch(userChanged(result))
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <Zoom in={true}>
      <Container>
        <form onSubmit={e => { e.preventDefault(); login() }}>
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
            <FormHelperText jestid="msgLogin" style={{
              textTransform: 'uppercase',
              textAlign: 'center',
              marginTop: '8px'
            }}
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