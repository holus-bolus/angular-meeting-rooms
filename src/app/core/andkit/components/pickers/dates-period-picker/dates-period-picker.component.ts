import {
  Component,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import dateSmallSvg from '!!raw-loader!@assets/images/dateSmall.svg';

@Component({
  selector: 'andteam-dates-period-picker',
  templateUrl: './dates-period-picker.component.html',
  styleUrls: ['./dates-period-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatesPeriodPickerComponent),
      multi: true,
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-GB',
    },
  ],
})
export class DatesPeriodPickerComponent {
  @Input() placeholder: string;
  @Input() error: boolean;
  @Input() dateIcon = dateSmallSvg as any;
  @Input() disabled: boolean;
  @Input() errorMessage: string;

  @Output() blurDate = new EventEmitter<{startDate: string, endDate: string}>();

  public isInputDisabled = true;
  public startValue: string;
  public endValue: string;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  public reset(): void {
    this.startValue = null;
    this.endValue = null;
    this.changeDetectorRef.markForCheck();
  }

  public onClose(): void {
    if (!this.startValue || !this.endValue) {
      this.reset();
    }
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this.changeDetectorRef.markForCheck();
  }

  public checkAndEmit(): void {
    if (this.startValue && this.endValue) {
      this.blurDate.emit({
        startDate: this.startValue,
        endDate: this.endValue,
      });
    }
  }
}
