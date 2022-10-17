import { NgModule } from '@angular/core';

import { AutoFocusModule } from '@shared/directives';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardListComponent, BoardManageComponent } from './pages';
import { FavoriteBoardsPipe, FavoriteHeaderPipe } from './pipes';
import { SharedAngularModule } from '@shared/shared-angular.module';


@NgModule({
  declarations: [
    BoardListComponent,
    FavoriteBoardsPipe,
    FavoriteHeaderPipe,
    BoardManageComponent,
  ],
  imports: [
    SharedAngularModule,
    BoardsRoutingModule,
    AutoFocusModule,
  ],
})
export class BoardsModule {
}
