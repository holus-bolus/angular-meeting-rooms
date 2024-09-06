import { Component, ChangeDetectionStrategy, Input, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AssessmentTabs } from '../coordinator-cabinet';
import { ICandidatesFilters } from '../../../../interfaces/candidate';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ICommonOption } from '../../../../interfaces/filter';
import { CandidatesService } from '../../../../core/services/assessments/candidates.service';

@Component({
  selector: 'andteam-filters-list',
  templateUrl: './filters-list.component.html',
  styleUrls: ['./filters-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersListComponent implements OnInit {
  @Input() technologies: string[];
  @Input() resourceManagers: string[];
  @Input() interviewers: string[];
  @Input() activeTab: string;

  @Output() filter = new EventEmitter<ICandidatesFilters>();
  @Output() selectOption = new EventEmitter<boolean>();
  @Output() showCandidateDetails = new EventEmitter<string>();
  @Output() clearField = new EventEmitter<void>();

  resourceManagerPlaceholder = 'Select a resource manager';
  technologyPlaceholder = 'Select a technology';
  interviewerPlaceholder = 'Select a interviewer';

  filtersForm: FormGroup;
  assessmentTabs = AssessmentTabs;
  filteredTechnologies: ICommonOption[];
  filteredResourceManagers: ICommonOption[];
  filteredInterviewers: ICommonOption[];
  isOptionSelected = false;
  filters = {
    technology: '',
    resourceManager: '',
    interviewer: '',
  };

  constructor(private formBuilder: FormBuilder,
              private changeDetectorRef: ChangeDetectorRef,
              private route: ActivatedRoute,
              private candidatesService: CandidatesService,
              private router: Router) {}

  public ngOnInit(): void {
    this.initForms();

    this.getData('technology').subscribe(
      (technologies) => {
        this.filteredTechnologies = technologies;
        this.changeDetectorRef.markForCheck();
      }
    );

    this.getData('resourceManager').subscribe(
      (resourceManagers) => {
        this.filteredResourceManagers = resourceManagers;
        this.changeDetectorRef.markForCheck();
      }
    );

    this.getData('interviewer').subscribe(
      (interviewers) => {
        this.filteredInterviewers = interviewers;
        this.changeDetectorRef.markForCheck();
      }
    );

    this.checkParams();
    this.candidatesService.clearFilters()
      .subscribe(
        () => this.onClearFilters()
      );
  }

  public onClearFilters(): void {
    this.filtersForm.reset({
      technology: '',
      resourceManager: '',
      interviewer: '',
    });
    this.router.navigate(['/assessment'], { queryParams: {}, replaceUrl: true });
  }

  public onFilter(): void {
    if (this.isOptionSelected) {
      const filters = this.filtersForm.value;
      const params = Object
        .keys(filters)
        .reduce((data, filter) => {

          if (!filters[filter]) {
            return data;
          }

          data[filter] = filters[filter];

          return data;
        },      {});

      this.filter.emit(params);
    }
  }

  public onSelectOption({ name }: ICommonOption, filterName: string): void {
    this.isOptionSelected = true;
    this.filters[filterName] = name;
    this.selectOption.emit(this.isOptionSelected);
  }

  public onClearField(filterName: string): void {
    this.clearField.emit();
    this.filters[filterName] = '';
  }

  public onBlurField(value: string, filterName: string): void {
    if (value) {
      this.filtersForm.get(filterName).setValue(this.filters[filterName]);
    }
  }

  private initForms(): void {
    this.filtersForm = this.formBuilder.group({
      technology: '',
      resourceManager: '',
      interviewer: '',
    });
    this.clearField.emit();
  }

  private getData(name: string): Observable<ICommonOption[]> {
    return this.filtersForm.get(name).valueChanges
      .pipe(
        map((value) => {
          return value
            ? this.getItems(value, name)
            : [];
        })
      );
  }

  private getItems(value: string, name: string): ICommonOption[] {
    switch (name) {
      case 'technology':
        return this.getFilteredItems(this.technologies, value);
      case 'resourceManager':
        return this.getFilteredItems(this.resourceManagers, value);
      case 'interviewer':
        return this.getFilteredItems(this.interviewers, value);
    }
  }

  private getFilteredItems(items: string[], value: string): ICommonOption[] {
    const mappedItems = items
      .filter((item) => {
        const substringItem = item.slice(0, value.length);

        return substringItem.toLowerCase() === value.toLowerCase();
      })
      .map((item, index) => ({ id: String(index), name: item }));

    return mappedItems.length
      ? mappedItems
      : null;
  }

  private checkParams(): void {
    const params = this.route.snapshot.queryParams;

    if (Object.keys(params).length) {
      const { technology, resourceManager, interviewer } = params;

      this.filtersForm.get('technology').setValue(technology || '');
      this.filtersForm.get('resourceManager').setValue(resourceManager || '');
      this.filtersForm.get('interviewer').setValue(interviewer || '');

      this.filters = {
        technology: technology || '',
        resourceManager: resourceManager || '',
        interviewer: interviewer || ''
      };

      this.isOptionSelected = true;
    }
  }
}
