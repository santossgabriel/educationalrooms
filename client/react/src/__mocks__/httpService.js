export default {
  // getNotAuthenticated: url => Promise.resolve({ data: { name: 'Fulano' } }),
  // postNotAuthenticated: (url, body) => sendRequest('post', `/api${url}`, null, body),
  get: url => Promise.resolve({ data: { name: 'Fulano', url } }),
  // post: (url, body) => sendRequest('post', `/api${url}`, getHeaders(), body),
  // put: (url, body) => sendRequest('put', `/api${url}`, getHeaders(), body),
  // delete: (url, body) => sendRequest('delete', `/api${url}`, getHeaders(), body)
}