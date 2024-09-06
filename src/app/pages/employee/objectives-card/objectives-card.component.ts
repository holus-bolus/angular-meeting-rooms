import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, HostListener, ChangeDetectorRef } from '@angular/core';
import { ObjectivesService } from '@services/objectives.service';
import { forkJoin, Observable, Subject } from 'rxjs';
import { EmployeeIdService } from '@services/employee-id.service';
import { IObjective, IUserObjectives } from '@interfaces/objective';
import { finalize, switchMap, takeUntil, filter } from 'rxjs/operators';
import { MaterialInfoBtnConst } from '@andkit/components/buttons/material-info-btn/material-info-btn.const';
import { MatDialog } from '@angular/material/dialog';
import {
  OBJECTIVES_INFO_WINDOW_WIDTH,
  OBJECTIVES_MODAL_WINDOW_WIDTH
} from '@pages/employee/objectives-card/objectives-const';
import {
  ObjectivesActiveInfoModalComponent
} from '@pages/employee/objectives-card/objectives-active-info-modal/objectives-active-info-modal.component';
import {
  ObjectivesArchiveInfoModalComponent
} from '@pages/employee/objectives-card/objectives-archive-info-modal/objectives-archive-info-modal.component';
import dateSvg from '!!raw-loader!@assets/images/date.svg';
import { ObjectivesAddModalComponent } from '@pages/employee/objectives-card/objectives-add-modal/objectives-add-modal.component';
import { UserService } from '@services/user.service';
import { IUserDetails } from '@interfaces/authentication';

@Component({
  selector: 'andteam-objectives-card',
  templateUrl: './objectives-card.component.html',
  styleUrls: ['./objectives-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectivesCardComponent implements OnInit, OnDestroy {
  public objectives: IUserObjectives;
  public openedObjectives: IObjective[];
  public closedObjectives: IObjective[];
  public showScrollButton = false;
  public isShowLoader = false;
  public employeeId: string;
  public interviewerId: string;
  public isToastNotification: boolean;
  public notificationText: string;
  public isRM: boolean;
  public readonly date = dateSvg;
  public readonly yellowColor = MaterialInfoBtnConst.YELLOW;
  public readonly btnText = 'i';

  private readonly destroy$ = new Subject();
  private readonly maxOffsetPrec = 0.2;
  private readonly maxOffsetSize = window.innerHeight * this.maxOffsetPrec;

  constructor(
    private modalWindow: MatDialog,
    private objectivesService: ObjectivesService,
    private employeeIdService: EmployeeIdService,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.employeeId = this.employeeIdService.getEmployeeId();
    this.isShowLoader = true;

    forkJoin([
      this.userService.getUserInfo$(),
      this.getObjectives$()
    ])
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isShowLoader = false)
      )
      .subscribe(([{ externalId }, objectives]: [IUserDetails, IUserObjectives]) => {
        this.interviewerId = externalId;
        this.isRM = objectives.canEdit;
        this.handleResponseObjectives(objectives);
        this.cd.markForCheck();
      });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showScrollButton = window.pageYOffset > this.maxOffsetSize;
  }

  public scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public showActiveObjectivesInfo(): void {
    this.modalWindow.open(ObjectivesActiveInfoModalComponent, {
      width: OBJECTIVES_INFO_WINDOW_WIDTH,
    });
  }

  public showArchiveObjectivesInfo(): void {
    this.modalWindow.open(ObjectivesArchiveInfoModalComponent, {
      width: OBJECTIVES_INFO_WINDOW_WIDTH,
    });
  }

  public addObjective(): void {
    const addNewModal = this.modalWindow.open(ObjectivesAddModalComponent, {
      width: OBJECTIVES_MODAL_WINDOW_WIDTH,
      disableClose: true,
      data: {
        interviewerId: this.interviewerId,
        employeeId: this.employeeId,
        nextAssessmentDate: this.objectives.nextAssessmentDate
      }
    });

    const backdropClick = addNewModal.backdropClick()
      .subscribe(() => addNewModal.componentInstance.onClose());

    addNewModal
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(({ data }: { id?: string; data: IObjective }) => {
          return this.objectivesService.createObjective(data);
        }),
        switchMap(() => this.getObjectives$()),
        finalize(() => this.isShowLoader = false)
      )
      .subscribe((response: IUserObjectives) => {
        backdropClick.unsubscribe();
        this.handleResponseObjectives(response);
        this.notificationText = 'The objective has been added';
        this.isToastNotification = true;
      });
  }

  public updateObjectives(message: string): void {
    this.notificationText = message;

    this.isToastNotification = true;

    this.getObjectives$()
      .pipe(
        finalize(() => this.isShowLoader = false)
      )
      .subscribe((data) => {
        this.handleResponseObjectives(data);
      });
  }

  public onFadeOut(): void {
    this.isToastNotification = false;
  }

  private getObjectives$(): Observable<IUserObjectives> {
    return this.objectivesService.getObjectives$(this.employeeId)
      .pipe(
        takeUntil(this.destroy$)
      );
  }

  private handleResponseObjectives(data: IUserObjectives): void {
    this.openedObjectives = data.currentObjectives;
    this.closedObjectives = data.archivedObjectives;
    this.objectives = data;
    this.cd.markForCheck();
  }
}
