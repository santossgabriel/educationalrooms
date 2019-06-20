const postNotAuthenticated = (url, body) => {
  switch (url) {
    case '/token':
      if (body.email === 'jest@mail.com' && body.password === '123456')
        return Promise.resolve({ message: 'Token gerado com sucesso.', status: 200 })
      else
        return Promise.reject({ message: 'Credenciais inválidas.', status: 401 })
    case '/account':
      if (body.email === 'jest2@mail.com' && body.password === '123456')
        return Promise.resolve({ message: 'Token gerado com sucesso.', status: 200 })
      else
        return Promise.reject({ message: 'Este email já está em uso.', status: 400 })
    default:
      return { status: 404 }
  }
}

const get = url => {
  switch (url) {
    case '/account':
      return Promise.resolve({ email: 'jest@mail.com', name: 'jest' })
  }
}

const post = (url, body) => {
  return Promise.resolve({ data: { name: 'Fulano', url } })
}

const put = (url, body) => {
  return Promise.resolve({ data: { name: 'Fulano', url } })
}

const dele = (url, body) => {
  return Promise.resolve({ data: { name: 'Fulano', url } })
}

export default {
  postNotAuthenticated,
  get,
  post,
  put,
  delete: dele
}
