import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotNewsComponent } from './hot-news.component';
import { HotNewsRoutingModule } from './hot-news.routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagsModule } from '@pages/hot-news/tags/tags.module';
import { NewsBlockModule } from '@pages/hot-news/news-block/news-block.module';
import { AndkitModule } from '@andkit/andkit.module';

@NgModule({
  declarations: [HotNewsComponent],
  imports: [
    AndkitModule,
    CommonModule,
    FormsModule,
    HotNewsRoutingModule,
    NewsBlockModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    TagsModule,
  ]
})
export class HotNewsModule {
}
