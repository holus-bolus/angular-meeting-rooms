import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '@guards/auth.guard';
import {AuthenticationService} from "@services/authentication.service";
import {TokenInterceptor} from "@interceptors/token.interceptor";
import {AppComponent} from "./app.component";
import {AuthenticationMockService} from "@services/authentication-mock.service";

@NgModule({
  declarations: [AppComponent],
  providers: [
    AuthGuard,
    // AuthenticationService,
    AuthenticationMockService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})

export class AuthenticationModule {
}
