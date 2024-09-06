import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import checkboxVectorSvg from '!!raw-loader!@assets/images/checkbox-vector.svg';

@Component({
  selector: 'andteam-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {
  public isChecked = false;
  public checkboxIcon: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  public ngOnInit(): void {
    this.checkboxIcon = this.sanitizer.bypassSecurityTrustHtml(checkboxVectorSvg as any);
  }

  public onCheckedChange(): void {
    this.isChecked = !this.isChecked;
    this.onChange(this.isChecked);
  }

  public writeValue(value: boolean): void {
    this.isChecked = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private onTouched = (val: boolean) => {};
  private onChange = (val: boolean) => {};
}
