import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SharedAngularModule { }
