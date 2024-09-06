import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ISelectOption } from '@interfaces/filter';
import { MatCheckboxChange } from '@angular/material/checkbox';

import vectorYellowSvg from '!!raw-loader!@assets/images/vector-yellow.svg';

@Component({
  selector: 'andteam-portal-multiselect',
  templateUrl: './portal-multiselect.component.html',
  styleUrls: ['./portal-multiselect.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PortalMultiselectComponent implements OnChanges {
  @Input() public labelText: string;
  @Input() public options: ISelectOption<string>[];
  @Input() public placeholder: string;
  @Input() public valueOptionFlag = false;
  @Output() public checkOption = new EventEmitter<ISelectOption<string>>();

  public isSearchListOpen = false;
  public isChecked: boolean;
  public value = '';

  public vectorIcon = vectorYellowSvg;

  @HostListener('window:scroll', ['$event'])
  public scrollHandler(event: Event): void {
    this.onCloseDropdown(false);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      this.value = this.getValue();
      this.isChecked = this.options.some(option => !option.disabled && option.checked);
    }
  }

  public onCloseDropdown(isOpen: boolean): void {
    this.isSearchListOpen = isOpen;
  }

  public onSelectOption(event: MatCheckboxChange, option: ISelectOption<string>): void {
    this.checkOption.emit({ ...option, checked: event.checked });
  }

  private getValue(): string {
    const valueOptions = this.options.filter(option => option.checked && !option.disabled);
    const disabledOptions = this.options.filter(option => option.disabled);

    if (!valueOptions.length) {
      return this.placeholder;
    }

    if (!this.valueOptionFlag) {
      return valueOptions.map(option => option.value).join(', ');
    }

    if (valueOptions.length === 1) {
      return valueOptions[0].value;
    }

    if (valueOptions.length > 1) {
      return `${valueOptions[0].value}...(${valueOptions.length + disabledOptions.length})`;
    }
  }
}
