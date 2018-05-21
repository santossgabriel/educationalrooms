import { Injectable } from '@angular/core'
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import { Router } from '@angular/router'

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private route: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.info('req.headers =', req.headers, ';')
    return next.handle(req)
      .map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && ~~(event.status / 100) > 3) {
          console.info('HttpResponse::event =', event, ';')
        } else console.info('event =', event, ';')
        return event
      })
      .catch((err: any, caught) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401
            && req.url !== '/api/token'
            && !(req.url === '/api/account' && req.method === 'POST')) {
            this.route.navigate(['/signin'])
            console.info('err.error =', err.error, ';')
          }
          return Observable.throw(err)
        }
      })
  }
}