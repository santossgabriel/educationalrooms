import { throwValidationError } from './error'

export const validateAccount = (account) => {
  if (!account || !account.email || !/.{3,}@.{3,}/.test(account.email))
    throwValidationError({ br: 'Email inválido.', en: 'Invalid email.' })

  if (!account.name || account.name.length < 3)
    throwValidationError({ 'br': 'O nome deve possuir pelo menos 3 caracteres.', en: 'The name must be at least 3 characters long.' })

  const { password } = account

  if (!password || password.length < 6)
    throwValidationError({ br: 'A senha deve possuir pelo menos 6 caracteres.', en: 'The password must be at least 6 characters long.' })
}