import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OuterClickModule } from '@directives/outer-click/outer-click.module';
import { SelectModule } from '@andkit/components/selects/select/select.module';

@NgModule({
  declarations: [PaginationComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    OuterClickModule,
    SelectModule,
  ],
  exports: [PaginationComponent],
})
export class PaginationModule { }
