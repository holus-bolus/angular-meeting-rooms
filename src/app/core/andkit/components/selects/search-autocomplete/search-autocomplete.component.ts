import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { MaterialInfoBtnConst } from '@andkit/components/buttons/material-info-btn/material-info-btn.const';
import { ICommonOption } from '@interfaces/filter';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import closeSvg from '!!raw-loader!@assets/images/close.svg';
import searchMenuSvg from '!!raw-loader!@assets/images/search-menu.svg';

@Component({
  selector: 'andteam-search-autocomplete',
  templateUrl: './search-autocomplete.component.html',
  styleUrls: ['./search-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchAutocompleteComponent implements OnInit, OnDestroy {
  @Input() placeholder: string;
  @Input() options: ICommonOption[];
  @Input() option: ICommonOption;
  @Input() control: AbstractControl | FormControl;
  @Input() additionalInfo: string;
  @Input() hintMessage: string;
  @Input() error = false;
  @Input() errorMessage: string;
  @Input() disabled: boolean;
  @Input() isRequired = true;

  @Output() selectOption = new EventEmitter<ICommonOption>();

  public closeIcon = closeSvg;
  public searchIcon = searchMenuSvg;
  public yellow = MaterialInfoBtnConst.YELLOW;
  public optionName: string;
  public destroy = new Subject<void>();

  constructor() { }

  public ngOnInit(): void {
    if (this.option) {
      this.control.setValue(this.option.name);
      this.optionName = this.option.name;
    }
    if (this.isRequired) {
      this.control.valueChanges
        .pipe(takeUntil(this.destroy))
        .subscribe(() => {
          this.selectOption.emit(null);
          this.control.setErrors({ duplicate: true });
        });
    }
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public onSelectOption(option: ICommonOption): void {
    if (!option.disabled) {
      this.control.setValue(option.name);
      this.control.setErrors(null);
      this.selectOption.emit(option);
      this.hintMessage = option.position ? `Approver — ${ option.position }` : '';
      this.optionName = option.name;
    }
  }

  public onEnterOption(event: Event): void {
    const eventTargetValue = (event.target as HTMLInputElement).value;
    this.control.setValue(eventTargetValue);
    this.options.forEach((option: ICommonOption) => {
      if (option.name === eventTargetValue) {
        this.control.setErrors(null);
        this.selectOption.emit(option);
        this.hintMessage = option.position ? `Approver — ${ option.position }` : '';
      }
    });
  }

  public onReset(): void {
    this.control.setValue('');
    this.hintMessage = '';
  }
}
