import { Component } from '@angular/core';

import { AuthService } from '@core/auth/auth.service';
import { URL_MAIN, URL_SIGN_IN } from '@shared/constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isCollapsed: boolean = true;
  public urlToLog = URL_SIGN_IN;
  public urlToBoard = URL_MAIN;
  public urlToProfile;

  constructor(private authService: AuthService) {
  }

  public onSignOut(): void {
    this.authService.signOut();
  }
}
