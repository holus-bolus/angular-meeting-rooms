import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { ICommonOption } from '@interfaces/filter';
import { COMPONENT_TYPES } from 'src/app/core/constants/types/componentTypes.constants';

import closeSvg from '!!raw-loader!./icons/close.svg';
import searchMenuSvg from '!!raw-loader!@assets/images/search-menu.svg';

@Component({
  selector: 'andteam-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AutoCompleteComponent implements OnInit, AfterViewInit {
  public closeIcon = closeSvg;
  public searchIcon = searchMenuSvg;
  public isAssessment: boolean;
  public isPortal: boolean;
  public isOvertime: boolean;
  public disabled = true;

  @ViewChild('searchInput') inputElement: ElementRef;
  @ViewChild('automcomplete') autocomplete;

  @Input() labelText: string;
  @Input() options: ICommonOption[];
  @Input() placeholder: string;
  @Input() control: AbstractControl | FormControl;
  @Input() focus: boolean;
  @Input() componentType = COMPONENT_TYPES.PORTAL;
  @Input() error: boolean;
  @Input() errorMessage: string;
  @Input() transparentHeader = false;
  @Input() isHeaderSearch = false;
  @Input() isShowSearchIcon = false;
  @Input() noResultsText = 'Not found';
  @Input() isShowOptionsAfterReset = false;

  @Output() selectOption = new EventEmitter<ICommonOption>();
  @Output() valueReseted = new EventEmitter<void>();

  public ngOnInit(): void {
    this.isAssessment = this.componentType === COMPONENT_TYPES.ASSESSMENT;
    this.isPortal = this.componentType === COMPONENT_TYPES.PORTAL;
    this.isOvertime = this.componentType === COMPONENT_TYPES.OVERTIME;
  }

  public ngAfterViewInit(): void {
    if (this.focus) {
      this.inputElement.nativeElement.focus();
    }
  }

  public onKeyEnterUp(event: Event): void {
    const option = this.options.filter((value: ICommonOption) => value.name === (event.target as HTMLInputElement).value);

    this.selectOption.emit(...option);
  }

  public onClick(option: ICommonOption): void {
    this.control.setValue(option.name);
    this.selectOption.emit(option);
  }

  public onReset(): void {
    this.control.setValue('');
    this.valueReseted.emit();

    if (this.isShowOptionsAfterReset) {
      setTimeout(() => {
        this.autocomplete.openPanel();
      });
    }
  }

  public isImage(option: ICommonOption): boolean {
    return typeof option.photoUrl === 'string' && !!option?.photoUrl;
  }

  public onHeaderSearchClick(event: MouseEvent): void {
    if (event.ctrlKey) {
      event.stopPropagation();

      return;
    }

    event.preventDefault();
  }
}
