import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoardListComponent } from './pages/board-list/board-list.component';


const routes: Routes = [
  { path: '', component: BoardListComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardsRoutingModule {
}
