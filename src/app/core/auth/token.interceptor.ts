import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment as env} from "@env";
import {AuthService} from './auth.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = AuthService.getToken();
    let cloned = null;

    if (!req.url.includes(env.API_URL)) {
      cloned = req.clone({url: env.API_URL + req.url});
    } else {
      cloned = req.clone();
    }

    if (!cloned.url.includes(env.API_PUBLIC_URL)) {
      if (idToken) {
        cloned = cloned.clone({
          headers: cloned.headers.set('Authorization', 'Bearer ' + idToken)
        });
        return next.handle(cloned);
      }
    }

    return next.handle(cloned);
  }
}

