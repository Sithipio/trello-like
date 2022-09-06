import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ColumnsComponent} from "./pages/columns/columns.component";
import {ColumnsRoutingModule} from "./columns-routing.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MDBBootstrapModule} from "angular-bootstrap-md";
import {ReactiveFormsModule} from "@angular/forms";
import { AutoFocusDirective } from '@shared/directives/auto-focus.directive';



@NgModule({
  declarations: [
    ColumnsComponent,
    AutoFocusDirective,
  ],
  imports: [
    CommonModule,
    ColumnsRoutingModule,
    DragDropModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
  ]
})
export class ColumnsModule { }
