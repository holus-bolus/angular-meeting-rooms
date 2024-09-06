import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit, ViewChild
} from '@angular/core';
import { SubmittedOvertime, submittedOvertimes } from '@pages/overs-test/submitted-overtime';
import { tableHeaders } from './table-headers';
import { FormControl } from '@angular/forms';
import {
  SubmittedOvertimesSearchForm
} from '@pages/overs-test/utils/submitted-overtimes-search-form';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import {
  IOvertimeSubmittedItem,
  IOvertimeSubmittedList,
  OVERTIME_PERIODS,
  OverTypeGroup
} from '@pages/overs-test/overs';

import arrowUpSvg from '!!raw-loader!@assets/images/arrow-up.svg';
import arrowDownSvg from '!!raw-loader!@assets/images/arrow-down.svg';
import { OversService } from '@pages/overs-test/overs.service';
import { MatTable } from '@angular/material/table';
import noDataSvg from '!!raw-loader!src/assets/images/no-data.svg';
import { ICommonOption } from '../../../interfaces/filter';

@Component({
  selector: 'andteam-submitted-overtimes-table',
  templateUrl: './submitted-overtimes-table.component.html',
  styleUrls: ['./submitted-overtimes-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmittedOvertimesTableComponent implements OnInit, OnDestroy {
  @Input() public overTypes: OverTypeGroup[] = [];

  public dataSource: SubmittedOvertime[] = submittedOvertimes;
  public overtimeList: IOvertimeSubmittedList;
  public tableHeaders = tableHeaders;
  public columns = tableHeaders.map(header => header.definition);
  public includeArchived = new FormControl(false);
  public overtimeRadioButtons = OVERTIME_PERIODS;
  public selectedType = 1;
  public isSortedByName = false;
  public isSortedByCreation = false;
  public isSortedByPayment = false;
  public filtredOvers = new BehaviorSubject<IOvertimeSubmittedItem[]>([]);
  public periodTypes: ICommonOption[] = [];
  public typeControl = new FormControl('');
  public currentForm: any;

  readonly arrowUp = arrowUpSvg;
  readonly arrowDown = arrowDownSvg;
  readonly noDataIcon = noDataSvg;

  private destroy$ = new Subject<void>();

  constructor(
    private oversService: OversService,
    private cdr: ChangeDetectorRef,
  ) {}

  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(): void {
    this.getOvertimesList();
    this.subscribeIncludeArchivedChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSortByName(): void {
    if (this.isSortedByName) {
      this.filtredOvers.next(this.filtredOvers.value.sort((a:IOvertimeSubmittedItem, b: IOvertimeSubmittedItem) => b.name.localeCompare(a.name)));
    } else {
      this.filtredOvers.next(this.filtredOvers.value.sort((a:IOvertimeSubmittedItem, b: IOvertimeSubmittedItem) => a.name.localeCompare(b.name)));
    }

    this.isSortedByName = !this.isSortedByName;
    this.table.renderRows();
  }

  public onSortByCreation(): void {
    if (this.isSortedByCreation) {
      this.filtredOvers.next(this.filtredOvers.value.sort((a:IOvertimeSubmittedItem, b: IOvertimeSubmittedItem) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime()));
    } else {
      this.filtredOvers.next(this.filtredOvers.value.sort((a:IOvertimeSubmittedItem, b: IOvertimeSubmittedItem) => new Date(a.createDate).getTime() - new Date(b.createDate).getTime()));
    }

    this.isSortedByCreation = !this.isSortedByCreation;
    this.table.renderRows();
  }

  public onSortByPayment(): void {
    if (this.isSortedByPayment) {
      this.filtredOvers.next(this.filtredOvers.value.sort((a:IOvertimeSubmittedItem, b: IOvertimeSubmittedItem) => new Date(b.payDay).getTime() - new Date(a.payDay).getTime()));
    } else {
      this.filtredOvers.next(this.filtredOvers.value.sort((a:IOvertimeSubmittedItem, b: IOvertimeSubmittedItem) => new Date(a.payDay).getTime() - new Date(b.payDay).getTime()));
    }

    this.isSortedByPayment = !this.isSortedByPayment;
    this.table.renderRows();
  }

  public onSubmitForm(form: SubmittedOvertimesSearchForm): void {
    this.currentForm = form;
    this.setupOverTypes();

    if (form.type) {
      this.filtredOvers.next(this.filtredOvers.value.filter((over:IOvertimeSubmittedItem) => {
        return over.name.toLowerCase().includes(form.type.toLowerCase());
      }));
    }

    if (form.startDate && form.endDate) {
      this.filtredOvers.next(this.filtredOvers.value.filter((over:IOvertimeSubmittedItem) => {

        return new Date(over.createDate).getMonth() >= new Date(form.startDate).getMonth() && new Date(over.createDate).getMonth() <= new Date(form.endDate).getMonth();
      }));
    } else {
      if (form.startDate) {
        this.filtredOvers.next(this.filtredOvers.value.filter((over:IOvertimeSubmittedItem) => {

          return new Date(over.createDate).getMonth() === new Date(form.startDate).getMonth();
        }));
      }

      if (form.endDate) {
        this.filtredOvers.next(this.filtredOvers.value.filter((over:IOvertimeSubmittedItem) => {

          return new Date(over.createDate).getMonth() === new Date(form.endDate).getMonth();
        }));
      }
    }

    if (form.project) {
      this.filtredOvers.next(this.filtredOvers.value.filter((over:IOvertimeSubmittedItem) => {
        return over.projectName?.toLowerCase().includes(form.project.toLowerCase());
      }));
    }
  }

  public onTypeSelect(): void {
    this.setupOverTypes();
    this.onSubmitForm(this.currentForm);
  }

  private getOvertimesList(): void {
    this.oversService.getSubmittedOvers().pipe(
      takeUntil(this.destroy$)
    ).subscribe((overs: IOvertimeSubmittedList) => {
      this.setupTypesSelect(overs);
      this.overtimeList = overs;
      this.filtredOvers.next(this.overtimeList.monthlyOvers);
      this.cdr.detectChanges();
    });
  }

  private subscribeIncludeArchivedChanges(): void {
    this.includeArchived.valueChanges
      .pipe(
        tap((shouldIncludeArchived: boolean) => {

        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private setupOverTypes(): void {
    if (this.typeControl.value === 'Monthly overs') {
      this.filtredOvers.next(this.overtimeList.monthlyOvers);
    }

    if (this.typeControl.value === 'Quarterly overs') {
      this.filtredOvers.next(this.overtimeList.quarterlyOvers);
    }

    if (this.typeControl.value === 'Yearly overs') {
      this.filtredOvers.next(this.overtimeList.annuallyOvers);
    }
  }

  private setupTypesSelect(overs: IOvertimeSubmittedList): void {
    if (overs.monthlyOvers) {
      this.periodTypes.push({
          id: '1',
          name: 'Monthly overs'
      });
    }

    if (overs.quarterlyOvers) {
      this.periodTypes.push({
        id: '2',
        name: 'Quarterly overs'
      });
    }

    if (overs.annuallyOvers) {
      this.periodTypes.push({
        id: '3',
        name: 'Yearly overs'
      });
    }

    this.typeControl.setValue(this.periodTypes[0].name);
  }
}
