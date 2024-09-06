import { Component, ChangeDetectionStrategy, forwardRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { catchError, filter, switchMap, takeUntil } from 'rxjs/operators';
import { MAX_LENGTH_COMMENT } from '@pages/assessment/coordinator-cabinet/coordinator-cabinet';
import { CommentService } from '@services/assessments/comment.service';
import { COORDINATOR_COMMENT_PLACEHOLDER } from '@constants/reviews';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'andteam-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CommentComponent),
    multi: true
  }]
})
export class CommentComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() reviewId: string;
  @Input() commentType: 'coordinator' | 'salary';
  @Input() maxCommentLength = MAX_LENGTH_COMMENT;
  @Input() commentPlaceholder = COORDINATOR_COMMENT_PLACEHOLDER;

  value: string;
  control: FormControl;
  maxLengthErrorMessage: string;

  private comment$ = new Subject<string>();
  private destroy$ = new Subject();

  constructor(private commentService: CommentService) {
  }

  public ngOnInit(): void {
    this.control = new FormControl('', Validators.maxLength(this.maxCommentLength));
    this.maxLengthErrorMessage = `0 Text exceeds ${this.maxCommentLength} character limit`;
    this.saveComment().subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onCommentChanges(comment: string): void {
    this.writeValue(comment);
    this.onChange(comment);
    this.comment$.next(comment);
  }

  public registerOnChange(func: any): void {
    this.onChange = func;
  }

  public registerOnTouched(func: any): void {
    this.onTouched = func;
  }

  public writeValue(value: string): void {
    this.value = value;
    this.control.setValue(value);
  }

  private saveComment(): Observable<void> {
    return this.comment$.asObservable()
      .pipe(
        filter(() => this.control.valid),
        switchMap((comment) => {
          return this.commentService.setComment(this.reviewId, comment, this.commentType);
        }),
        catchError(() => this.saveComment()),
        takeUntil(this.destroy$)
      );
  }

  private onTouched = (value: string) => {};
  private onChange = (value: string) => {};
}
