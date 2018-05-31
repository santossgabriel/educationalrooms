import { Injectable } from '@angular/core'

@Injectable()
export class Globals {
  private static listeners: TokenChangedListener[] = []
  private static token: string = ''

  public static changeToken(newToken: string) {
    if (!newToken)
      localStorage.removeItem('token')
    else
      localStorage.setItem('token', newToken)
    this.token = newToken
    for (let i = 0; i < this.listeners.length; i++)
      this.listeners[i].tokenChanged(newToken)
  }

  public static currentToken(): string {
    if (!this.token)
      this.token = localStorage.getItem('token')
    return this.token
  }

  public static addTokenListener(listener: TokenChangedListener) {
    if (this.listeners.indexOf(listener) === -1) {
      this.listeners.push(listener)
    }
  }

  public static userLogged(): boolean { return this.currentToken() ? true : false }
}