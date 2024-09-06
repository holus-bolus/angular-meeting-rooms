import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetNowCardComponent } from '@pages/meet-now-card/meet-now-card.component';
import { SafeHtmlModule } from '../../pipes/safe-html/safe-html.module';
import { AndkitModule } from '../../core/andkit/andkit.module';
import { MeetingRoomsRoutingModule } from './meeting-rooms-routing.module';
import { MeetingRoomsComponent } from './meeting-rooms.component';
import { MeetNowComponent } from './meet-now/meet-now.component';
import { RoomsComponent } from './rooms/rooms.component';
import { MySpaceComponent } from './my-space/my-space.component';
import { MapComponent } from './map/map.component';



@NgModule({
  declarations: [
    MeetingRoomsComponent,
    MeetNowComponent,
    RoomsComponent,
    MySpaceComponent,
    MapComponent,
    MeetNowCardComponent,
  ],
  imports: [
    CommonModule,
    MeetingRoomsRoutingModule,
    SafeHtmlModule,
    AndkitModule,
  ],
})
export class MeetingRoomsModule { }
