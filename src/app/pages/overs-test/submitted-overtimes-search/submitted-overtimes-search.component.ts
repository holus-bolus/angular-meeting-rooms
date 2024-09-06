import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import {
  SubmittedOvertimesSearchForm,
} from '@pages/overs-test/utils/submitted-overtimes-search-form';
import { OverTypeGroup } from '@pages/overs-test/overs';
import { COMPONENT_TYPES } from '@constants/types/componentTypes.constants';
import { ICommonOption } from '@interfaces/filter';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { INITIAL_DELAY } from '@andkit/components/other/loader/loader';
import { ProjectService } from '@services/project.service';

@Component({
  selector: 'andteam-submitted-overtimes-search',
  templateUrl: './submitted-overtimes-search.component.html',
  styleUrls: ['./submitted-overtimes-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmittedOvertimesSearchComponent implements OnInit {
  @Input() public overTypes: OverTypeGroup[] = [];

  @Output() public formApplied = new EventEmitter<SubmittedOvertimesSearchForm>();

  public form: FormGroup;
  public buttonType = BUTTON_TYPES;
  public componentsType = COMPONENT_TYPES.PORTAL;
  public buttonsComponentType = COMPONENT_TYPES.OVERTIME;
  public typesList: ICommonOption[] = [];
  public filteredTypes: ICommonOption[] = [];
  public projectOptions$: Observable<ICommonOption[]>;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.setupTypesList();
    this.initializeForm();
    this.getTypeOptions();
    this.projectOptions$ = this.getProjectOptions$();
  }

  public onSubmit(): void {
    if (this.isDataInputExists()) {
      this.formApplied.emit(this.form.value);
    }
  }

  public onReset(): void {
    this.form.reset();
    this.formApplied.emit(this.form.value);
  }

  public isDataInputExists(): boolean {
    return this.form.value.type
      || this.form.value.startDate
      || this.form.value.endDate
      || this.form.value.project;
  }

  public getTypeOptions(): void {
    this.form.controls.type.valueChanges.subscribe(() => {
      this.filteredTypes = this.typesList.filter((type:ICommonOption) => {

        return type.name.toLowerCase().split(' ').find(item => item.indexOf(this.form.controls.type.value?.toLowerCase()) === 0);
      });

    });
  }

  private setupTypesList(): void {
    for (const category of this.overTypes) {
      for (const type of category.overTypeGroups) {
        if (type.overTypes) {
          this.typesList = [...this.typesList, ...type.overTypes];
        } else {
          this.typesList = [...this.typesList, type];
        }
      }
    }
  }

  private getProjectOptions$(): Observable<ICommonOption[]> {
    return this.form.controls.project.valueChanges.pipe(
      debounceTime(INITIAL_DELAY),
      switchMap((projectNameSample: string) => {
        return projectNameSample?.length >= 2
          ? this.projectService.getProjects(
            projectNameSample,
          )
          : of(null);
      })
    );
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      type: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      project: new FormControl(),
    });
  }
}
