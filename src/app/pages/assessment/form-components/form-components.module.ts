import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AndkitModule } from '@andkit/andkit.module';

@NgModule({
  declarations: [CommentComponent],
  imports: [
    AndkitModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [CommentComponent]
})
export class FormComponentsModule {
}
