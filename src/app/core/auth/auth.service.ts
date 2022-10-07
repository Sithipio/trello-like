import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { IUser } from '@shared/models/user.model';
import { URL_SIGN_IN, URL_SIGN_UP } from '@shared/constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  static getToken(): string {
    return localStorage.getItem('token');
  }

  private setToken(token: string): any {
    return localStorage.setItem('token', token);
  }

  static removeToken(): any {
    return localStorage.removeItem('token');
  }

  public signIn(userData): Observable<{ accessToken }> {
    return this.httpClient.post<{ accessToken: string }>(URL_SIGN_IN, userData).pipe(tap(({accessToken}) => {
      this.setToken(accessToken);
    }))
  }

  public signUp(userData: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(URL_SIGN_UP, userData);
  }

  public signOut(): void {
    AuthService.removeToken();
    this.router.navigate([URL_SIGN_IN]);
  }

}
