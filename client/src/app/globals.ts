import { Injectable } from '@angular/core'

@Injectable()
export class Globals {
  private static listeners: TokenChangedListener[] = []
  private static token: string = ''
  private static socketIo: any

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

  public static getSocket() {
    if (!this.socketIo) {
      this.socketIo = (<any>window).io()
      this.socketIo.emit('subscribe', this.currentToken())
      this.socketIo.on('error', (message) => console.log(message))
    }
    return this.socketIo
  }

  public static addTokenListener(listener: TokenChangedListener) {
    if (this.listeners.indexOf(listener) === -1)
      this.listeners.push(listener)
  }

  public static userLogged(): boolean { return this.currentToken() ? true : false }

  public static getGoogleClientId(): string {
    return '177211292368-ro5aar6klvjkustdlga8616m8cds2iru.apps.googleusercontent.com'
  }
}