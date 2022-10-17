import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AutoFocusModule } from '@shared/directives';
import { AutoScrollHeightModule } from './directives/auto-scroll-height/auto-scroll-height.module';
import { BoardRoutingModule } from './board-routing.module';
import { ColumnsComponent, TaskCoverComponent, TasksComponent, TaskTagComponent } from './pages';
import { TagSortPipe } from './pipes';
import { SharedAngularModule } from '@shared/shared-angular.module';


@NgModule({
  declarations: [
    ColumnsComponent,
    TasksComponent,
    TaskCoverComponent,
    TaskTagComponent,
    TagSortPipe,
  ],
  imports: [
    SharedAngularModule,
    BoardRoutingModule,
    DragDropModule,
    AutoFocusModule,
    AutoScrollHeightModule,
  ],
})
export class BoardModule {
}
