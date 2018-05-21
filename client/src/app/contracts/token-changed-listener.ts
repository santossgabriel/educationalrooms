interface TokenChangedListener {
  tokenChanged(token: string)
}

interface TokenResponse {
  token: string
  message: string
}