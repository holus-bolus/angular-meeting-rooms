import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsBlockComponent } from './news-block.component';
import {EditMenuModule} from '@andkit/components/other/edit-menu/edit-menu.module';
import {TimezoneModule} from '@pipes/timezone/timezone.module';
import {DropdownButtonModule} from '@andkit/components/buttons/dropdown-button/dropdown-button.module';
import {ConfirmationModalModule} from '@andkit/components/modals/confirmation-modal/confirmation-modal.module';
import {RouterModule} from '@angular/router';
import {CustomDatePipeModule} from '@pipes/custom-date/custom-date.pipe.module';
import {PortalBackwardLinkModule} from '@andkit/components/buttons/portal-backward-link/portal-backward-link.module';
import {TruncatePipeModule} from '@pipes/truncate/truncate.pipe.module';
import {SafeHtmlModule} from '@pipes/safe-html/safe-html.module';
import {EditorContentModule} from '@pages/editor-content/editor-content.module';

@NgModule({
  declarations: [NewsBlockComponent],
  imports: [
    CommonModule,
    TruncatePipeModule,
    DropdownButtonModule,
    EditMenuModule,
    ConfirmationModalModule,
    RouterModule,
    CustomDatePipeModule,
    PortalBackwardLinkModule,
    EditorContentModule,
    TimezoneModule,
    SafeHtmlModule
  ],
  exports: [NewsBlockComponent],
})
export class NewsBlockModule { }
