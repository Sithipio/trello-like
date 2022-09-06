import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksComponent } from './pages/task/tasks.component';


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
  ],
})
export class TasksModule {
}
