import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ColumnsComponent } from './pages/columns/columns.component';
import { ColumnsRoutingModule } from './columns-routing.module';
import { AutoFocusModule } from '@shared/directives';


@NgModule({
  declarations: [
    ColumnsComponent,
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
