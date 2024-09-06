import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalDraggableImageComponent } from './portal-draggable-image.component';
import { PortalInputFileModule } from '@andkit/components/inputs/portal-input-file/portal-input-file.module';
import { DraggableModule } from '@directives/draggable/draggable.module';
import { HoverEventModule } from '@directives/hover-event/hover-event.module';

@NgModule({
  declarations: [PortalDraggableImageComponent],
  imports: [
    CommonModule,
    PortalInputFileModule,
    DraggableModule,
    HoverEventModule,
  ],
  exports: [PortalDraggableImageComponent]
})
export class PortalDraggableImageModule { }
