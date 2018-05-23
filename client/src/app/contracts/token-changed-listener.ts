interface TokenChangedListener {
  tokenChanged(token: string)
}

interface AccountResponse {
  token: string
  message: string
}