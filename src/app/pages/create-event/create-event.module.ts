import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventComponent } from './create-event/create-event.component';
import { CreateEventRoutingModule } from './create-event.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CreateEventFiltersComponent } from '@pages/create-event/create-event-filters/create-event-filters.component';
import { BlockCreationModule } from '@pages/block-creation/block-creation.module';
import { AndkitModule } from '@andkit/andkit.module';

@NgModule({
  declarations: [CreateEventComponent, CreateEventFiltersComponent],
  imports: [
    CommonModule,
    CreateEventRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AndkitModule,
    BlockCreationModule,
    ImageCropperModule,
  ],
})
export class CreateEventModule {
}
