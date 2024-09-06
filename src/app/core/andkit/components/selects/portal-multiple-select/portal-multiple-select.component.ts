import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ICommonOption } from '@interfaces/filter';

import portalYellowArrowUpSvg from '!!raw-loader!@assets/images/portal-yellow-arrow-up.svg';
import portalBlackArrowDownSvg from '!!raw-loader!@assets/images/portal-black-arrow-down.svg';

@Component({
  selector: 'andteam-portal-multiple-select',
  templateUrl: './portal-multiple-select.component.html',
  styleUrls: ['./portal-multiple-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalMultipleSelectComponent implements OnChanges {
  @Input() public options: ICommonOption[];
  @Input() public placeholder: string;
  @Input() public error: string;
  @Input() public isAllOptionEnabled = true;
  @Input() public onlyOneChoose = false;

  @Output() public checkOptions = new EventEmitter<ICommonOption[]>();

  public isSearchListOpen = false;
  public control = new FormControl([]);
  public value = '';
  public isChecked: boolean;
  public vectorIcon = portalBlackArrowDownSvg;

  public ngOnChanges({ options }: SimpleChanges): void {
    if (options) {
      this.value = this.options.filter(option => option.checked).map(option => option.name).join(', ') || this.placeholder;
      this.isChecked = this.options.some(option => option.checked);
    }
  }

  public onCloseDropdown(isOpen: boolean): void {
    if (this.isSearchListOpen !== isOpen) {
      switch (this.vectorIcon) {
        case portalYellowArrowUpSvg:
          this.vectorIcon = portalBlackArrowDownSvg;
          break;
        case portalBlackArrowDownSvg:
          this.vectorIcon = portalYellowArrowUpSvg;
          break;
      }
    }

    this.isSearchListOpen = isOpen;
  }

  public onCheckOption(option: ICommonOption): void {
    let checkedOptions = this.options
      .map((item: ICommonOption) => item.id === option.id ? option : item)
      .filter(({ checked }: ICommonOption) => checked);
    if (this.onlyOneChoose) {
      this.options = this.options.map(opt => ({ ...opt, checked: opt.id === option.id ? !opt.checked : false }));
      checkedOptions = checkedOptions.filter(({ id }: ICommonOption) => id === option.id);
    }

    this.checkOptions.emit(checkedOptions);
  }

  public onCheckAllOptions(options: ICommonOption[]): void {
    const checkedOptions = options
      .filter(({ checked }: ICommonOption) => checked);

    this.checkOptions.emit(checkedOptions);
  }
}
