import { Component, ChangeDetectionStrategy, Input, OnDestroy, forwardRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Overlay, OverlayConfig, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { MONTHS } from './date-period.constants';

import closeInputSvg from '!!raw-loader!@assets/images/close-input.svg';
import dateSvg from '!!raw-loader!@assets/images/date.svg';
import pickerArrowSvg from '!!raw-loader!@assets/images/picker-arrow.svg';

@Component({
  selector: 'andteam-date-period-picker',
  templateUrl: './date-period-picker.component.html',
  styleUrls: ['./date-period-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePeriodPickerComponent),
      multi: true,
    },
  ],
})

export class DatePeriodPickerComponent implements OnDestroy {
  @Input() startDate: AbstractControl | FormControl;
  @Input() endDate: AbstractControl | FormControl;

  @ViewChild(CdkOverlayOrigin) overlayOrigin: CdkOverlayOrigin;
  @ViewChild('dateRangeTemplate') dateRangeTemplate: CdkPortal;

  public dateIcon = dateSvg as any;
  public arrowIcon = pickerArrowSvg as any;
  public closeIcon = closeInputSvg as any;
  public months = MONTHS;
  public initialStartDate = new Date();
  public initialEndDate = new Date();
  public nowDate = new Date();

  public openedBS = new BehaviorSubject(false);
  private destroy$ = new Subject<void>();

  constructor(
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
  ) {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  asIsOrder(): number {
    return 1;
  }

  reset(): void {
    this.startDate.reset();
    this.endDate.reset();
  }

  public openDateWindow(): void {
    this.openedBS.next(true);
    const config = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.overlay.position()
        .flexibleConnectedTo(this.overlayOrigin.elementRef)
        .withPositions([{
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        }]),
    });

    const overlayRef = this.overlay.create(config);
    overlayRef.attach(this.dateRangeTemplate);
    overlayRef.backdropClick()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.startDate.touched && this.startDate.value && !this.endDate.touched) {
          this.endDate.setValue(this.startDate.value);
          this.endDate.markAllAsTouched();
        } else if (this.endDate.touched && this.endDate.value && !this.startDate.touched) {
          this.startDate.setValue(this.endDate.value);
          this.startDate.markAllAsTouched();
        }

        this.openedBS.next(false),
        overlayRef.detach();
      });
  }

  updateDate(date: AbstractControl | FormControl, tmonth: number, currentYear: number, type: 'start' | 'end'): void {
    const newDate = new Date();
    newDate.setFullYear(currentYear);
    newDate.setMonth(tmonth);
    if (this.checkWrongRange(newDate, type)) {
      return;
    }

    switch (type) {
      case 'start': {
        this.initialStartDate = new Date(newDate);
        !this.endDate.touched ?? this.endDate.setValue(new Date(newDate));
        break;
      }
      case 'end': {
        this.initialEndDate = new Date(newDate);
        !this.startDate.touched ?? this.startDate.setValue(new Date(newDate));
        break;
      }
    }

    date.markAllAsTouched();
    date.setValue(newDate);
  }

  checkWrongRange(newDate: Date, type: 'start' | 'end'): boolean {
    if (type === 'end' &&
      this.startDate.touched &&
      ((newDate.getFullYear() === this.startDate.value.getFullYear() &&
      newDate.getMonth() < this.startDate.value.getMonth()) ||
      newDate.getFullYear() < this.startDate.value.getFullYear())) {
      return true;
    }

    if (type === 'start' &&
      this.endDate.touched &&
      ((newDate.getFullYear() === this.endDate.value.getFullYear() &&
      newDate.getMonth() > this.endDate.value.getMonth()) ||
      newDate.getFullYear() > this.endDate.value.getFullYear())) {
      return true;
    }

    return false;
  }
}
