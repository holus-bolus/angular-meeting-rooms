import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, SimpleChanges, OnChanges, ChangeDetectorRef } from '@angular/core';
import { ICommonOption } from '@interfaces/filter';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as Fuse from 'fuse.js';

import searchSvg from '!!raw-loader!@assets/images/search.svg';


export const TECHNOLOGIES = 'Technologies';
export const OPTIONS = {
  keys: ['name'],
  threshold: 0.4,
};

@Component({
  selector: 'andteam-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchListComponent implements OnInit, OnChanges {
  @Input() options: ICommonOption[];
  @Input() title: string;
  @Input() isAllOptionEnabled: boolean;
  @Input() isSearchActive: boolean;

  @Output() checkOption = new EventEmitter<ICommonOption>();
  @Output() checkOptions = new EventEmitter<ICommonOption[]>();
  @Output() closeDropdown = new EventEmitter<boolean>();

  foundOptions: ICommonOption[] = [];
  search = new FormControl('');
  searchIcon: SafeHtml;
  isAllOptionsSelected: boolean;

  constructor(
    private sanitizer: DomSanitizer) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.options.currentValue) {
      this.foundOptions = <ICommonOption[]>changes.options.currentValue;
    }
  }

  public ngOnInit():void {
    this.foundOptions = this.options;
    this.isAllOptionsSelected = this.options.every((option: ICommonOption) => option.checked);

    this.search.valueChanges.pipe(
      map(data => this.filterData(data))
    )
    .subscribe(
      (data: ICommonOption[]) => {
        this.foundOptions = data;
      }
    );

    this.searchIcon = this.sanitizer.bypassSecurityTrustHtml(searchSvg as any);
  }

  public onCloseDropdown(isOpen: boolean):void {
    this.closeDropdown.emit(isOpen);
  }

  public onSelectOption({ checked }: MatCheckboxChange, option: ICommonOption):void {
    this.foundOptions = this.getFoundOptions(option);
    this.isAllOptionsSelected = this.options.length === this.getCheckedOptionsLength();
    this.checkOption.emit({ ...option, checked });
  }

  public onSelectAllOptions():void {
    this.isAllOptionsSelected = !this.isAllOptionsSelected;
    this.foundOptions = this.getCheckedAllOptions();
    this.checkOptions.emit(this.foundOptions);
  }

  private getCheckedAllOptions(): ICommonOption[] {
    return this.foundOptions.map((option: ICommonOption) => {
      return {
        ...option,
        checked: this.isAllOptionsSelected
      };
    });
  }

  private getFoundOptions(selectedOption: ICommonOption): ICommonOption[] {
    return this.foundOptions.reduce((result: ICommonOption[], option: ICommonOption) => {
      result.push({
        ...option,
        checked: selectedOption.id === option.id
          ? !option.checked
          : option.checked
      });

      return result;
    },                              []);
  }

  private getCheckedOptionsLength(): number {
    return this.foundOptions
      .filter((option: ICommonOption) => option.checked)
      .length;
  }

  private filterData(data: string): ICommonOption[] {
    if (!data) {
      return this.options;
    }

    const lowerCaseData = data.toLowerCase();

    if (this.title === TECHNOLOGIES) {
      const fuse = new Fuse(this.options, OPTIONS);

      return fuse.search(lowerCaseData);
    }

    return this.options.filter((option: ICommonOption) => {
      const name = option.name.slice(0, data.length);

      return name.toLowerCase().includes(lowerCaseData);
    });
  }
}
