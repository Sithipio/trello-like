import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { TasksComponent } from './pages/task/tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { AutoFocusModule } from '@shared/directives';


@NgModule({
  declarations: [
    TasksComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    DragDropModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    AutoFocusModule
  ],
})
export class TasksModule {
}
