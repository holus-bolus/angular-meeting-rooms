import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PieceNewsCreationComponent } from './piece-news-creation.component';
import { NewsResolve } from '@resolvers/news.resolve';

const routes: Routes = [
  {
    path: '',
    component: PieceNewsCreationComponent,
    resolve: {
      news: NewsResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PieceNewsCreationRoutingModule {}
