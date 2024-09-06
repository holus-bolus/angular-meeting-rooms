import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ElementRef,
  HostListener,
} from '@angular/core';
import { ICommonOption } from '@interfaces/filter';

import vectorYellowSvg from '!!raw-loader!@assets/images/portal-arrow.svg';

@Component({
  selector: 'andteam-chips-autocomplete',
  templateUrl: './chips-autocomplete.component.html',
  styleUrls: ['./chips-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsAutocompleteComponent implements OnChanges {
  @Input() public labelText: string;
  @Input() public options: ICommonOption[];
  @Input() public placeholder: string;
  @Input() public type: string;
  @Input() public error: string;
  @Input() public isSearchActive = true;
  @Input() public isAllOptionEnabled = false;

  @Output() public checkOption = new EventEmitter<ICommonOption>();
  @Output() public checkOptions = new EventEmitter<ICommonOption[]>();

  public isSearchListOpen = false;
  public isChecked: boolean;
  public isBackdropClick = false;

  public vectorIcon = vectorYellowSvg;

  constructor(
    private ref: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    this.isBackdropClick = !this.ref.nativeElement.contains(event.target);
    this.onCloseDropdown();
  }

  public ngOnChanges({ options }: SimpleChanges): void {
    if (options) {
      this.markOptions();
    }
  }

  public onOpen(): void {
    this.isSearchListOpen = !this.isSearchListOpen;
  }

  public onCloseDropdown(): void {
    if (this.isBackdropClick) {
      this.isSearchListOpen = false;
    }
  }

  public onCheckOption(option: ICommonOption): void {
    this.checkOption.emit(option);
  }

  public onCheckOptions(options: ICommonOption[]): void {
    this.checkOptions.emit(options);
  }

  private markOptions(): void {
    this.isChecked = this.options && this.options.some(option => option.checked);
  }
}


