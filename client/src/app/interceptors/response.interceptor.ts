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
import { Globals } from '../globals';
import { StorageService } from '../services/storage.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private route: Router, private storageService: StorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .map((event: HttpEvent<any>) => {
        return event
      })
      .catch((err: any, caught) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401
            && req.url !== '/api/token'
            && !(req.url === '/api/account' && req.method === 'POST')) {
            this.storageService.setToken(null)
            this.route.navigate(['/signin'])
          }
          return Observable.throw(err)
        }
      })
  }
}