import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment as env } from '@env';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MDBModalService } from 'angular-bootstrap-md';
import { URL_MAIN, URL_SIGN_IN } from '@shared/constant';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private router: Router,
              private modalService: MDBModalService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = AuthService.getToken();
    let cloned = null;

    if (!req.url.includes(env.API_URL)) {
      cloned = req.clone({ url: env.API_URL + req.url });
    } else {
      cloned = req.clone();
    }

    if (!cloned.url.includes(env.API_PUBLIC_URL)) {
      if (idToken) {
        cloned = cloned.clone({
          headers: cloned.headers.set('Authorization', 'Bearer ' + idToken),
        });
      }
    }

    return next.handle(cloned).pipe(
      tap({
          error: (err) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status == 401) {
                AuthService.removeToken();
                this.modalService.hide(1);
                this.router.navigateByUrl(URL_SIGN_IN);
              }
              if (err.status == 404) {
                if (AuthService.getToken()) {
                  this.modalService.hide(1);
                  this.router.navigateByUrl(URL_MAIN);
                } else {
                  this.router.navigateByUrl(URL_SIGN_IN);
                }
              }
            }
          },
        },
      ),
    );
  }
}

