import { throwValidationError } from './error'

export const validateAccount = (account) => {
  if (!account || !account.email || !/.{3,}@.{3,}/.test(account.email))
    throwValidationError('Email inválido.')

  if (!account.name || account.name.length < 3)
    throwValidationError('O nome deve possuir pelo menos 3 caracteres.')

  const { password } = account

  if (!password || password.length < 6)
    throwValidationError('A senha deve possuir pelo menos 6 caracteres.')
}