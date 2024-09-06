import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentTextareaComponent } from './comment-textarea/comment-textarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { OuterClickModule } from '@directives/outer-click/outer-click.module';
import { FormCommentComponent } from './form-comment.component';

@NgModule({
  declarations: [CommentTextareaComponent, FormCommentComponent],
  imports: [
    CommonModule,
    MatInputModule,
    OuterClickModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [FormCommentComponent, CommentTextareaComponent]
})
export class FormCommentModule { }
