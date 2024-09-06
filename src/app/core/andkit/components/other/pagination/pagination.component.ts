import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { IPaginationConfig } from '@interfaces/employee';
import { PaginationControlsDirective,  } from 'ngx-pagination';
import { ICommonOption } from '@interfaces/filter';
import { FormControl } from '@angular/forms';

import avatarVectorSvg from '!!raw-loader!@assets/images/avatar-vector.svg';
import arrowLeftSvg from '!!raw-loader!@assets/images/arrow-left.svg';

const MAX_SIZE = 7;
const NEXT_NAVIGATION_LABEL = '...';

interface IPaginationPage {
  label: string;
  value: number;
}

@Component({
  selector: 'andteam-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {
  @Input() public isPortalType: boolean;
  @Input() public paginationConfig: IPaginationConfig;
  @Input() public totalPages: number;
  @Input() public isShowItemsCount = false;
  @Input() public selectOptions: ICommonOption[];
  @Input() public selectOption: ICommonOption;

  @Output() public sendPageNumber = new EventEmitter<number>();
  @Output() public sendItemsCount = new EventEmitter<string>();

  public arrowIcon: SafeHtml;
  public vectorIcon: SafeHtml;
  public maxSize = MAX_SIZE;
  public isOpenList = false;
  public isFirstListButton = true;
  public currentPage: number;
  public pages: number[];
  public isShowPrevious: boolean;
  public isShowNext: boolean;
  public panelClass = 'paginator-panel-class';
  public selectFormControl = new FormControl('');

  constructor(private sanitizer: DomSanitizer) {}

  public ngOnInit(): void {
    this.arrowIcon = this.sanitizer.bypassSecurityTrustHtml(avatarVectorSvg as any);
    this.vectorIcon = this.sanitizer.bypassSecurityTrustHtml(arrowLeftSvg as any);
    this.selectFormControl.setValue({ name: '20', id: '20' });

    const { itemsPerPage, totalItems, currentPage } = this.paginationConfig;
    this.isShowPrevious = currentPage !== 1;
    this.isShowNext = currentPage !==  Math.ceil(totalItems / itemsPerPage);
  }

  public onSendPageNumber(page: number): void {
    this.sendPageNumber.emit(page);
    this.currentPage = page;

    const { itemsPerPage, totalItems } = this.paginationConfig;
    this.isShowPrevious = this.currentPage !== 1;
    this.isShowNext = this.currentPage !==  Math.ceil(totalItems / itemsPerPage);
  }

  public openList(pagination: PaginationControlsDirective, { label, value }: IPaginationPage): void {
    if (label === NEXT_NAVIGATION_LABEL) {
      this.isOpenList = true;
      this.currentPage = value;
      this.isFirstListButton = pagination.getCurrent() > value;
      this.pages = this.getPages();
    } else {
      pagination.setCurrent(value);
    }
  }

  public onCloseList(isOpen: boolean): void {
    this.isOpenList = isOpen;
  }

  public goToPage(pagination: PaginationControlsDirective, page: number): void {
    pagination.setCurrent(page);
    this.isOpenList = !this.isOpenList;
  }

  public showList({ label, value }: IPaginationPage): boolean {
    return this.isOpenList
      && label === NEXT_NAVIGATION_LABEL
      && value === this.currentPage;
  }

  public onItemsCount({ name }: ICommonOption): void {
    this.sendItemsCount.emit(name);
    this.selectFormControl.setValue(name);
  }

  private getPages(): number[] {
    const { itemsPerPage, totalItems } = this.paginationConfig;
    const pagesQuantity = Math.ceil(totalItems / itemsPerPage) - this.currentPage;

    const pages = [];

    if (this.isFirstListButton) {
      // tslint:disable-next-line:no-increment-decrement
      for (let i = 2; i <= this.currentPage; i++) {
        pages.push(i);
      }
    } else {
      // tslint:disable-next-line:no-increment-decrement
      for (let i = 0; i < pagesQuantity; i++) {
        pages.push(this.currentPage + i);
      }
    }

    return pages;
  }
}
