import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockCreationComponent } from './block-creation.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PortalTitleInputModule } from '@andkit/components/inputs/portal-title-input/portal-title-input.module';
import { FooterModule } from '@andkit/components/other/footer/footer.module';
import { PortalButtonModule } from '@andkit/components/buttons/portal-button/portal-button.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BlockCreationComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    PortalTitleInputModule,
    FooterModule,
    ReactiveFormsModule,
    PortalButtonModule,
    FormsModule
  ],
  exports: [BlockCreationComponent]
})
export class BlockCreationModule { }
