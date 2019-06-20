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
  const questions = [
    { id: 1, description: 'descrição 1', area: 'area 1', difficulty: 3, answers: [{}, {}, {}] },
    { id: 2, description: 'descrição 2', area: 'area 2', difficulty: 2, answers: [{}, {}, {}, {}] }
  ]
  switch (url) {
    case '/account':
      return Promise.resolve({ email: 'jest@mail.com', name: 'jest' })
    case '/question':
      return Promise.resolve(questions)
    case '/areas':
      return Promise.resolve(['area 1', 'area 2'])
    default:
      return Promise.resolve({ status: 404 })
  }
}

const post = (url) => {
  return Promise.resolve({ data: { name: 'Fulano', url } })
}

const put = (url) => {
  return Promise.resolve({ data: { name: 'Fulano', url } })
}

const dele = (url) => {
  return Promise.resolve({ data: { name: 'Fulano', url } })
}

export default {
  postNotAuthenticated,
  get,
  post,
  put,
  delete: dele
}
