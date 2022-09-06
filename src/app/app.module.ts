import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '@core/components/header/header.component';
import { MainContainerComponent } from '@core/components/main-container/main-container.component';
import { AuthContainerComponent } from '@core/components/auth-container/auth-container.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpTokenInterceptor } from '@core/auth/token.interceptor';
import { AuthGuard } from '@core/guards/auth.guard';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainContainerComponent,
    AuthContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpTokenInterceptor,
    multi: true,
  },
    AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {
}
