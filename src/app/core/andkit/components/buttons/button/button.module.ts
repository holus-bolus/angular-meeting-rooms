import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AndkitButtonComponent } from '@andkit/components/buttons/button/button.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  imports: [
    CommonModule,
    SafeHtmlModule,
  ],
  exports: [
    AndkitButtonComponent
  ],
  declarations: [AndkitButtonComponent]
})
export class ButtonModule { }
