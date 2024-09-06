import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreEventCardComponent } from './more-event-card.component';
import { RouterModule } from '@angular/router';
import { TimezoneModule } from 'src/app/pipes/timezone/timezone.module';
import { SafeHtmlModule } from 'src/app/pipes/safe-html/safe-html.module';
import { EventLabelModule } from '@andkit/components/other/event-card/label/label.module';

@NgModule({
  declarations: [MoreEventCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    TimezoneModule,
    EventLabelModule,
    SafeHtmlModule
  ],
  exports: [MoreEventCardComponent],
})
export class MoreEventCardModule { }
