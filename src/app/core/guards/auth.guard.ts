import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

import { AuthService } from '@core/auth/auth.service';
import { URL_BOARD, URL_SIGN_IN } from '@shared/constant';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {
  }

  public canActivate(): boolean {
    const idToken = AuthService.getToken();
    if (idToken) {
      return true;
    } else
      this.router.navigate([URL_SIGN_IN]);
  }

  public canActivateChild(): boolean {
    const idToken = AuthService.getToken();
    if (idToken) {
      this.router.navigate([URL_BOARD]);
    } else
      return true;
  }

}
