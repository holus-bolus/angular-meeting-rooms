import {
  Component,
  OnChanges,
  OnInit,
  ChangeDetectionStrategy,
  forwardRef,
  Input,
  OnDestroy,
  ChangeDetectorRef, Output, EventEmitter
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';
import { Subject } from 'rxjs';
import { ICurrencyOption, ISalaryPayload } from '@interfaces/candidate';
import { CURRENCIES } from '@constants/currencies';

@Component({
  selector: 'andteam-assessment-currency-input',
  templateUrl: './assessment-currency-input.component.html',
  styleUrls: ['./assessment-currency-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AssessmentCurrencyInputComponent),
      multi: true
    }
  ]
})
export class AssessmentCurrencyInputComponent implements OnChanges, OnInit, OnDestroy, ControlValueAccessor {
  @Input() public error: boolean;
  @Input() public currencies: ICurrencyOption[];
  @Input() public selectedCurrency: ICurrencyOption;

  public value: ISalaryPayload;
  public calculatedSalary = '';
  public isRuble = false;
  public destroy$ = new Subject();
  public salaryControl: FormControl;

  @Output() public blurSalary = new EventEmitter<ISalaryPayload>();

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public ngOnChanges(): void {
    if (this.salaryControl) {
      this.salaryControl.reset();
    }
  }

  public ngOnInit(): void {
    this.salaryControl = new FormControl('', Validators.pattern('^[0-9]{0,9}$'));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSelect(newCurrency: CURRENCIES): void {
    this.writeValue({ ...this.value, salaryCurrency: newCurrency });
    if (this.salaryControl.valid) {
      this.onChange(this.value);
      this.blurSalary.emit(this.value);
    }
  }

  public onSalaryChange(newSalary: string): void {
    this.salaryControl.setValue(newSalary);
    this.writeValue({ ...this.value, salaryRequirement: newSalary });
    this.onChange(this.value);
  }

  public onSalaryBlur(): void {
    if (this.salaryControl.valid) {
      this.blurSalary.emit(this.value);
    }
  }

  public registerOnChange(func: any): void {
    this.onChange = func;
  }

  public registerOnTouched(func: any): void {
    this.onTouched = func;
  }

  public writeValue(value: ISalaryPayload): void {
    this.value = value;
    this.changeDetectorRef.markForCheck();
  }

  private onTouched = (value: ISalaryPayload) => {};
  private onChange = (value: ISalaryPayload) => {};
}
