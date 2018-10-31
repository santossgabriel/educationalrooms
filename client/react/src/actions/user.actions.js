import axios from 'axios'

import {
  LANGUAGE_CHANGED,
  USER_CHANGED
} from './actionTypes'

export const languageChanged = newLanguage => ({
  type: LANGUAGE_CHANGED,
  payload: newLanguage
})

export const userChanged = user => ({
  type: USER_CHANGED,
  payload: user
})

export const logout = () => ({
  type: USER_CHANGED,
  payload: null
})

export const login = user => dispatch =>
  new Promise((resolve, reject) => {
    axios.post('/api/token', user)
      .then(res => {
        axios.get('/api/account', {
          headers: { token: res.data.token }
        }).then(rUser => resolve(rUser.data))
          .catch(err => reject(err.response.data.message))
      }).catch(err => reject(err.response.data.message))
  })

// axios.post('/api/token', this.state)
//   .then(res => {
//     axios.get('/api/account', {
//       headers: { token: res.data.token }
//     })//.then(res => console.log(res))
//     //.catch(err => console.log(err))
//   })
//   .catch(err => {
//     console.log(err)
//     // this.setState({ errorMessage: err.response.data.message })
//   })