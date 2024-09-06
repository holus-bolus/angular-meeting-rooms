import {
  Component,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
  ViewChild,
  Output, EventEmitter, ChangeDetectorRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { COORDINATOR_COMMENT_PLACEHOLDER } from '@constants/reviews';
import { CommentTextareaComponent } from './comment-textarea/comment-textarea.component';

@Component({
  selector: 'andteam-form-comment',
  templateUrl: './form-comment.component.html',
  styleUrls: ['./form-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormCommentComponent),
    multi: true
  }]
})
export class FormCommentComponent implements ControlValueAccessor {
  public commentPlaceholder = COORDINATOR_COMMENT_PLACEHOLDER;

  @ViewChild(CommentTextareaComponent) textarea: CommentTextareaComponent;

  @Input() placeholder = 'Add a comment';
  @Input() error: boolean;
  @Input() errorMessage: string;
  @Input() charactersLimit: number;
  @Input() value: string;

  @Output() commentChanges = new EventEmitter<string>();

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  public onCommentChanges(comment: string): void {
    comment = comment.replace(/\s+/g, ' ').trim();
    this.writeValue(comment);
    this.onChange(comment);
    this.error = this.charactersLimit < comment.length;
  }

  public onCommentBlur(comment: string): void {
    comment = comment.replace(/\s+/g, ' ').trim();
    this.writeValue(comment);
    this.onChange(comment);
    this.commentChanges.emit(comment);
  }

  public registerOnChange(func: any): void {
    this.onChange = func;
  }

  public registerOnTouched(func: any): void {
    this.onTouched = func;
  }

  public writeValue(value: string): void {
    this.value = value;

    window.requestAnimationFrame(() => this.textarea.resizeToFitContent());
    this.changeDetectorRef.markForCheck();
  }

  private onTouched = (value: string) => {};
  private onChange = (value: string) => {};
}
