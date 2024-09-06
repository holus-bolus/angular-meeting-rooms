import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancelModalComponent } from './cancel-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AndkitModule } from '@andkit/andkit.module';

@NgModule({
  declarations: [CancelModalComponent],
  imports: [
    AndkitModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CancelModalComponent]
})
export class CancelModalModule {
}
