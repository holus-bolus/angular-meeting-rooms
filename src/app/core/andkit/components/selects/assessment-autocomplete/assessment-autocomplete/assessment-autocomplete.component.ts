import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  forwardRef,
  Renderer2,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { ICommonOption } from '@interfaces/filter';

import trashCanSvg from '!!raw-loader!../icons/trash-can.svg';
import searchSvg from '!!raw-loader!../icons/search.svg';

@Component({
  selector: 'andteam-assessment-autocomplete',
  templateUrl: './assessment-autocomplete.component.html',
  styleUrls: ['./assessment-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AssessmentAutocompleteComponent),
      multi: true
    }
  ]
})
export class AssessmentAutocompleteComponent implements OnDestroy, ControlValueAccessor {
  @Input() public placeholder = 'placeholder';
  @Input() public error: boolean;
  @Input() public errorMessage: string;
  @Input() public options: ICommonOption[] = [];
  @Input() public disabled: boolean;

  @Output() public selectOption = new EventEmitter<ICommonOption>();
  @Output() public clearField = new EventEmitter<void>();
  @Output() public blurField = new EventEmitter<string>();
  @Output() public searchValueChange = new EventEmitter<string>();

  @ViewChild('input') input: ElementRef;

  public value = '';
  public destroy$ = new Subject();
  public isOpen: boolean;
  public isFocused: boolean;
  readonly clearIcon = trashCanSvg as any;
  readonly searchIcon = searchSvg as any;

  constructor(private renderer: Renderer2) { }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onValueChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.isOpen = true;
    this.value = value;
    this.searchValueChange.emit(value);
    this.onChange(value);
  }

  public onBlur(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    this.blurField.emit(value);
  }

  public clearTextArea(): void {
    this.isOpen = false;
    this.isFocused = false;
    this.clearField.emit();
    this.input.nativeElement.focus();

    this.writeValue('');
    this.onChange('');
  }

  public onSelect(selectedOption: ICommonOption): void {
    const { name } = selectedOption;

    this.writeValue(name);
    this.renderer.setProperty(this.input.nativeElement, 'value', name);
    this.onChange(name);
    this.isOpen = false;
    this.selectOption.emit(selectedOption);
  }

  public onCloseDropdown(): void {
    this.isOpen = false;
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

  private onTouched = (value: string) => {};
  private onChange = (value: string) => {};

}
