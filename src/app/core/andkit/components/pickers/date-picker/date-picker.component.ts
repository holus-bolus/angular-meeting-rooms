import {
  Component,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Moment } from 'moment-timezone/moment-timezone';
import { TimeService } from '@services/portal/time.service';

import dateSvg from '!!raw-loader!./icons/date.svg';

@Component({
  selector: 'andteam-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  @Input() error: boolean;
  @Input() dateIcon = dateSvg as any;
  @Input() isAssessment: boolean;
  @Input() disabled: boolean;
  @Input() minDate: boolean;
  @Input() value: string;
  @Input() errorMessage: string;
  @Input() maxDate = true;
  @Input() minPreviousDate: Date;

  @Output() blurDate = new EventEmitter<Moment>();

  public currentDate = new Date();
  public isInputDisabled = true;

  constructor(
    private sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef,
    private timeService: TimeService,
    private adapter: DateAdapter<any>
  ) {}

  public ngOnInit(): void {
    this.adapter.setLocale('en-GB');
    this.adapter.getFirstDayOfWeek = () => 1;
  }

  public onDateChange({ value }: MatDatepickerInputEvent<Date>): void {
    const momentDate = this.timeService.getTimezoneDate(value);
    this.onChange(momentDate);
    this.blurDate.emit(momentDate);
  }

  public writeValue(value: string | Moment): void {
    this.value = this.timeService.getTimezoneDate(value).format();
    this.changeDetectorRef.markForCheck();
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this.changeDetectorRef.markForCheck();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private onTouched = (val: Moment) => {};
  private onChange = (val: Moment) => {};
}
