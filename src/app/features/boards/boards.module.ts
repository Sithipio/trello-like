import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BoardsRoutingModule } from './boards-routing.module';
import { BoardListComponent } from './pages/board-list/board-list.component';
import { BoardManageComponent } from './pages/board-manage/board-manage.component';
import { FavoriteBoardsPipe, FavoriteHeaderPipe } from './pipes';
import { AutoFocusModule } from '@shared/directives';


@NgModule({
  declarations: [
    BoardListComponent,
    FavoriteBoardsPipe,
    FavoriteHeaderPipe,
    BoardManageComponent,
  ],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    FormsModule,
    AutoFocusModule,
  ],
})
export class BoardsModule {
}
