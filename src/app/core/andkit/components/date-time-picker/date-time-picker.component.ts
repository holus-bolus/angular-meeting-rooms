import { takeUntil, filter } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectionStrategy, Input, forwardRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';

import dateSvg from '!!raw-loader!./icons/date.svg';
import * as moment from 'moment-timezone';
import { OUTPUT_FORMAT } from './configs/datetime-picker-conf';

@Component({
  selector: 'andteam-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true,
    },
  ],
})
export class DateTimePickerComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() public disabled = false;
  @Input() public placeholder = 'Choose a date';
  @Input() public maxDate = null;
  @Input() public minDate = null;
  @Input() public outputFormat = OUTPUT_FORMAT.ISOString;
  @Input() public dateIcon = dateSvg as any;
  @Input() public error: boolean;
  @Input() public errorMessage: string;

  public dateTime = new FormControl('');

  private destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.dateTime.valueChanges
      .pipe(filter(Boolean), takeUntil(this.destroy$))
      .subscribe((value: moment.Moment) => {
        this.propagateChange(this.formatOutput(value));
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public writeValue(value: string): void {
    this.dateTime.patchValue(value);
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this.cdr.markForCheck();
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private onTouched = (val: any) => { };
  private propagateChange = (val: any) => { };

  private formatOutput(value: moment.Moment): moment.Moment | string {
    return !(this.outputFormat === OUTPUT_FORMAT.Moment)
      ? moment(value).toISOString(true)
      : value;
  }
}
