import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignUpComponent, SignInComponent } from './pages';
import { AppRoutes } from '@shared/enums/app-routes';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', pathMatch: 'full', redirectTo: AppRoutes.SIGN_IN},
      {path: AppRoutes.SIGN_IN, component: SignInComponent, pathMatch: 'full'},
      {path: AppRoutes.SIGN_UP, component: SignUpComponent, pathMatch: 'full'},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
