import { Injectable } from '@angular/core'
import { UserDataModel } from './models/user-data.models';

@Injectable()
export class Globals {
  private static listeners: UserChangedListener[] = []
  private static token: string = ''
  private static socketIo: any

  public static notifyUserChanged(user: UserDataModel) {
    this.listeners.forEach(p => p.userChanged(user))
  }

  public static currentToken(): string {
    return localStorage.getItem('TOKEN')
  }

  public static getSocket() {
    if (!this.socketIo) {
      this.socketIo = (<any>window).io()
      this.socketIo.emit('subscribe', this.currentToken())
      this.socketIo.on('error', (message) => console.log(message))
    }
    return this.socketIo
  }

  public static addUserChangedListener(listener: UserChangedListener) {
    if (this.listeners.indexOf(listener) === -1)
      this.listeners.push(listener)
  }

  public static userLogged(): boolean { return this.currentToken() ? true : false }

  public static getGoogleClientId(): string {
    return '177211292368-ro5aar6klvjkustdlga8616m8cds2iru.apps.googleusercontent.com'
  }
}