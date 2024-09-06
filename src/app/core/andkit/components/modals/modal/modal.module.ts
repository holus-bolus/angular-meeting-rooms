import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { IconModule } from '@andkit/components/other/icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    SafeHtmlModule,
  ],
  exports: [
    ModalComponent,
    IconModule
  ],
  declarations: [ModalComponent]
})
export class ModalModule { }
