import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ICommonOption } from '@interfaces/filter';
import { IOffice } from '@interfaces/office';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'andteam-create-event-filters',
  templateUrl: './create-event-filters.component.html',
  styleUrls: ['./create-event-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEventFiltersComponent {
  @Input() public date: FormControl;
  @Input() public hour: FormControl;
  @Input() public minute: FormControl;
  @Input() public signupUrl: FormControl;
  @Input() public place: FormControl;
  @Input() public topic: ICommonOption;
  @Input() public topics: ICommonOption[];
  @Input() public office: IOffice;
  @Input() public offices: IOffice[];
  @Input() public officeError: boolean;
  @Input() public topicError: boolean;
  @Input() public dateError: boolean;
  @Input() public minutesError: boolean;
  @Input() public hoursError: boolean;

  @Output() public selectOption = new EventEmitter<ICommonOption>();
  @Output() public selectOptions = new EventEmitter<ICommonOption[]>();

  control = new FormControl();

  public onSelectOption(filterOption: ICommonOption): void {
    this.selectOption.emit(filterOption);
  }

  public onSelectOptions(filterOptions: ICommonOption[]): void {
    this.place.patchValue(this.getCurrentPlace(filterOptions));
    this.selectOptions.emit(filterOptions);
  }

  private getCurrentPlace(filterOptions: ICommonOption[]): string {
    const option = filterOptions.find(item => item.checked);

    return option ? option.place : '';
  }
}
