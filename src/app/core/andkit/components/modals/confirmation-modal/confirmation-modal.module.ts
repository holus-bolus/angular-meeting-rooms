import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { ButtonModule } from '@andkit/components/buttons/button/button.module';
import { ModalModule } from '@andkit/components/modals/modal/modal.module';

@NgModule({
  declarations: [ConfirmationModalComponent],
  imports: [
    CommonModule,
    ButtonModule,
    ModalModule,
  ],
  exports: [ConfirmationModalComponent]
})
export class ConfirmationModalModule {
}
