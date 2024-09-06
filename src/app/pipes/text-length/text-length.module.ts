import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextLengthPipe} from '@pipes/text-length/text-length.pipe';

@NgModule({
  declarations: [TextLengthPipe],
  imports: [
    CommonModule
  ],
  exports: [TextLengthPipe]
})
export class TextLengthModule { }
