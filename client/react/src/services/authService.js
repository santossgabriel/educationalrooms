import httpService from './httpService'

const updateToken = token => localStorage.setItem('TOKEN', token)

const getAccount = () => httpService.get('/account')

const login = user =>
  httpService.postNotAuthenticated('/token', user)
    .then(res => {
      updateToken(res.token)
      return getAccount()
    }).catch(err => { throw err })

const createAccount = account =>
  httpService.postNotAuthenticated('/account', account)
    .then(res => {
      updateToken(res.token)
      return getAccount()
    }).catch(err => { throw err })

const updateAccount = account => httpService.put('/account', account)

const logout = () => updateToken(null)

const sendGoogleToken = token => httpService.post('/token-google', {
  googleToken: token
}).then(res => {
  updateToken(res.token)
  return getAccount()
}).catch(err => { throw err })

export default {
  getAccount,
  login,
  createAccount,
  updateAccount,
  logout,
  sendGoogleToken
}