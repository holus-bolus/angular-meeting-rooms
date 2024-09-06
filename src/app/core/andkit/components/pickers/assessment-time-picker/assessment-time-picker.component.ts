import {
  Component,
  ChangeDetectionStrategy,
  forwardRef,
  ViewChild,
  ElementRef,
  Renderer2,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import upArrowSvg from '!!raw-loader!./icons/up-arrow.svg';

const UP_ARROW_HOURS = 'upArrowHours';
const DOWN_ARROW_HOURS = 'downArrowHours';
const UP_ARROW_MINUTES = 'upArrowMinutes';
const DOWN_ARROW_MINUTES = 'downArrowMinutes';
const HOURS_FIELD = 'hours';
const MINUTES_FIELD = 'minutes';
const DECREASE_BOUNDARY_NUMBER = 9;
const INCREASE_BOUNDARY_NUMBER = 11;
const HOURS_REG_EXP = /^([0-1]?[0-9]|2[0-3])$/;
const MINUTES_REG_EXP = /^([0-5]?[0-9])$/;
const LAST_HOUR = 23;
const LAST_MINUTE = 59;

@Component({
  selector: 'andteam-assessment-time-picker',
  templateUrl: './assessment-time-picker.component.html',
  styleUrls: ['./assessment-time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AssessmentTimePickerComponent),
      multi: true
    }
  ]
})
export class AssessmentTimePickerComponent implements ControlValueAccessor {
  @Input() public isTitlesShow: boolean;
  @Input() public disabled: boolean;
  @Input() public error: boolean;

  @Output() public blurTime = new EventEmitter<string>();

  @ViewChild('hoursElement') hoursElement: ElementRef;
  @ViewChild('minutesElement') minutesElement: ElementRef;

  public arrow: string;
  public isHoverEvent: boolean;
  public hours = '00';
  public minutes = '00';
  public maxLength = 2;
  public upArrowHours = UP_ARROW_HOURS;
  public downArrowHours = DOWN_ARROW_HOURS;
  public upArrowMinutes = UP_ARROW_MINUTES;
  public downArrowMinutes = DOWN_ARROW_MINUTES;
  public hoursField = HOURS_FIELD;
  public minutesField = MINUTES_FIELD;

  readonly upArrowIcon: string = upArrowSvg;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private renderer: Renderer2
  ) { }

  public handleHover(isHoverEvent: boolean, arrow: string): void {
    this.arrow = arrow;
    this.isHoverEvent = isHoverEvent;
  }

  public setTime(timeUnit: string, isIncreaseTime: boolean): void {
    if (timeUnit === HOURS_FIELD) {
      this.hours = this.getValue(isIncreaseTime, this.hours, LAST_HOUR);
    } else {
      this.minutes = this.getValue(isIncreaseTime, this.minutes, LAST_MINUTE);
    }

    const time = this.getTime();

    this.onChange(time);
  }

  public onChangeValue(value: string, element: string): void {
    if (element === HOURS_FIELD) {
      this.setHours(value);
    } else {
      this.setMinutes(value);
    }

    const time = this.getTime();

    this.onChange(time);
  }

  public onBlur(element: string): void {
    if (element === HOURS_FIELD) {
      this.hours = this.getMappedValue(this.hoursElement.nativeElement.value);
    } else {
      this.minutes = this.getMappedValue(this.minutesElement.nativeElement.value);
    }

    const time = this.getTime();

    this.blurTime.emit(time);
  }

  public registerOnChange(func: any): void {
    this.onChange = func;
  }

  public registerOnTouched(func: any): void {
    this.onTouched = func;
  }

  public writeValue(value: string): void {
    if (value) {
      [this.hours, this.minutes] = value.split(':');
    }

    this.changeDetectorRef.markForCheck();
  }

  private getValue(isIncreaseTime: boolean, value: string, constraint: number): string {
    const numberValue = Number(value);

    return isIncreaseTime
      ? this.getIncreaseValue(numberValue, constraint)
      : this.getDecreaseValue(numberValue, constraint);
  }

  private getIncreaseValue(value: number, boundaryNumber: number): string {
    const isValid = value >= 0 && value < boundaryNumber;

    if (!isValid) {
      return this.getMappedValue(`${value}`);
    }

    return value < DECREASE_BOUNDARY_NUMBER
      ? `0${value + 1}`
      : `${value + 1}`;
  }

  private getDecreaseValue(value: number, boundaryNumber: number): string {
    const isValid = value > 0 && value <= boundaryNumber;

    if (!isValid) {
      return this.getMappedValue(`${value}`);
    }

    return value < INCREASE_BOUNDARY_NUMBER
      ? `0${value - 1}`
      : `${value - 1}`;
  }

  private setHours(hours: string): void {
    const isValid = hours.match(HOURS_REG_EXP);

    this.hours = isValid
      ? hours
      : '';

    return this.renderer.setProperty(this.hoursElement.nativeElement, 'value', this.hours);
  }

  private setMinutes(minutes: string): void {
    const isValid = minutes.match(MINUTES_REG_EXP);

    this.minutes = isValid
      ? minutes
      : '';

    return this.renderer.setProperty(this.minutesElement.nativeElement, 'value', this.minutes);
  }

  private getMappedValue(value: string): string {
    switch (value.length) {
      case 0:
        return `00`;
      case 1:
        return `0${value}`;
      default:
        return value;
    }
  }

  private onTouched = (value: string) => {};
  private onChange = (value: string) => {};

  private getTime(): string {
    return `${this.hours}:${this.minutes}`;
  }
}
