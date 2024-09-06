import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomCardComponent } from './room-card.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    RoomCardComponent,
  ],
  declarations: [RoomCardComponent],
})
export class RoomCardModule { }
