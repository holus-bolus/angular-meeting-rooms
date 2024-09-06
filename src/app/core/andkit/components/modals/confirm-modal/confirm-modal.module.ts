import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from '@andkit/components/modals/confirm-modal/confirm-modal.component';
import { ButtonModule } from '@andkit/components/buttons/button/button.module';

@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [
    CommonModule,
    ButtonModule,
  ],
  exports: [ConfirmModalComponent]
})
export class ConfirmModalModule { }
