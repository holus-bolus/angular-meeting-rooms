import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'andteam-quantity-select',
  templateUrl: './quantity-select.component.html',
  styleUrls: ['./quantity-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuantitySelectComponent),
      multi: true
    }
  ],
})
export class QuantitySelectComponent implements OnInit {

  @Input() public max = 50;

  public value = 0;

  private onTouched: (value: number) => void;
  private onChange: (value: number) => void;

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

  public writeValue(value: number): void {
    this.value = value;
  }

  public plus(): void {
    if (this.value < this.max) {
      this.value++;
      this.onChange(this.value);
      this.changeDetectorRef.markForCheck();
    }
  }

  public minus(): void {
    if (this.value > 1) {
      this.value--;
      this.onChange(this.value);
      this.changeDetectorRef.markForCheck();
    }
  }
}
