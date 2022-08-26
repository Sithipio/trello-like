import { Component } from '@angular/core';
import {AuthService} from '@core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public isCollapsed: boolean = true;

  constructor(private authService : AuthService) {}

  signOut(): void {
    this.authService.signOut();
  }
}
