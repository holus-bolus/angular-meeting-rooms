import {
  Component,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
  Output,
  EventEmitter,
  ViewChild, OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FeedbackTextareaComponent } from './feedback-textarea/feedback-textarea.component';
import { FEEDBACK_TOOLTIP, TIPS_FOR_INTERVIEWER } from './interviewer-feedback';

import infoSvg from '!!raw-loader!./icons/info.svg';
import infoActiveSvg from '!!raw-loader!./icons/info-active.svg';

@Component({
  selector: 'andteam-interview-feedback',
  templateUrl: './interviewers-feedback.component.html',
  styleUrls: ['./interviewers-feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InterviewersFeedbackComponent),
      multi: true
    }
  ]
})
export class InterviewersFeedbackComponent implements OnInit, ControlValueAccessor {
  @Input() errorMaxLength: boolean;
  @Input() errorMessage: string;
  @Input() errorRequire: boolean;
  @Input() isEditable: boolean;
  @Input() maxRows: number;
  @Input() charactersLimit: number;

  @Output() saveFeedback = new EventEmitter<string>();

  @ViewChild(FeedbackTextareaComponent) textarea: FeedbackTextareaComponent;

  value: string;
  feedbackTooltip = FEEDBACK_TOOLTIP;
  tipsForInterviewer = TIPS_FOR_INTERVIEWER;
  isEditing: boolean;
  isHover: boolean;

  readonly infoIcon = infoSvg;
  readonly infoActiveIcon = infoActiveSvg;

  private isTouched: boolean;

  public ngOnInit(): void {
    this.charactersLimit = this.isEditable ? this.charactersLimit : null;
  }

  public onSave(): void {
    this.setTouchedShowControls(false);
    this.saveFeedback.emit(this.value);
  }

  public onIconHover(isHover: boolean): void {
    this.isHover = isHover;
  }

  public onClear(): void {
    this.setTouchedShowControls(false);
    this.writeValue('');
    this.onChange(this.value);
    this.textarea.resizeToFitContent();
    this.textarea.focus();
    this.saveFeedback.emit(this.value);
  }

  public onFeedbackChanges(newValue: string): void {
    this.writeValue(newValue);
    this.onChange(newValue);
    this.setTouchedShowControls(!!newValue);
  }

  public registerOnChange(func: any): void {
    this.onChange = func;
  }

  public registerOnTouched(func: any): void {
    this.onTouched = func;
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  private setTouchedShowControls(isTouched: boolean): void {
    this.isTouched = isTouched;
    this.isEditing = this.isEditable && this.isTouched;
  }

  private onTouched = (value: string) => {};
  private onChange = (value: string) => {};
}
