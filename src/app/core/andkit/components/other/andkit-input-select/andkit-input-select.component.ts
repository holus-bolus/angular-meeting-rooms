import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IOption } from '@interfaces/filter';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

import selectArrowSvg from '!!raw-loader!@assets/images/select-arrow-orange.svg';
import clearButtonSvg from '!!raw-loader!@assets/images/clear-button.svg';


@Component({
  selector: 'andteam-andkit-input-select',
  templateUrl: './andkit-input-select.component.html',
  styleUrls: ['./andkit-input-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AndkitInputSelectComponent implements OnInit {
  @Input() set options(options: IOption[]) {
    this.optionList$.next(options);
  }

  @Input() placeholder: string;
  @Input() isDisabled: boolean;
  @Input() option: IOption;
  @Input() panelPosition: string;

  @Input() set clearOption(value: boolean) {
    this.clearSearchField();
  }

  @Output() selectOption = new EventEmitter<IOption>();
  @Output() inputCleared = new EventEmitter<void>();

  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

  public autocompleteControl = new FormControl();
  public filteredOptions$: Observable<IOption[]>;
  public optionList$ = new BehaviorSubject<IOption[]>([]);
  public searchField = '';

  readonly selectArrowIcon = selectArrowSvg as any;
  readonly clearButtonIcon = clearButtonSvg as any;

  public ngOnInit(): void {
    this.filteredOptions$ = combineLatest([this.optionList$, this.autocompleteControl.valueChanges
      .pipe(startWith(''))
    ])
      .pipe(
        map(([options, inputValue]: [IOption[], string]) => {
          if (inputValue) {
            return options.filter(option => option.name.toLowerCase().includes(inputValue.toLowerCase()));
          }

          return options;
        })
      );

    if (this.panelPosition === 'left') {
      this.panelPosition = 'mat-input-select-panel-left';
    }
  }

  public clearSearchField(): void {
    this.searchField = '';

    this.inputCleared.emit();
  }

  public onSelectOption(selectOption: string): void {
    const option = this.optionList$.value.find((value: IOption) => value.name === selectOption);

    this.autocompleteControl.setValue(selectOption);
    this.selectOptionEmit(option);
    this.autocomplete.closePanel();
  }

  public onKeyEnterUp(event: Event): void {
    const option = this.optionList$.value.find((value: IOption) => value.name === (event.target as HTMLInputElement).value);

    this.selectOptionEmit(option);
  }

  private selectOptionEmit(option: IOption): void {
    this.option = option;

    this.selectOption.emit(option);
  }
}
