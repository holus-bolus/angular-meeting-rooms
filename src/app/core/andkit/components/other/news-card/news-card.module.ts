import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsCardComponent } from './news-card.component';
import { RouterModule } from '@angular/router';
import { EditMenuModule } from '@andkit/components/other/edit-menu/edit-menu.module';
import { ConfirmationModalModule } from '@andkit/components/modals/confirmation-modal/confirmation-modal.module';
import { CustomDatePipeModule } from '@pipes/custom-date/custom-date.pipe.module';
import { TruncatePipeModule } from '@pipes/truncate/truncate.pipe.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { TextLengthModule } from '@pipes/text-length/text-length.module';

@NgModule({
  declarations: [NewsCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    TruncatePipeModule,
    CustomDatePipeModule,
    EditMenuModule,
    ConfirmationModalModule,
    SafeHtmlModule,
    TextLengthModule
  ],
  exports: [NewsCardComponent]
})
export class NewsCardModule { }
