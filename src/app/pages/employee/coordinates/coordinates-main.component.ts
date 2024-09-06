import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { IOption } from '@interfaces/filter';
import { Observable, Subject } from 'rxjs';
import { ICoordinates, ICoordinatesDropList } from '@interfaces/coordinates';
import { CoordinatesService } from '@services/coordinates.service';
import { EmployeeIdService } from '@services/employee-id.service';
import { finalize, switchMap, takeUntil, tap } from 'rxjs/operators';
import { COLUMN_RESOURCE_MANAGER, COORDINATES_COLUMNS } from '@pages/employee/coordinates/coordinates.const';

import gearSvg from '!!raw-loader!@assets/images/gear.svg';
import teamSvg from '!!raw-loader!@assets/images/team.svg';

@Component({
  selector: 'andteam-coordinates-main',
  templateUrl: './coordinates-main.component.html',
  styleUrls: ['./coordinates-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoordinatesMainComponent implements OnInit, OnDestroy {
  public selectIcon = gearSvg;
  public coordinatesIcon = teamSvg;
  public employeeId: string;
  public coordinatesList$: Observable<ICoordinates[]>;
  public coordinatesListLength$: Observable<number>;
  public columnsList: IOption[];
  public isShowLoader = false;

  private destroy$ = new Subject();

  constructor(
    private coordinatesService: CoordinatesService,
    private employeeIdService: EmployeeIdService,
    private cdr: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.employeeId = this.employeeIdService.getEmployeeId();
    this.getCoordinates();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getCoordinates(id: string = this.employeeId): void {
    this.isShowLoader = true;

    this.coordinatesList$ = this.onReceiveColumnList().pipe(
      switchMap(() => this.coordinatesService.getCoordinatesList$(id)),
      finalize(() => this.isShowLoader = false),
      takeUntil(this.destroy$),
    );
  }

  public onChangeColumnsList({ id, checked }: IOption): void {
    this.isShowLoader = true;
    this.initColumnsList(this.coordinatesService.setCoordinatesDropList(id.toString(), checked));
  }

  private onReceiveColumnList(): Observable<ICoordinatesDropList> {
    return this.getInitColumnListParse$(this.coordinatesService.getCoordinatesDropList$());
  }

  private initColumnsList(obs: Observable<ICoordinatesDropList>): void {
    this.getInitColumnListParse$(obs).pipe(
      finalize(() => this.isShowLoader = false),
      takeUntil(this.destroy$)
      ).subscribe(() => {
        this.cdr.detectChanges();
      });
  }

  private getInitColumnListParse$(obs: Observable<ICoordinatesDropList>): Observable<ICoordinatesDropList> {
    return obs.pipe(
      tap((columnsList: ICoordinatesDropList) => {
        this.columnsList = Object.entries(COORDINATES_COLUMNS)
          .filter(([key]) => columnsList.hasOwnProperty(key))
          .map(([key, { id, name }]) => {
            return {
              id,
              name,
              checked: columnsList[key],
              disabled: !columnsList.isEnabledRmColumn && key === COLUMN_RESOURCE_MANAGER.id
            };
          });
      })
    );
  }
}
