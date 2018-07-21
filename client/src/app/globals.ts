import { Injectable } from '@angular/core'
import { UserDataModel } from './models/user-data.models'
import { StorageService } from './services/storage.service';

@Injectable()
export class Globals {
  private static userListeners: UserChangedListener[] = []
  private static socketListeners: SocketConnectListener[] = []
  private static token: string = ''
  private static socketIo: any

  public static notifyUserChanged(user: UserDataModel) {
    if (user) {
      this.connectSocket()
    } else if (this.socketIo) {
      this.socketIo.close()
      this.socketIo = null
    }
    this.userListeners.forEach(p => p.userChanged(user))
  }

  public static currentToken(): string {
    return localStorage.getItem('TOKEN')
  }

  public static addUserChangedListener(listener: UserChangedListener) {
    if (this.userListeners.indexOf(listener) === -1)
      this.userListeners.push(listener)
  }

  public static addSocketListener(listener: SocketConnectListener) {
    if (this.socketListeners.indexOf(listener) === -1)
      this.socketListeners.push(listener)
    this.connectSocket()
  }

  private static connectSocket() {
    if (!this.socketIo && Globals.userLogged()) {
      this.socketIo = (<any>window).io('', { query: `token=${this.currentToken()}` })
      this.socketIo.on('connect', () => {
        this.socketIo.emit('subscribe', this.currentToken())
        this.socketIo.on('onError', (message) => console.error('Erro Socket', message))
        this.socketListeners.forEach(p => p.onConnect(this.socketIo))
        console.log("me conectei!")
      })
      this.socketIo.on('disconnect', () => {
        this.socketListeners.forEach(p => p.onDisconnect())
        console.log("fui disconectado!")
      })
    }
  }

  public static userLogged(): boolean { return this.currentToken() ? true : false }

  public static getGoogleClientId(): string {
    return '177211292368-ro5aar6klvjkustdlga8616m8cds2iru.apps.googleusercontent.com'
  }

  public static getSocket(): any { return this.socketIo }
}