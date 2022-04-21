import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpRequest, HttpHandler, HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';

enum Settings {
  key = 'AIzaSyAWpNsq0IfVimHbVnIeNAEpT883uTazfvk',
}

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable < HttpEvent < any > > {
    const newReq = req.clone({
      params: (req.params ? req.params : new HttpParams())
        .set('key', Settings.key),
    });

    return next.handle(newReq);
  }
}
