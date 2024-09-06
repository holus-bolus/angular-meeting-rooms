import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from './event-card.component';
import { RouterModule } from '@angular/router';
import { TimezoneModule } from '@pipes/timezone/timezone.module';
import { EventLabelModule } from './label/label.module';

@NgModule({
  declarations: [EventCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    TimezoneModule,
    EventLabelModule
  ],
  exports: [EventCardComponent]
})
export class EventCardModule { }
