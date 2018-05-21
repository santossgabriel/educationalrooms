import { Injectable } from '@angular/core'
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

import { Globals } from '../globals';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let headers = {}
    if (req.url !== '/api/token'
      && !(req.url === '/api/account' && req.method === 'POST'))
      headers['token'] = Globals.currentToken()

    const newRequest = req.clone({ setHeaders: headers })

    return next.handle(newRequest)
  }
}  