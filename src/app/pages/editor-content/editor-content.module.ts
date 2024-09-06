import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorContentComponent } from './editor-content.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [EditorContentComponent],
  imports: [
    CommonModule,
    SafeHtmlModule
  ],
  exports: [EditorContentComponent]
})
export class EditorContentModule { }
