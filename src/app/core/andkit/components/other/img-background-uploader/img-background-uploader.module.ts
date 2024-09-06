import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgBackgroundUploaderComponent } from './img-background-uploader';
import { PortalInputFileModule } from '@andkit/components/inputs/portal-input-file/portal-input-file.module';
import { ProgressSpinnerModule } from '../progress-spinner/progress-spinner.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ButtonModule } from '@andkit/components/buttons/button/button.module';
import { PortalButtonModule } from '@andkit/components/buttons/portal-button/portal-button.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [ImgBackgroundUploaderComponent],
  imports: [
    CommonModule,
    PortalInputFileModule,
    ProgressSpinnerModule,
    ImageCropperModule,
    ButtonModule,
    PortalButtonModule,
    SafeHtmlModule
  ],
  exports: [ImgBackgroundUploaderComponent]
})
export class ImgBackgroundUploaderModule { }
