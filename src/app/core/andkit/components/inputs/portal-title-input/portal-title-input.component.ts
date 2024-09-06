import { Component, ChangeDetectionStrategy, Input, forwardRef, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'andteam-portal-title-input',
  templateUrl: './portal-title-input.component.html',
  styleUrls: ['./portal-title-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PortalTitleInputComponent),
      multi: true,
    },
  ],
})
export class PortalTitleInputComponent implements ControlValueAccessor {
  @Input() placeholder: string;
  @Input() maxLength: number;
  @Input() error: boolean;
  @Input() errorMessage: string;
  @Input() darkTheme = false;
  value: string;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public onCheckedChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    this.onChange(value);
  }

  public writeValue(value: string): void {
    this.value = value;
    this.changeDetectorRef.markForCheck();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private onTouched = (val: string) => {};
  private onChange = (val: string) => {};
}
