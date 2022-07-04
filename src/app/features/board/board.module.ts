import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BoardComponent} from "./pages/board/board.component";
import {BoardRoutingModule} from "./board-routing.module";


@NgModule({
  declarations: [
    BoardComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule
  ]
})
export class BoardModule { }
