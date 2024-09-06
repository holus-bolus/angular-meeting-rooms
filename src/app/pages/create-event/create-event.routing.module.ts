import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventResolve } from '@resolvers/event.resolve';

const routes: Routes = [
  {
    path: '',
    component: CreateEventComponent,
    resolve: {
      events: EventResolve,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEventRoutingModule {}
