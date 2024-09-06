import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainMenuModule } from '@pages/main/main-menu/main-menu.module';
import { ErrorInterceptor } from '@interceptors/error.interceptor';
import { CookieInterceptor } from '@interceptors/cookie.interceptor';
import { ApiInterceptor } from '@interceptors/api.interceptor';
import { OfficeSelectModule } from '@pages/office-select/office-select.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { AndkitModule } from '@andkit/andkit.module';
import { ExternalFeedbackModule } from '@pages/external-feedback/external-feedback.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IconSpriteModule } from 'ng-svg-icon-sprite';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AndkitModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MainMenuModule,
    OfficeSelectModule,
    SafeHtmlModule,
    ExternalFeedbackModule,
    IconSpriteModule.forRoot({ path: 'assets/sprites/sprite.svg' }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CookieInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
