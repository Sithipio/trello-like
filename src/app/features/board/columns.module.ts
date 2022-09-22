import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ColumnsComponent } from './pages/columns/columns.component';
import { ColumnsRoutingModule } from './columns-routing.module';
import { AutoFocusModule } from '@shared/directives';
import { TasksComponent } from './pages/tasks/tasks.component';
import { AutoScrollHeightModule } from '@shared/directives/auto-scroll-height/auto-scroll-height.module';
import { TaskCoverComponent } from './pages/task-cover/task-cover.component';
import { TaskTagComponent } from './pages/task-tag/task-tag.component';


@NgModule({
  declarations: [
    ColumnsComponent,
    TasksComponent,
    TaskCoverComponent,
    TaskTagComponent
  ],
    imports: [
        CommonModule,
        ColumnsRoutingModule,
        DragDropModule,
        MDBBootstrapModule,
        ReactiveFormsModule,
        AutoFocusModule,
        AutoScrollHeightModule,
    ],
})
export class ColumnsModule {
}
