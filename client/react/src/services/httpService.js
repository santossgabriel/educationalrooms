import axios from 'axios'
import { storageService } from './'

const getToken = () => localStorage.getItem('TOKEN')

const sendRequest = (method, url, headers, data) => {
  return axios({
    method: method,
    headers: headers,
    url: url,
    data: data
  }).then(res => {
    if (res.data && res.data.message && res.data.message.br)
      res.data.message = res.data.message[storageService.getLanguage()]
    return res.data
  }).catch(err => {
    const { data } = err.response
    if (data && data.message && data.message.br)
      data.message = data.message[storageService.getLanguage()]
    throw data
  })
}

const getHeaders = () => ({ token: getToken() })

export default {
  getNotAuthenticated: (url) => sendRequest('get', `/api${url}`),
  postNotAuthenticated: (url, body) => sendRequest('post', `/api${url}`, null, body),
  get: (url) => sendRequest('get', `/api${url}`, getHeaders()),
  post: (url, body) => sendRequest('post', `/api${url}`, getHeaders(), body),
  put: (url, body) => sendRequest('put', `/api${url}`, getHeaders(), body),
  delete: (url, body) => sendRequest('delete', `/api${url}`, getHeaders(), body)
}