import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin, Observable, timer, of, iif, Subject } from 'rxjs';
import { switchMap, map, takeUntil } from 'rxjs/operators';
import { IEmployeeFilter } from '@interfaces/employee';
import { LocationService } from '@services/location.service';
import { ICommonOption } from '@interfaces/filter';
import { ResourceManagerService } from '@services/resourceManagers.service';
import { ProjectService } from '@services/project.service';
import { COMPONENT_TYPES } from '@constants/types/componentTypes.constants';
import { INITIAL_DELAY } from '@andkit/components/other/loader/loader';
import { EmployeeService } from '@services/employee.service';
import { TechnologyService } from '@services/technology.service';

@Component({
  selector: 'andteam-employees-list-filter',
  templateUrl: './employees-list-filter.component.html',
  styleUrls: ['./employees-list-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesListFilterComponent implements OnInit, OnDestroy {
  @Input() public params: IEmployeeFilter;
  @Input() public isAdmin$: Observable<boolean>;

  @Output() public sendFilters = new EventEmitter<any>();

  public filtersForm: FormGroup;
  public roles: ICommonOption[] = [];
  public userRoles: ICommonOption[] = [];
  public technologies: ICommonOption[] = [];
  public resourceManagers: ICommonOption[] = [];
  public locations: ICommonOption[] = [];
  public projects: ICommonOption[] = [];
  public fullNames: ICommonOption[] = [];
  public destroy$ = new Subject();
  public componentsType = COMPONENT_TYPES.EMPLOYEE_LIST;

  constructor(
    private employeeService: EmployeeService,
    private locationService: LocationService,
    private technologyService: TechnologyService,
    private resourceManagerService: ResourceManagerService,
    private projectService: ProjectService,
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.initForm();

    forkJoin([
      this.employeeService.getRoles(),
      this.technologyService.getTechnologies(),
      this.locationService.getLocations(),
      this.resourceManagerService.getResourceManagers(),
      this.employeeService.getUserRoles$(),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        ([roles, technologies, locations, resourceManagers, userRoles]) => {
          const mappedRoles = roles.map((role, index) => {
            return {
              id: role,
              name: role,
            };
          });

          const mappedUserRoles = userRoles.map(({ text, value: id }) => ({ id, name: text }));

          const formData = {
            ...this.params,
            technologies: this.findItems(technologies, this.params.technologies, 'name'),
            roles: this.findItems(mappedRoles, this.params.roles, 'name'),
            locations: this.findItems(locations, this.params.locations, 'name'),
            resourceManagers: this.findItems(resourceManagers, this.params.resourceManagers, 'id'),
            userRoles: this.findItems(mappedUserRoles, this.params.userRoles, 'name'),
          };

          this.filtersForm.patchValue(formData);

          this.roles = this.addCheckedProperty(mappedRoles, 'roles');
          this.technologies = this.addCheckedProperty(technologies, 'technologies');
          this.locations = this.addCheckedProperty(locations, 'locations');
          this.resourceManagers = this.addCheckedProperty(resourceManagers, 'locations');
          this.userRoles = this.addCheckedProperty(mappedUserRoles, 'userRoles');

          this.changeDetectorRef.markForCheck();
        }
      );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public initForm(): void {
    this.filtersForm = this.formBuilder.group({
      project: [''],
      surname: [''],
      resourceManagers: [[]],
      technologies: [[]],
      locations: [[]],
      roles: [[]],
      userRoles: [[]],
    });

    this.getData('surname', this.employeeService.getEmployeeFullNames)
      .pipe(
        map(employees => !!employees
          ? employees.map(employee => employee.name)
          : employees),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (fullNames: ICommonOption[]) => {
          this.fullNames = fullNames;
          this.changeDetectorRef.markForCheck();
        }
      );

    this.getData('project', this.projectService.getProjectsNames)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        (projects) => {
          this.projects = projects;
          this.changeDetectorRef.markForCheck();
        }
      );
  }

  public onSelectOption({ name }: ICommonOption, controlName: string): void {
    this.filtersForm.get(controlName).setValue(name);
  }

  public onSendFilters(): void {
    const data = this.mapDataForServer();

    this.sendFilters.emit(data);
  }

  public onResetFilters(): void {
    this.filtersForm.reset({
      project: '',
      surname: '',
      resourceManagers: [],
      technologies: [],
      locations: [],
      roles: [],
      userRoles: [],
    });

    this.resourceManagers = this.resetCheckedProperty(this.resourceManagers);
    this.technologies = this.resetCheckedProperty(this.technologies);
    this.locations = this.resetCheckedProperty(this.locations);
    this.roles = this.resetCheckedProperty(this.roles);
    this.userRoles = this.resetCheckedProperty(this.userRoles);

    this.onSendFilters();
  }

  public onCheckOption(option: ICommonOption, controlName: string): void {
    let values = [];

    switch (controlName) {
      case 'resourceManagers':
        this.resourceManagers = this.getCheckedData(this.resourceManagers, option);

        values = this.getFormData(this.resourceManagers);
        break;
      case 'technologies':
        this.technologies = this.getCheckedData(this.technologies, option);

        values = this.getFormData(this.technologies);
        break;
      case 'locations':
        this.locations = this.getCheckedData(this.locations, option);

        values = this.getFormData(this.locations);
        break;
      case 'roles':
        this.roles = this.getCheckedData(this.roles, option);

        values = this.getFormData(this.roles);
        break;
      case 'userRoles':
        this.userRoles = this.getCheckedData(this.userRoles, option);

        values = this.getFormData(this.userRoles);
        break;
    }

    this.filtersForm.get(controlName).setValue(values);
  }

  private getData(name: string, getDataFunction: (arg: any) => Observable<string[] | ICommonOption[]>): Observable<ICommonOption[]> {
    return this.filtersForm.get(name).valueChanges
      .pipe(
        switchMap(value => iif(
          () => value.length >= 3,
          timer(INITIAL_DELAY)
            .pipe(
              switchMap(() => getDataFunction.call(this.employeeService, value)),
              map((response: string[]) => response.length
                ? this.createSuggestions(response)
                : null)
            ),
          of([]))
        )
      );
  }

  private resetCheckedProperty(items: ICommonOption[]): ICommonOption[] {
    return items.map((item) => {
      return { ...item, checked: false };
    });
  }

  private addCheckedProperty(items: ICommonOption[], paramName: string): ICommonOption[] {
    return items.map((item) => {
      return {
        ...item,
        checked: !!this.filtersForm.value[paramName].includes(item)
      };
    });
  }

  private getCheckedData(items: ICommonOption[], option: ICommonOption): ICommonOption[] {
    return items.map((item) => {
      return item.id === option.id
        ? { ...item, checked: !item.checked }
        : item;
    });
  }

  private getFormData(items: ICommonOption[]): ICommonOption[] {
    return items.reduce((data, item) => {
      if (item.checked) {
        data.push({ id: item.id, name: item.name });
      }

      return data;
    },                  []);
  }

  private findItems(items: ICommonOption[], params: string, property: string): ICommonOption[] {
    if (params) {
      const splittedParams = params.split(',');

      return items.filter(item => splittedParams.includes(item[property]));
    }

    return [];
  }

  private createSuggestions(items: string[]): ICommonOption[] {
    return items.map((item, index) => {
      return {
        id: String(index),
        name: item
      };
    });
  }

  private mapDataForServer(): IEmployeeFilter {
    const params = this.filtersForm.value;

    return Object.keys(params)
      .filter(param => params[param] && params[param].length)
      .reduce((data, param) => {
        const values = params[param];

        if (Array.isArray(values)) {
          data[param] = values.map((item) => {
            return param === 'resourceManagers' || param === 'userRoles'
              ? item.id
              : item.name;
          }).join();
        } else {
          data[param] = values;
        }

        return data;
      },      {});
  }
}
