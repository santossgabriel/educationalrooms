import { throwValidationError } from './error'

export const validateAccount = (account) => {
  if (!account || !account.email)
    throwValidationError('Email inválido.')

  const { password } = account

  if (!password || password.length < 6)
    throwValidationError('A senha deve possuir pelo menos 6 caracteres.')
}