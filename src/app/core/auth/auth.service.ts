import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

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
    return this.httpClient.post<{ accessToken: string }>('/auth/sign-in', userData).pipe(tap(({accessToken}) => {
      this.setToken(accessToken);
    }))
  }

  public signOut(): void {
    AuthService.removeToken();
    this.router.navigate(['/auth/sign-in']);
  }

}
