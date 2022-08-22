import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {
  }

  static getToken(): string {
    return localStorage.getItem('token');
  }

  private setToken(token: string): any {
    return localStorage.setItem('token', token);
  }

  public signIn(userData): Observable<{ accessToken }> {
    return this.httpClient.post<{ accessToken: string }>('/auth/sign-in', userData).pipe(tap(({accessToken}) => {
      this.setToken(accessToken);
    }))
  }
}
