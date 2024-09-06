import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventComponent } from './event/event.component';
import { EventResolve } from '@resolvers/event.resolve';


const routes: Routes = [
  {
    path: ':id',
    component: EventComponent,
    resolve: {
      event: EventResolve,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule {
}
