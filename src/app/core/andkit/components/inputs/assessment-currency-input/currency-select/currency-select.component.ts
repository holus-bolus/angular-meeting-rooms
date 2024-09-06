import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ICurrencyOption } from '@interfaces/candidate';
import { COMPONENT_TYPES } from '@constants/types/componentTypes.constants';

@Component({
  selector: 'andteam-currency-select',
  templateUrl: './currency-select.component.html',
  styleUrls: ['./currency-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencySelectComponent {
  @Input() public selectedCurrency: ICurrencyOption;
  @Input() public error: boolean;
  @Input() public currencies: ICurrencyOption[];

  @Output() public selectCurrency = new EventEmitter<any>();

  public isFocused: boolean;
  public selectType = COMPONENT_TYPES.ASSESSMENT;

  public onSelect(currencyId: string): void {
    this.selectCurrency.emit(currencyId);
  }
}
