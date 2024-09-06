import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeaceNewsComponent } from './piece-news.component';
import { NewsResolve } from '@resolvers/news.resolve';

const routes: Routes = [
  {
    path: '',
    component: PeaceNewsComponent,
    resolve: {
      oneNews: NewsResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PieceNewsRoutingModule {}
