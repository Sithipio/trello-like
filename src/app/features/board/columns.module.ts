import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ColumnsComponent } from './pages/columns/columns.component';
import { ColumnsRoutingModule } from './columns-routing.module';
import { AutoFocusModule } from '@shared/directives';
import { TasksComponent } from './pages/tasks/tasks.component';


@NgModule({
  declarations: [
    ColumnsComponent,
    TasksComponent
  ],
  imports: [
    CommonModule,
    ColumnsRoutingModule,
    DragDropModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    AutoFocusModule,
  ],
})
export class ColumnsModule {
}
