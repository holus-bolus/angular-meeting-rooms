import { takeUntil } from 'rxjs/operators';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, forwardRef, ViewEncapsulation } from '@angular/core';
import { ICommonOption } from '@interfaces/filter';
import { Subject } from 'rxjs';

import portalArrowSvg from '!!raw-loader!@assets/images/portal-arrow.svg';

@Component({
  selector: 'andteam-select-control',
  templateUrl: './select-control.component.html',
  styleUrls: ['./select-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectControlComponent),
      multi: true,
    }
  ]
})
export class SelectControlComponent implements OnInit, ControlValueAccessor {

  @Input() options: ICommonOption[];
  @Input() placeholder = 'Select option';
  @Input() error: boolean;
  @Input() errorMessage: string;
  @Input() additionalInfo: string[];
  @Input() panelClass = 'select-panel-class';
  @Input() automationId = 'andteam-select-control';
  @Input() viewValue = 'name';
  @Input() exprValue = 'id';
  @Input() disabled = false;

  @Output() selectOption = new EventEmitter<ICommonOption>();

  public formControl = new FormControl(null);
  public portalArrow: string;

  private readonly destroy$ = new Subject<void>();

  public getViewValue(value: ICommonOption | string): string {
    return typeof value === 'object'
      ? value[this.viewValue]
      : value;
  }

  public getExprValue(value: ICommonOption | string): string {
    return typeof value === 'object'
      ? value[this.exprValue]
      : value;
  }

  public ngOnInit(): void {
    this.portalArrow = portalArrowSvg;

    this.formControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: ICommonOption) => {
        this.propagateChange(value);
      });
  }

  public writeValue(value: ICommonOption): void {
    this.formControl.patchValue(value && typeof value === 'object'
      ? value[this.exprValue]
      : value
    );
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = () => {
      this.formControl.markAsTouched();
      fn();
    };
  }

  private onTouched = () => { };
  private propagateChange = (val: any) => { };
}
