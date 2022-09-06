import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainContainerComponent } from '@core/components/main-container/main-container.component';
import { AuthContainerComponent } from '@core/components/auth-container/auth-container.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { AppRoutes, AppRoutesParam } from '@shared/enums/app-routes';


const routes: Routes = [
  {
    path: '',
    component: MainContainerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./features/boards/boards.module').then(m => m.BoardsModule),
      },
      {
        path: `${AppRoutesParam.BOARD_ID}`,
        loadChildren: () => import('./features/columns/columns.module').then(m => m.ColumnsModule),
      },
      {
        path: `${AppRoutes.TASK}`,
        loadChildren: () => import('./features/tasks/tasks.module').then(m => m.TasksModule),
      },
      /*     {
             path: AppRoutes.PROFILE,
             loadChildren: () =>import('./features/profile/profile.module').then(m => m.BoardsModule)
           },*/
    ],
  },
  {
    path: AppRoutes.AUTH,
    component: AuthContainerComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
      },
    ],
  },

  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
