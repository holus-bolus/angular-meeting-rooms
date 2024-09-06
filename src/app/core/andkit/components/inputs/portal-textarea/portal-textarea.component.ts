import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// tslint:disable-next-line:import-name
import clearSvg from '!!raw-loader!@assets/images/close.svg';
import closeSvg from '!!raw-loader!./icons/close.svg';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'andteam-portal-textarea',
  templateUrl: './portal-textarea.component.html',
  styleUrls: ['./portal-textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PortalTextareaComponent),
      multi: true
    }
  ]
})
export class PortalTextareaComponent implements OnInit, ControlValueAccessor {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  @Input() placeholder: string;
  @Input() error: boolean;
  @Input() errorMessage: string;
  @Input() hint: boolean;
  @Input() hintMessage: string;
  @Input() maxRows = 6;
  @Input() value = '';
  @Input() disabled: boolean;
  @Input() isNoErrorMargin: boolean;
  @Input() isCloseIconShow: boolean;
  @Input() automationId = 'portal-textarea';
  @Input() maxLength = Infinity;

  @Output() changeValue = new EventEmitter<string>();

  private closeIcon: SafeHtml;
  private clearIcon: SafeHtml;

  constructor(private sanitizer: DomSanitizer) { }

  public ngOnInit(): void {
    this.closeIcon = this.sanitizer.bypassSecurityTrustHtml(closeSvg as any);
    this.clearIcon = this.sanitizer.bypassSecurityTrustHtml(clearSvg as any);
  }

  public onChangeValue(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    this.value = value;
    this.onChange(value);
    this.changeValue.emit(value);
  }

  public onEnter(): void {
    this.changeValue.emit(this.value);
  }

  public registerOnChange(func: any): void {
    this.onChange = func;
  }

  public registerOnTouched(func: any): void {
    this.onTouched = func;
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  public clearTextarea(): void {
    this.value = '';
    this.onChange('');
    this.changeValue.emit('');
    this.resizeToFitContent();
  }

  public resizeToFitContent(): void {
    window.requestAnimationFrame(() => {
      this.autosize.resizeToFitContent(true);
    });
  }

  private onTouched = (value: string) => {};
  private onChange = (value: string) => {};
}
