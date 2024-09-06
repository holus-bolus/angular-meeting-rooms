import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  forwardRef,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import timeSvg from '!!raw-loader!./icons/time.svg';

const BACKGROUND = '#feda00'; // ?
const COLOR = '#212121';

@Component({
  selector: 'andteam-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true,
    },
  ],
})
export class TimePickerComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() public placeholder: string;
  @Input() public error: boolean;
  @Input() public errorMessage: string;
  @Input() public value = '';

  @ViewChild('timePicker') timePicker: ElementRef;
  @ViewChild('timeInput') timeInput: ElementRef;

  public timeIcon: SafeHtml;
  public destroy$ = new Subject();
  public isDisabled = true;
  public timePickerElement: HTMLElement;

  constructor(
    private sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef,
    private amazingTimePickerService: AmazingTimePickerService
  ) { }

  public ngOnInit(): void {
    this.timeIcon = this.sanitizer.bypassSecurityTrustHtml(timeSvg as any);

    fromEvent(window, 'resize')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (() => {
          const timePickerWrapper = document.getElementById('time-picker-wrapper');

          if (timePickerWrapper) {
            this.setPositions();
          }
        }),
      );
  }

  public openPicker(): void {
    const amazingTimePicker = this.amazingTimePickerService.open({
      arrowStyle: {
        background: BACKGROUND,
        color: COLOR
      }
    });

    this.setPositions();

    amazingTimePicker.afterClose()
      .subscribe(
        (time) => {
          this.value = time;
          this.onChange(time);
          this.changeDetectorRef.markForCheck();
        }
      );
  }

  public writeValue(value: string): void {
    if (value) {
      this.value = value;
    }

    this.changeDetectorRef.markForCheck();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.timePickerElement) {
      this.resetPickerPosition();
    }
  }

  private onTouched = (val: string) => { };
  private onChange = (val: string) => { };

  private setPositions(): void {
    this.timePickerElement = document.getElementById('time-picker');
    const inputPosition = this.timeInput.nativeElement.getBoundingClientRect();

    this.timePickerElement.style.top = `${inputPosition.top}px`;
    this.timePickerElement.style.left = `${inputPosition.left}px`;
  }

  private resetPickerPosition(): void {
    this.timePickerElement.style.top = '0';
    this.timePickerElement.style.left = '0';
  }
}
