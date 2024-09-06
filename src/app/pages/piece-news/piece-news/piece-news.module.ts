import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeaceNewsComponent } from './piece-news.component';
import { PieceNewsRoutingModule } from './piece-news.routing.module';
import { TimezoneModule } from '@pipes/timezone/timezone.module';
import { NewsBlockModule } from '@pages/hot-news/news-block/news-block.module';
import { AndkitModule } from '@andkit/andkit.module';

@NgModule({
  declarations: [PeaceNewsComponent],
  imports: [
    AndkitModule,
    CommonModule,
    PieceNewsRoutingModule,
    NewsBlockModule,
    TimezoneModule
  ],
  exports: [PeaceNewsComponent],
})
export class PieceNewsModule {
}
