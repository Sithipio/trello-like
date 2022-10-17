import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent, SignInComponent } from './pages';
import { SharedAngularModule } from '@shared/shared-angular.module';


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    SharedAngularModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {
}
