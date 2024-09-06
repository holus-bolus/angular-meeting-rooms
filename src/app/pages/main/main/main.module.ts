import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MainEventsFilterComponent } from '@pages/main/main-events-filter/main-events-filter.component';
import { PortalInputFileModule } from '@andkit/components/inputs/portal-input-file/portal-input-file.module';
import { AndkitModule } from '@andkit/andkit.module';
import { CustomDatePipeModule } from '@pipes/custom-date/custom-date.pipe.module';
import { TruncatePipeModule } from '@pipes/truncate/truncate.pipe.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { MainNewsComponent } from '@pages/main/main-news/main-news.component';
import { MainEventsComponent } from '@pages/main/main-events/main-events.component';
import { TagsModule } from '@pages/hot-news/tags/tags.module';
import { MainUserInfoComponent } from '@pages/main/main-user-info/main-user-info.component';
import { MainMenuModule } from '@pages/main/main-menu/main-menu.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ImgBackgroundUploaderModule } from '@andkit/components/other/img-background-uploader/img-background-uploader.module';
import { ConfirmModalComponent } from '@andkit/components/modals/confirm-modal/confirm-modal.component';
import { ScrollModule } from '@directives/scroll/scroll.module';

@NgModule({
  declarations: [
    MainComponent,
    MainNewsComponent,
    MainEventsComponent,
    MainEventsFilterComponent,
    MainUserInfoComponent,
  ],
  imports: [
    AndkitModule,
    CommonModule,
    CustomDatePipeModule,
    FormsModule,
    ImageCropperModule,
    MainMenuModule,
    MainRoutingModule,
    PortalInputFileModule,
    ReactiveFormsModule,
    RouterModule,
    SafeHtmlModule,
    TagsModule,
    MatFormFieldModule,
    MatSelectModule,
    TruncatePipeModule,
    ImgBackgroundUploaderModule,
    ScrollModule
  ],
  entryComponents: [
    ConfirmModalComponent
  ]
})
export class MainModule {
}
