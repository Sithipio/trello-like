import {Injectable} from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
} from '@angular/router';

import {AuthService} from '@core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {
  }

  canActivate(): boolean {
    const idToken = AuthService.getToken();
    if (idToken) {
      return true;
    } else
      this.router.navigate(['/auth/sign-in']);
  }

  canActivateChild(): boolean {
    const idToken = AuthService.getToken();
    if (idToken) {
      this.router.navigate([]);
    } else
      return true;
  }

}
