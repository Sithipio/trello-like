import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MDBBootstrapModule} from "angular-bootstrap-md";

import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import {AuthRoutingModule} from "./auth-routing.module";


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MDBBootstrapModule,
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class AuthModule { }
