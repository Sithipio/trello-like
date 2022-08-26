import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainContainerComponent} from "@core/components/main-container/main-container.component";
import {AuthContainerComponent} from "@core/components/auth-container/auth-container.component";
import {AuthGuard} from "@core/guards/auth.guard";


const routes: Routes = [
  {
    path: '',
    component: MainContainerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./features/boards/boards.module').then(m => m.BoardsModule)
      },
      {
        path: "board/:boardId",
        loadChildren: () => import('./features/board/board.module').then(m => m.BoardModule)
      },
      /*     {
             path: AppRoutes.PROFILE,
             loadChildren: () =>import('./features/profile/profile.module').then(m => m.BoardsModule)
           },*/
    ],
  },
  {
    path: 'auth',
    component: AuthContainerComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
      },
    ],
  },

  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
