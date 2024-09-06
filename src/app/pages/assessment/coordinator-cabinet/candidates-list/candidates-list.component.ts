import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ICandidate } from '@interfaces/candidate';
import { map, switchMap } from 'rxjs/operators';
import { iif, of, timer } from 'rxjs';
import { INITIAL_DELAY } from '@andkit/components/other/loader/loader';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AssessmentTabs } from '../coordinator-cabinet';
import { ICommonOption } from '@interfaces/filter';
import { CandidatesService } from '@services/assessments/candidates.service';

import filtersSwitcherSvg from '!!raw-loader!./icons/filters-switcher.svg';

@Component({
  selector: 'andteam-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidatesListComponent implements OnInit {
  @Input() sidebarCandidates: ICandidate[];
  @Input() allCandidates: ICandidate[];
  @Input() technologies: string[];
  @Input() resourceManagers: string[];
  @Input() interviewers: string[];
  @Input() activeTab: string;
  @Input() activeCandidateIndex: number;
  @Input() employeeForm: FormControl;
  @Input() activeDate: string;
  @Input() searchField: string;

  @Output() candidateId = new EventEmitter<string>();
  @Output() showCandidateDetails = new EventEmitter<string>();
  @Output() filterCandidates = new EventEmitter<Params>();
  @Output() setActiveCandidateIndex = new EventEmitter<number>();
  @Output() setSearchField = new EventEmitter<string>();

  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;

  filtersSwitcherIcon: SafeHtml;
  isFilterActive = false;
  isCandidateListComponent = true;
  isOptionSelected = false;
  employeePlaceholder = 'Select an employee';
  isAssessment = true;
  chips: string[];
  employees: ICommonOption[];
  isShowChips = false;

  constructor(private sanitizer: DomSanitizer,
              private changeDetectorRef: ChangeDetectorRef,
              private router: Router,
              private candidatesService: CandidatesService,
              private route: ActivatedRoute) { }

  public ngOnInit(): void {
    const params = this.getQueryParams();

    if (Object.keys(params).length) {
      this.isShowChips = true;
    }

    this.chips = this.getChips(params);
    this.filtersSwitcherIcon = this.sanitizer.bypassSecurityTrustHtml(filtersSwitcherSvg as any);
    this.employeeForm.valueChanges
      .pipe(
        switchMap(value => iif(
          () => value.length >= 1,
          timer(INITIAL_DELAY)
            .pipe(
              map(() => this.getEmployees(value))
            ),
          of([]))
        )
      )
      .subscribe(
        (employees:ICommonOption[] | null) => {
          this.employees = employees?.filter(employee => !employee.disabled);
          this.resetQueryParams();
          this.changeDetectorRef.markForCheck();
        }
      );

    this.candidatesService.clearFilters()
      .subscribe(
        () => {
          this.chips = [];
        }
      );
  }

  public onKeyup(): void {
    this.isShowChips = false;

    if (this.activeTab === AssessmentTabs.ready) {
      const queryParams = this.getQueryParams();

      this.filterCandidates.emit(queryParams);
    } else {
      this.sidebarCandidates = this.allCandidates;
    }
  }

  public onOpenFilter(): void {
    this.isFilterActive = !this.isFilterActive;
  }

  public onCloseFilter($event: boolean): void {
    if (!this.isOptionSelected) {
      this.isFilterActive = $event;
    }

    this.isOptionSelected = false;
  }

  public onSelectFilterOption(event: boolean): void {
    this.isOptionSelected = event;
  }

  public onClearField(): void {
    this.isOptionSelected = true;
    this.isShowChips = false;
    this.setQueryParams({});
  }

  public onFilter(params: Params): void {
    this.clearSearchField();
    this.chips = this.getChips(params);
    this.isShowChips = true;
    this.isFilterActive = false;
    this.setQueryParams(params);

    this.filterCandidates.emit(params);
  }

  public onSelectOption({ name }: ICommonOption): void {
    const activeCandidateIndex = this.sidebarCandidates.findIndex(candidate => candidate.employee.name === name);

    this.triggerCandidateDetails(activeCandidateIndex);
    this.viewPort.scrollToIndex(activeCandidateIndex, 'smooth');
    this.setSearchField.emit(name);
  }

  public onClearSearchField(): void {
    this.setSearchField.emit('');
  }

  public onBlurField(value: string): void {
    if (value) {
      this.employeeForm.setValue(this.searchField);
    }
  }

  public onShowCandidateDetails(id: string, index: number): void {
    const { value } = this.employeeForm;

    if (value) {
      this.employeeForm.setValue('');
    }

    this.setActiveCandidateIndex.emit(index);
    this.showCandidateDetails.emit(id);
    this.employeeForm.setValue('');
    this.searchField = '';
  }

  public onRemove(chip: string): void {
    const params = this.getQueryParams();
    const mappedParams = Object
      .keys(params)
      .reduce((result, param) => {
        if (params[param] === chip) {
          return result;
        }

        result[param] = params[param];

        return result;
      },      {});

    this.onFilter(mappedParams);
  }

  private clearSearchField(): void {
    const { value } = this.employeeForm;

    if (value) {
      this.employeeForm.setValue('');
    }
  }

  private getQueryParams(): Params {
    return this.route.snapshot.queryParams;
  }

  private resetQueryParams(): void {
    const { date } = this.getQueryParams();
    const params = this.activeTab === AssessmentTabs.ready
      ? { date }
      : {};

    this.setQueryParams(params);
  }

  private getChips(params: Params): string[] {
    return Object.keys(params)
      .filter(param => param !== 'date')
      .map(param => params[param]);
  }

  private setQueryParams(queryParams: Params): void {
    this.router.navigate([`/assessment/${this.activeTab}`], { queryParams, replaceUrl: true });
  }

  private triggerCandidateDetails(index: number): void {
    const id = this.sidebarCandidates.length
      ? this.sidebarCandidates[index].id
      : null;

    this.showCandidateDetails.emit(id);
    this.setActiveCandidateIndex.emit(index);
  }

  private getEmployees(value: string): ICommonOption[] {
    const sidebarCandidates = this.activeTab === AssessmentTabs.ready
      ? this.sidebarCandidates
      : this.allCandidates;
    const mappedEmployees = sidebarCandidates
      .filter((candidate) => {
        const name = candidate.employee.name.slice(0, value.length);

        return name.toLowerCase() === value.toLowerCase();
      })
      .map((candidate, index) => ({ id: String(index), name: candidate.employee.name, disabled: !candidate.employee.isWork }));

    return mappedEmployees.length
      ? mappedEmployees
      : null;
  }
}
