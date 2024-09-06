import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalProblemModalComponent } from './portal-problem-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PortalDraggableImageModule } from '@andkit/components/other/portal-draggable-image/portal-draggable-image.module';
import { ButtonModule } from '@andkit/components/buttons/button/button.module';
import { PortalTextareaModule } from '@andkit/components/inputs/portal-textarea/portal-textarea.module';
import { ChipsAutocompleteModule } from '@andkit/components/selects/chips-autocomplete/chips-autocomplete.module';
import { ModalModule } from '@andkit/components/modals/modal/modal.module';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [PortalProblemModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    ButtonModule,
    ChipsAutocompleteModule,
    PortalTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    PortalDraggableImageModule,
    MatMenuModule,
  ],
  exports: [PortalProblemModalComponent],
})
export class PortalProblemModalModule {
}
