import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkPipe } from './link.pipe';

@NgModule({
  declarations: [LinkPipe],
  imports: [
    CommonModule
  ],
  exports: [LinkPipe]
})
export class LinkModule { }
