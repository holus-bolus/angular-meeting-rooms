import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { LENGTH_OF_ONE_TO_ONE_LIST, ONE_TO_ONE_FILTER } from '@pages/employee/one-to-one/one-to-one-const';
import { IOneToOne } from '@interfaces/one-to-one';
import { sort } from '@utils/sorting-functions';
import { BehaviorSubject } from 'rxjs';
import { IOption } from '@interfaces/filter';
import { LIST_RISK_OF_LEAVING } from '@pages/employee/coordinates/coordinates.const';

import arrowUpSvg from '!!raw-loader!@assets/images/arrow-up.svg';
import arrowDownSvg from '!!raw-loader!@assets/images/arrow-down.svg';

@Component({
  selector: 'andteam-one-to-one-list',
  templateUrl: './one-to-one-list.component.html',
  styleUrls: ['./one-to-one-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneToOneListComponent implements OnInit {
  @Input() public oneToOneList: IOneToOne[];

  @Output() public oneToOneAction = new EventEmitter<{ oneToOneActionData, oneToOne }>();

  public riskOfLeavingList: IOption[];
  public typeOfOneToOne: IOption[];
  public isCenter = false;
  public options$ = new BehaviorSubject<IOption[]>([]);
  public filteredOneToOneList: IOneToOne[] = [];
  public oneToOneListLength = LENGTH_OF_ONE_TO_ONE_LIST;
  public currentDate = new Date(Date.now()).setHours(0);

  private descSortOrder = false;
  private typeSelectedOption: IOption;
  private riskSelectedOption: IOption;
  private reviewerSelectedOption: IOption;

  get icon(): string {
    return this.descSortOrder ? arrowUpSvg : arrowDownSvg;
  }

  public ngOnInit(): void {
    this.setDefaultOneToOneList();
  }

  public onOneToOneAction(oneToOneActionData: { action, id }, oneToOne: IOneToOne): void {
    this.oneToOneAction.emit({ oneToOneActionData, oneToOne });
  }

  public sortChange(): void {
    this.descSortOrder = !this.descSortOrder;
    this.filteredOneToOneList = sort(this.filteredOneToOneList, this.descSortOrder);
    this.oneToOneList = sort(this.oneToOneList, this.descSortOrder);
  }

  public selectReviewerOption(event: IOption): void {
    this.reviewerSelectedOption = event;
    this.setDefaultOneToOneList();
  }

  public resetInterviewerOption(): void {
    this.reviewerSelectedOption = null;
    this.setDefaultOneToOneList();
  }

  public selectTypeOption(event: IOption): void {
    this.typeSelectedOption = event;
    this.setDefaultOneToOneList();
  }

  public selectRiskOption(event: IOption): void {
    this.riskSelectedOption = event;
    this.setDefaultOneToOneList();
  }

  public resetRiskOption(): void {
    this.riskSelectedOption = null;
    this.setDefaultOneToOneList();
  }

  public resetTypeOption(): void {
    this.typeSelectedOption = null;
    this.setDefaultOneToOneList();
  }

  public scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private setDefaultOneToOneList(): void {
    this.filteredOneToOneList = this.oneToOneList;

    if (this.reviewerSelectedOption) {
      this.filteredOneToOneList = this.filteredOneToOneList
        .filter((value: IOneToOne) => value.interviewer.name === this.reviewerSelectedOption.name);
    }

    if (this.riskSelectedOption) {
      this.filteredOneToOneList = this.filteredOneToOneList
        .filter((value: IOneToOne) => value.riskOfLeaving === this.riskSelectedOption.name);
    }

    if (this.typeSelectedOption) {
      this.filteredOneToOneList = this.filteredOneToOneList
        .filter((value: IOneToOne) => value.type === this.typeSelectedOption.name);
    }

    this.setInterviewerOptions(this.filteredOneToOneList);
    this.typeOfOneToOne = this.getOptions(ONE_TO_ONE_FILTER.TYPE);
    this.riskOfLeavingList = LIST_RISK_OF_LEAVING
      .filter(risk => this.filteredOneToOneList
        .some((oneToOne: IOneToOne) => oneToOne.riskOfLeaving === risk.name));
  }

  private getOptions(name: string): IOption[] {
    return Array.from(new Set(this.filteredOneToOneList
            .map((oneToOne: IOneToOne) => oneToOne[name])
            .sort()))
          .map((value: string) => ({
            id: '',
            name: value,
          }));
  }

  private setInterviewerOptions(list: IOneToOne[]): void {
    const oneToOneInterviewers = list.map((item: IOneToOne) => ({ id: item.interviewer.id, name: item.interviewer.name }));
    const unsortedOptions = Object.values(
      oneToOneInterviewers.reduce(
        (acc: IOption, cur: IOption) => Object.assign(acc, { [cur.id]: cur }), {} as IOption
      )
    );

    this.options$.next(unsortedOptions.sort((a: IOption, b: IOption) => a.name > b.name ? 1 : -1));
  }
}
