import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagesComponent } from '@pages/assessment/form-blocks/languages/languages.component';
import { PortalSelectModule } from '@andkit/components/selects/portal-select/portal-select.module';
import { FormFieldModule } from '@andkit/components/other/form-field/form-field.module';
import { FormCommentModule } from '@andkit/components/other/form-comment/form-comment.module';
import { ButtonModule } from '@andkit/components/buttons/button/button.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { FormComponentsModule } from '@pages/assessment/form-components/form-components.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LanguagesComponent],
  imports: [
    CommonModule,
    PortalSelectModule,
    FormFieldModule,
    FormCommentModule,
    ButtonModule,
    ReactiveFormsModule,
    SafeHtmlModule,
    FormComponentsModule,
    HttpClientModule,
  ],
  exports: [LanguagesComponent]
})
export class LanguagesModule { }
