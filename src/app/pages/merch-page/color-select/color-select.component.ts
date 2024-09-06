import { Component, OnInit, ChangeDetectionStrategy, forwardRef, ChangeDetectorRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ColorOption, colorOptions } from '@pages/merch-page/color-select/color-options';
import { Color } from '@pages/merch-page/color-select/color.enum';
import { ICommonOption } from '@interfaces/filter';

@Component({
  selector: 'andteam-color-select',
  templateUrl: './color-select.component.html',
  styleUrls: ['./color-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorSelectComponent),
      multi: true
    }
  ],
})
export class ColorSelectComponent implements OnInit, ControlValueAccessor {

  @Input() public options: ICommonOption[] = [];

  public value: ICommonOption = null;

  private onTouched: (value: ICommonOption) => void;
  private onChange: (value: ICommonOption) => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {

  }

  public registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(value: ICommonOption): void {
    this.onChangeValue(value);
  }

  public onChangeValue(value: ICommonOption): void {
    const colorOption = this.options.find(item => item.id === value?.id);

    this.value = colorOption || null;

    if (this.onChange) {
      this.onChange(this.value);
    }

    this.changeDetectorRef.markForCheck();
  }
}
