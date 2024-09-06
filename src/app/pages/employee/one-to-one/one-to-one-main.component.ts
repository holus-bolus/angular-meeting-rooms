import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialInfoBtnConst } from '@andkit/components/buttons/material-info-btn/material-info-btn.const';
import { OneToOneInstructionModalComponent }
  from '@pages/employee/one-to-one/one-to-one-instruction-modal/one-to-one-instruction-modal.component';
import { OneToOneService } from '@services/one-to-one.service';
import { Observable, Subject } from 'rxjs';
import { IOneToOne, IOneToOneData, IOneToOnePostData, IOneToOneUpdate } from '@interfaces/one-to-one';
import { EmployeeIdService } from '@services/employee-id.service';
import {
  ACTION_OPTION_ADD,
  ACTION_OPTION_OPEN
} from '@andkit/components/selects/action-selector/action-selector.config';
import { OneToOneViewModalComponent } from '@pages/employee/one-to-one/one-to-one-view-modal/one-to-one-view-modal.component';
import { takeUntil, filter, take, first } from 'rxjs/operators';
import {
  ONE_TO_ONE_INSTRUCTION_MODAL_WINDOW_WIDTH,
  ONE_TO_ONE_MODAL_WINDOW_WIDTH
} from '@pages/employee/one-to-one/one-to-one-const';
import { OneToOneModalComponent } from '@pages/employee/one-to-one/one-to-one-modal/one-to-one-modal.component';
import { EmployeeService } from '@services/employee.service';
import { ICommonOption } from '@interfaces/filter';
import { ReasonOfLeavingService } from '@services/reason-of-leaving.service';
import { isEmpty } from 'lodash';

@Component({
  selector: 'andteam-one-to-one-main',
  templateUrl: './one-to-one-main.component.html',
  styleUrls: ['./one-to-one-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneToOneMainComponent implements OnInit, OnDestroy {

  public yellow = MaterialInfoBtnConst.YELLOW;
  public btnText = 'i';

  public oneToOneList$: Observable<IOneToOne[]>;
  public employeeId: string;
  public isToastNotification: boolean;
  public notificationText: string;
  public userLevel: string;
  public reasonsForLeaving: ICommonOption[];

  private destroy$ = new Subject();

  constructor(
    private modalWindow: MatDialog,
    private oneToOneService: OneToOneService,
    private employeeIdService: EmployeeIdService,
    private cdr: ChangeDetectorRef,
    private employeeService: EmployeeService,
    private reasonOfLeavingService: ReasonOfLeavingService
  ) { }

  public ngOnInit(): void {
    this.employeeId = this.employeeIdService.getEmployeeId();
    this.getOneToOneList();
    this.employeeService.getUserInfo$(this.employeeId)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(({ level }) => {
        this.userLevel = level || '';
      });
    this.getReasonsForLeaving();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getOneToOneList(): void {
    this.oneToOneList$ = this.oneToOneService.getOneToOneList$(this.employeeId);
  }

  public addOneToOne(data: IOneToOnePostData): void {
    this.oneToOneService.addOneToOne(data)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.notificationText = 'One to one has been added';
        this.isToastNotification = true;
        this.getOneToOneList();
        this.cdr.detectChanges();
      });
  }

  public editOneToOne(oneToOneId: string, data: IOneToOnePostData): void {
    if (data.update !== null && !isEmpty(data.update)) {
      data.update.oneToOneId = oneToOneId;
    }

    this.oneToOneService.updateOneToOne(oneToOneId, data)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.notificationText = 'Оne to one has been updated';
        this.isToastNotification = true;
        this.getOneToOneList();
        this.cdr.detectChanges();
      });
  }

  public onAddOneToOne(): void {
    this.modalWindow.open(OneToOneModalComponent, {
      width: ONE_TO_ONE_MODAL_WINDOW_WIDTH,
      disableClose: true,
      data: {
        employeeId: this.employeeId,
        oneToOneActionData: { action: ACTION_OPTION_ADD },
        userSkillLvl: this.userLevel,
        reasonsForLeaving: this.reasonsForLeaving
      }
    })
      .afterClosed()
      .pipe(
        take(1),
        filter(Boolean),
        takeUntil(this.destroy$)
      )
      .subscribe((oneToOneData: IOneToOnePostData) => {
        this.addOneToOne(oneToOneData);
      });
  }

  public onActionWithOneToOne(data: IOneToOneData): void {
    const oneToOneId: string = data.oneToOne.id;

    if (data.oneToOneActionData.action === ACTION_OPTION_OPEN) {
      this.modalWindow.open(OneToOneViewModalComponent, {
        width: ONE_TO_ONE_MODAL_WINDOW_WIDTH,
        height: '600px',
        data: { oneToOne: data.oneToOne }
      })
        .afterClosed()
        .pipe(takeUntil(this.destroy$), take(1))
        .subscribe((updates: IOneToOneUpdate[]) => {
          data.oneToOne.updates = data.oneToOne.updates.concat(updates);
        });

      return;
    }

    this.modalWindow.open(OneToOneModalComponent, {
      width: ONE_TO_ONE_MODAL_WINDOW_WIDTH,
      height: '600px',
      disableClose: true,
      data: {
        oneToOneActionData: data.oneToOneActionData,
        oneToOneStaticData: data.oneToOne,
        employeeId: this.employeeId,
        userSkillLvl: this.userLevel,
        reasonsForLeaving: this.reasonsForLeaving
      }
    })
      .afterClosed()
      .pipe(
        take(1),
        filter(Boolean),
        takeUntil(this.destroy$)
      )
      .subscribe((editedData: IOneToOnePostData) => {
        this.editOneToOne(oneToOneId, editedData);
      });
  }

  public onInfoBtnClick(): void {
    this.modalWindow.open(OneToOneInstructionModalComponent, {
      width: ONE_TO_ONE_INSTRUCTION_MODAL_WINDOW_WIDTH
    });
  }

  public onFadeOut(): void {
    this.isToastNotification = false;
  }

  public getReasonsForLeaving(): void {
    this.reasonOfLeavingService.getReasons()
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => this.reasonsForLeaving = response);
  }
}
