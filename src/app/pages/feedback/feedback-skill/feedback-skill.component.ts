import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, forwardRef, Output, EventEmitter,
  OnInit, OnDestroy } from '@angular/core';
import { IFeedbackSkill } from '@interfaces/feedback.interface';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import infoSvg from '!!raw-loader!@andkit/components/inputs/interviewers-feedback/icons/info.svg';
import infoActiveSvg from '!!raw-loader!@andkit/components/inputs/interviewers-feedback/icons/info-active.svg';


@Component({
  selector: 'andteam-feedback-skill',
  templateUrl: './feedback-skill.component.html',
  styleUrls: ['./feedback-skill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FeedbackSkillComponent),
      multi: true,
    },
  ],
})
export class FeedbackSkillComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() feedbackSkill: IFeedbackSkill;
  @Input() isMobile = false;

  @Output() showSkill = new EventEmitter();
  @Output() switchRequirement = new EventEmitter();

  public value: number;
  public readonly infoIcon = infoSvg;
  public readonly infoActiveIcon = infoActiveSvg;
  public switchRequirementControl = new FormControl(false);

  private destroy$ = new Subject();

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.switchRequirementControl.valueChanges
      .pipe(
        tap(() => {
          this.switchRequirement.next(this.switchRequirementControl.value);
          this.value = null;
        }),
        takeUntil(this.destroy$),
      ).subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public registerOnChange(func: any): void {
    this.onChange = func;
  }

  public registerOnTouched(func: any): void {
    this.onTouched = func;
  }

  public showSkillDescription(): void {
    this.showSkill.emit();
  }

  public writeValue(value: number): void {
    if (!this.switchRequirementControl.value) {
      this.value = value;
    }
    this.onChange(value);
    this.onTouched(value);
  }

  private onTouched = (value: number) => {};
  private onChange = (value: number) => {};
}
