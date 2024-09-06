import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingRoomsComponent } from './meeting-rooms.component';
import { MeetNowComponent } from './meet-now/meet-now.component';
import { RoomsComponent } from './rooms/rooms.component';
import { MySpaceComponent } from './my-space/my-space.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {
    path: '',
    component: MeetingRoomsComponent,
    children: [
      {
        path: 'rooms',
        component: RoomsComponent,
      },
      {
        path: 'meet-now',
        component: MeetNowComponent,
      },
      {
        path: 'my-space',
        component: MySpaceComponent,
      },
      {
        path: 'map',
        component: MapComponent,
      },
      {
        path: '',
        redirectTo: 'rooms',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetingRoomsRoutingModule {
}
