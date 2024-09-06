import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OvertimeModalComponent } from './overtime-modal.component';
import { ButtonModule } from '@andkit/components/buttons/button/button.module';
import { ModalModule } from '@andkit/components/modals/modal/modal.module';

@NgModule({
  declarations: [OvertimeModalComponent],
  imports: [
    CommonModule,
    ButtonModule,
    ModalModule,
  ],
  exports: [OvertimeModalComponent],
})
export class OvertimeModalModule {
}
