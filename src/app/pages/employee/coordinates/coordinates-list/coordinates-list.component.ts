import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { ILabel } from '@interfaces/label';
import { RISKS_OF_LEAVING } from '@pages/employee/one-to-one/one-to-one-const';
import { EMPLOYEE_ROUTE_NAME, ONE_TO_ONE } from '@constants/routes-name';
import { Router } from '@angular/router';
import { ICoordinates, ICoordinatesAllocations, ISuperiorRmSubordinate } from '@interfaces/coordinates';
import { ProjectEmployeeListModalComponent } from '@pages/employee/project-employee-list-modal/project-employee-list-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '@services/project.service';
import { map, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IProjectRowDetails } from '@interfaces/project.interface';
import {
  COORDINATES_FILTER,
  CoordinatesTitleList,
  LIST_RISK_OF_LEAVING,
  NONE,
  COLUMN_NAME, activeIconNames, sortedColumnsNames, COORDINATES_LIST_LENGTH
} from '@pages/employee/coordinates/coordinates.const';
import { IOption } from '@interfaces/filter';
import { CoordinatesService } from '@services/coordinates.service';
import { assessmentSort, levelSort, languageSort, oneToOneSort } from '@utils/sorting-functions';

import arrowUpSvg from '!!raw-loader!@assets/images/arrow-up.svg';
import arrowDownSvg from '!!raw-loader!@assets/images/arrow-down.svg';

@Component({
  selector: 'andteam-coordinates-list',
  templateUrl: './coordinates-list.component.html',
  styleUrls: ['./coordinates-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoordinatesListComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input() public dataSource: ICoordinates[] = [];
  @Input() public rmList: ISuperiorRmSubordinate[];
  @Input() public employeeId: string;
  @Input() public columnsList: IOption[];

  @Output() public selectedId = new EventEmitter<string|void>();

  public dataSource$ = new BehaviorSubject<ICoordinates[]>(null);
  public titleList = CoordinatesTitleList;
  public coordinatesList: ICoordinates[];
  public employeeList: IOption[];
  public technologyList: IOption[];
  public riskOfLeavingList: IOption[];
  public locationList: IOption[];
  public projectList: IOption[];
  public options$: Observable<IOption[]>;
  public activeIconName = activeIconNames;
  public sortedColumn = sortedColumnsNames;
  public coordinatesListLength = COORDINATES_LIST_LENGTH;
  public isOptionCleared = false;
  public today = new Date(Date.now()).setHours(0, 0, 0, 0);
  public activeIcon = {
    levelIcon: false,
    languageIcon: false,
    assessmentIcon: false,
    oneToOneIcon: true
  };

  private destroy$ = new Subject();
  private technologySelectedOption: string;
  private riskSelectedOption: string;
  private locationSelectedOption: string;
  private nameSelectedOption: string;
  private projectSelectedOption: string;
  private none = NONE;
  private sortedColumns = {
    levelSortOrder: false,
    languageSortOrder: false,
    assessmentSortOrder: false,
    oneToOneSortOrder: true
  };
  private columnSort = {
    levelSortOrder: levelSort,
    languageSortOrder: languageSort,
    assessmentSortOrder: assessmentSort,
    oneToOneSortOrder: oneToOneSort
  };

  public get displayedColumnsList(): string[] {
    return [COLUMN_NAME.id, ...this.columnsList
      .filter(column => column.checked)
      .map((column: IOption) => column.id.toString())];
  }

  get levelIcon(): string {
    return this.sortedColumns.levelSortOrder ? arrowDownSvg : arrowUpSvg;
  }

  get languageIcon(): string {
    return this.sortedColumns.languageSortOrder ? arrowDownSvg : arrowUpSvg;
  }

  get assessmentIcon(): string {
    return this.sortedColumns.assessmentSortOrder ? arrowDownSvg : arrowUpSvg;
  }

  get oneToOneIcon(): string {
    return this.sortedColumns.oneToOneSortOrder ? arrowDownSvg : arrowUpSvg;
  }

  constructor(
    private router: Router,
    private modalWindow: MatDialog,
    private projectService: ProjectService,
    private coordinatesService: CoordinatesService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource'] && changes['dataSource'].currentValue) {
      this.setDefaultCoordinatesList();
    }
  }

  public ngOnInit(): void {
    this.dataSource$.next(this.dataSource);
    this.getRmSubordinatesList(this.employeeId);
  }

  public ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getLabel(riskOfLeaving: string): ILabel {
    return RISKS_OF_LEAVING[riskOfLeaving];
  }

  public goToOneToOnePage(employeeId: string): void {
    this.router.navigate([`${EMPLOYEE_ROUTE_NAME}/${employeeId}${ONE_TO_ONE}`]);
  }

  public getCoordinateLang(langShortName: string, langLevel: string): string {
    return `${langShortName}/${langLevel}`;
  }

  public getCoordinateProject(project: ICoordinatesAllocations): string {
    return `${ project.projectName } (${ project.allocationType }) / ${ project.allocationHours }h`;
  }

  public getRmSubordinatesList(employeeId: string): void {
    this.options$ = this.coordinatesService.getRmSubordinatesList$(employeeId)
      .pipe(
        map((res: ISuperiorRmSubordinate[]) => res.map(({ id, name, hasWardEmployees }) => ({
          id, name, disabled: !hasWardEmployees
        })))
      );
  }

  public onShowProjectTeam(projectId: string): void {
    this.projectService.getProject(projectId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(({ name, employees }: IProjectRowDetails) => {
      this.modalWindow.open(ProjectEmployeeListModalComponent, {
        data: {
          title: `Project "${name}" team`,
          employeeList: employees
        }
      });
    });
  }

  public setRmOptions({ id }: IOption): void {
    this.isOptionCleared = !this.isOptionCleared;
    this.resetActiveIcon();
    this.activeIcon.oneToOneIcon = true;
    this.coordinatesService.getCoordinatesList$(id as string)
      .pipe(
        takeUntil(this.destroy$)
      )
        .subscribe(
          (value: ICoordinates[]) => {
            this.dataSource$.next(value);
            this.setDefaultCoordinatesList();
            this.cdr.detectChanges();
          }
        );
  }

  public resetRmOptions(): void {
    this.isOptionCleared = !this.isOptionCleared;
    this.resetActiveIcon();
    this.activeIcon.oneToOneIcon = true;
    this.dataSource$.next(this.dataSource);
  }

  public selectNameOption({ name }: IOption): void {
    this.nameSelectedOption = name;
    this.setDefaultCoordinatesList();
  }

  public selectProjectOption({ name }: IOption): void {
    this.projectSelectedOption = name;
    this.setDefaultCoordinatesList();
  }

  public selectTechnology({ name }: IOption): void {
    this.technologySelectedOption = name;
    this.setDefaultCoordinatesList();
  }

  public selectRiskOfLeaving({ name }: IOption): void {
    this.riskSelectedOption = name;
    this.setDefaultCoordinatesList();
  }

  public selectLocation({ name }: IOption): void {
    this.locationSelectedOption = name;
    this.setDefaultCoordinatesList();
  }

  public resetNameOption(): void {
    this.nameSelectedOption = '';
    this.setDefaultCoordinatesList();
  }

  public resetProjectOption(): void {
    this.projectSelectedOption = '';
    this.setDefaultCoordinatesList();
  }

  public resetTechnologyOption(): void {
    this.technologySelectedOption = '';
    this.setDefaultCoordinatesList();
  }

  public resetRiskOfLeavingOption(): void {
    this.riskSelectedOption = '';
    this.setDefaultCoordinatesList();
  }

  public locationOption(): void {
    this.locationSelectedOption = '';
    this.setDefaultCoordinatesList();
  }

  public onSort(activeIcon: string, sortedColumn: string): void {
    this.sortedColumns[sortedColumn] = !this.sortedColumns[sortedColumn];
    this.resetActiveIcon();
    this.activeIcon[activeIcon] = true;
    this.dataSource$.next(this.columnSort[sortedColumn](this.dataSource$.value, this.sortedColumns[sortedColumn]));
    this.setDefaultCoordinatesList();
  }

  public getMSec(text: string): number {
    return Date.parse(text);
  }

  public scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private setDefaultCoordinatesList(): void {
    if (this.dataSource$.value) {
      this.coordinatesList = this.dataSource$.value.map((coordinate: ICoordinates) => {
        if (!coordinate.lastOneToOne) {
          return {
            ...coordinate,
            lastOneToOne: {
              riskOfLeaving: this.none,
              interviewDate: null
            }
          };
        }

        return coordinate;
      });
    }

    if (this.nameSelectedOption) {
      this.coordinatesList = this.coordinatesList
        .filter(coordinate => coordinate.name === this.nameSelectedOption);
    }

    if (this.projectSelectedOption) {
      this.coordinatesList = this.projectSelectedOption === this.none
        ? this.coordinatesList.filter((coordinate: ICoordinates) => !coordinate.allocations.length)
        : this.coordinatesList = this.coordinatesList
          .filter((coordinate: ICoordinates) => coordinate.allocations
            .some(project => project.projectName === this.projectSelectedOption));
    }

    if (this.technologySelectedOption) {
      this.coordinatesList = this.coordinatesList
        .filter((coordinate: ICoordinates) => {
          if (coordinate.technology) {
            return coordinate.technology === this.technologySelectedOption;
          }

          return this.technologySelectedOption === NONE;
        });
    }

    if (this.riskSelectedOption) {
      this.coordinatesList = this.coordinatesList
        .filter((coordinate: ICoordinates) => coordinate.lastOneToOne.riskOfLeaving === this.riskSelectedOption);
    }

    if (this.locationSelectedOption) {
      this.coordinatesList = this.coordinatesList
        .filter((coordinate: ICoordinates) => {
          if (coordinate.location) {
            return coordinate.location === this.locationSelectedOption;
          }

          return true;
        });
    }

    this.employeeList = this.getOptions(COORDINATES_FILTER.NAME);
    this.technologyList = this.getOptions(COORDINATES_FILTER.TECHNOLOGY);
    this.locationList = this.getOptions(COORDINATES_FILTER.LOCATION);

    if (this.coordinatesList) {
      this.riskOfLeavingList = LIST_RISK_OF_LEAVING
        .filter(risk => this.coordinatesList
          .some(coordinate => coordinate.lastOneToOne.riskOfLeaving === risk.name));
    }

    this.projectList = this.getOptionsProjectsList();
  }

  private getOptions(name: string): IOption[] {
    let optionNames: string[] = [];

    if (this.coordinatesList) {
      this.coordinatesList
        .forEach((coordinates: ICoordinates) => {
          if (coordinates[name]) {
            optionNames.push(coordinates[name]);
          } else {
            optionNames.unshift(this.none);
          }
        });
    }

    optionNames = optionNames.some(name => name === this.none)
      ? [optionNames[0], ...optionNames.slice(1).sort()]
      : optionNames.sort();

    return Array.from(new Set(optionNames))
      .map((value: string) => ({
        id: '',
        name: value,
      }));
  }

  private getOptionsProjectsList(): IOption[] {
    let projectList: string[] = [];

    if (this.coordinatesList) {
      this.coordinatesList
        .forEach((coordinates: ICoordinates) => {
          if (coordinates.allocations.length) {
            coordinates.allocations
              .forEach(coordinate => projectList
                .push(coordinate.projectName));
          } else {
            projectList.unshift(this.none);
          }
        });
    }

    projectList = projectList.some(name => name === this.none)
      ? [projectList[0], ...projectList.slice(1).sort()]
      : projectList.sort();

    return Array.from(new Set(projectList))
      .map((value: string) => ({
        id: '',
        name: value,
      }));
  }

  private resetActiveIcon(): void {
    this.activeIcon.oneToOneIcon = false;
    this.activeIcon.assessmentIcon = false;
    this.activeIcon.languageIcon = false;
    this.activeIcon.levelIcon = false;
  }
}
