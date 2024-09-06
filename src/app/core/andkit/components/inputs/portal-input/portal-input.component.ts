import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter,
  forwardRef,
  Input,
  OnInit, Output,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CURRENCIES } from '@constants/currencies';
import { KEYS } from '@constants/keys.constants';
import { COMPONENT_TYPES, INPUT_TYPES } from '@constants/types/componentTypes.constants';

import closeSvg from '!!raw-loader!./icons/close.svg';
import searchSvg from '!!raw-loader!./icons/search.svg';

@Component({
  selector: 'andteam-portal-input',
  templateUrl: './portal-input.component.html',
  styleUrls: ['./portal-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PortalInputComponent),
      multi: true
    }
  ]
})
export class PortalInputComponent implements OnInit, ControlValueAccessor {
  @Input() public placeholder = '';
  @Input() public error: boolean;
  @Input() public errorMessage: string;
  @Input() public searchType: boolean;
  @Input() public inputType = INPUT_TYPES.TEXT;
  @Input() public mask: string | CURRENCIES;
  @Input() public disabledInput: number;
  @Input() public componentType = COMPONENT_TYPES.PORTAL;
  @Input() public hintMessage: string;
  @Input() public hideCloseButton: boolean;
  @Input() public formControl: FormControl;
  @Input() public maxLength = Infinity;

  @Output() inputValue = new EventEmitter<number | string>();

  public hoursInputType = INPUT_TYPES.HOURS;
  public minutesInputType = INPUT_TYPES.MINUTES;
  public defaultInputType = INPUT_TYPES.TEXT;
  public numberInputType = INPUT_TYPES.NUMBER;
  public hoursContext = { start: '^[0-2]*$', end: '^[0-9]*$' };
  public minutesContext = { start: '^[0-5]*$', end: '^[0,5]*$' };

  public isAssessment: boolean;
  public isPortal: boolean;
  public isOvertime: boolean;
  public lastKey: string;
  public value = '';

  readonly closeIcon = closeSvg;
  readonly searchIcon = searchSvg;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.value = this.formControl.value;
    this.isAssessment = this.componentType === 'assessment';
    this.isPortal = this.componentType === 'portal';
    this.isOvertime = this.componentType === 'overtime';
  }

  public onKeyupEnter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    this.onChange(value);
  }

  public onKeyDown(event: KeyboardEvent): void {
    this.lastKey = event.key;
  }

  public onChangeValue(event: Event): void {
    if (this.inputType === INPUT_TYPES.NUMBER && (this.lastKey === KEYS.DOT || this.lastKey === KEYS.COMA)) {
      return;
    }

    this.value = (event.target as HTMLInputElement).value;

    if (!this.searchType) {
      this.onChange(this.value);
    }

    this.value ? this.inputValue.emit(this.value) : this.inputValue.emit('');
  }

  public onReset(): void {
    this.value = '';
    this.onChange(this.value);
    this.inputValue.emit(this.value);
  }

  public registerOnChange(func: any): void {
    this.onChange = func;
  }

  public registerOnTouched(func: any): void {
    this.onTouched = func;
  }

  public writeValue(value: string): void {
    this.value = value;
    this.changeDetectorRef.markForCheck();
  }

  private onTouched = (value: string) => {};
  private onChange = (value: string) => {
  }
}
