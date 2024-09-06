import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  VACATIONS_TEXT,
} from '@pages/employee/planned-vacations/planned-vacations.const';
import { EmployeeIdService } from '@services/employee-id.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICommonOption } from '@interfaces/filter';
import { VacationService } from '@services/vacation.service';
import { IVacationInfo } from '@interfaces/vacation';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { touchValidateDeep } from '@pages/assessment/coordinator-cabinet/coordinator-cabinet';
import { EmployeeService } from '@services/employee.service';
import { IUserInfo } from '@interfaces/userInfo.interface';
import { ComponentCanDeactivate } from '@guards/pending-changes.guard';
import { UserService } from '@services/user.service';
import { IUserDetails } from '@interfaces/authentication';
import { CompanyService } from '@services/company.service';

import dateSvg from '!!raw-loader!src/assets/images/date.svg';
import noDataSvg from '!!raw-loader!src/assets/images/no-data.svg';

@Component({
  selector: 'andteam-vacation-main',
  templateUrl: './planned-vacations-main.component.html',
  styleUrls: ['./planned-vacations-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannedVacationsMainComponent implements OnInit, OnDestroy, ComponentCanDeactivate {
  public dateSvg: SafeHtml;
  public btnText = 'i';
  public employeeId: string;
  public employeeName: string;
  public noDataIcon = noDataSvg;
  public vacationsInfo: IVacationInfo;
  public isToastNotification: boolean;
  public notificationText: string;
  public currentForm = new FormGroup({});
  public vacationFirstMonthControl: FormControl;
  public vacationSecondMonthControl: FormControl;
  public firstMonth: ICommonOption;
  public secondMonth: ICommonOption;
  public isMonthsChosen = new BehaviorSubject<boolean>(false);
  public vacationText = VACATIONS_TEXT;
  public firstMonthOptions: ICommonOption[];
  public secondMonthOptions: ICommonOption[];
  public isButtonActive = new BehaviorSubject<boolean>(true);
  public userInfo: IUserDetails;
  public vacationWikiLink = '';
  public vacationDeadlineDate: string;

  private destroy$ = new Subject();

  constructor(
    private userInfoService: UserService,
    private sanitizer: DomSanitizer,
    private employeeIdService: EmployeeIdService,
    private vacationService: VacationService,
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef,
    private companyService: CompanyService,
  ) { }


  canDeactivate(): Observable<boolean> | boolean {
    return this.vacationsInfo.canCreate ? !this.isButtonActive.value : false;
  }

  public ngOnInit(): void {
    this.vacationWikiLink = this.companyService.companyResourcesUrls.Vacation;
    this.vacationDeadlineDate = this.companyService.vacationDeadlineDate;
    this.employeeId = this.employeeIdService.getEmployeeId();
    this.setupEmployeeName();
    this.getVacationInfo(this.employeeId);
    this.dateSvg = this.sanitizer.bypassSecurityTrustHtml(dateSvg);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getVacationInfo(employeeId: string): void {
    this.vacationService.getVacationInfo$(employeeId)
      .pipe(
        takeUntil(this.destroy$),
      ).subscribe((vacationInfo: IVacationInfo) => {
        this.vacationsInfo = vacationInfo;
        this.setupMonths(vacationInfo);
        this.setupControls();
        this.updateButtonActivity();
        this.cdr.detectChanges();
      });
  }

  public updateButtonActivity(): void {
    if (this.vacationsInfo.vacation) {
      this.isMonthsChosen.next(true);
      this.isButtonActive.next(false);
    }
  }

  public setupControls(): void {
    this.vacationFirstMonthControl = new FormControl(this.vacationsInfo.vacation?.firstMonth || null, Validators.required);
    this.vacationSecondMonthControl = new FormControl(this.vacationsInfo.vacation?.secondMonth || null, Validators.required);
    this.currentForm.addControl('firstMonth', this.vacationFirstMonthControl);
    this.currentForm.addControl('secondMonth', this.vacationSecondMonthControl);
  }

  public setupEmployeeName(): void {
    this.employeeService.getUserInfo$(this.employeeId)
      .pipe(
        takeUntil(this.destroy$),
      ).subscribe((employee: IUserInfo) => {
        this.employeeName = employee.fullNameEn;
      });

    this.userInfoService.getUserInfo$()
      .pipe(
        takeUntil(this.destroy$),
      ).subscribe((user: IUserDetails) => {
        this.userInfo = user;
      });
  }

  public setupMonths(vacationInfo: IVacationInfo): void {
    if (vacationInfo.availableMonths) {
      vacationInfo.availableMonths.sort((a: ICommonOption, b: ICommonOption) => {
        return (Number(a.id)) - (Number(b.id));
      });

      this.firstMonthOptions = JSON.parse(JSON.stringify(vacationInfo.availableMonths));
      this.secondMonthOptions = JSON.parse(JSON.stringify(vacationInfo.availableMonths));

      if (vacationInfo.vacation) {
        this.onSelectFirstMonth(vacationInfo.vacation.firstMonth || null);
        this.onSelectSecondMonth(vacationInfo.vacation.secondMonth || null);
      }
    }
  }

  public isDateExpire(): boolean {
    const currentDate = new Date();
    const expireDate = new Date(currentDate.getFullYear() - 1, 11, 12);
    const openVacationChoseDate = new Date(currentDate.getFullYear(), 10, 15);

    return (currentDate > expireDate) && (currentDate < openVacationChoseDate);
  }

  public isItOwnUserVacationAndDateExpire(): boolean {
    return this.isDateExpire() && this.vacationsInfo.vacation.employeeId === this.userInfo.externalId;
  }

  public onSelectFirstMonth(option: ICommonOption): void {
    if (option) {
      this.secondMonthOptions = this.secondMonthOptions.map((month: ICommonOption) => {
        month.disabled = false;

        if (month.name === option.name) {
          month.disabled = true;
        }

        return month;
      });

      this.isButtonActive.next(true);
    }
  }

  public onSelectSecondMonth(option: ICommonOption): void {
    if (option) {
      this.firstMonthOptions = this.firstMonthOptions.map((month: ICommonOption) => {
        month.disabled = false;

        if (month.name === option.name) {
          month.disabled = true;
        }

        return month;
      });

      this.isButtonActive.next(true);
    }
  }

  public onSubmit(): void {
    touchValidateDeep(this.currentForm, 'touched');

    if (this.currentForm.valid) {
      const requestBody = {
        employeeId: this.employeeId,
        firstMonth: Number(this.vacationFirstMonthControl.value.id),
        secondMonth: Number(this.vacationSecondMonthControl.value.id),
      };

      if (this.vacationsInfo.vacation) {
        this.vacationService.updateVacation(requestBody)
          .pipe(
            takeUntil(this.destroy$),
          ).subscribe(() => {
            this.onSuccessfulSubmit();
          });
      } else {
        this.vacationService.createVacation(requestBody)
          .pipe(
            takeUntil(this.destroy$),
          ).subscribe(() => {
            this.onSuccessfulSubmit();
          });
      }

      this.currentForm.markAsPristine();
    }
  }

  public onFadeOut(): void {
    this.isToastNotification = false;
  }

  private onSuccessfulSubmit(): void {
    this.notificationText = 'The vacation plan has been added';
    this.isToastNotification = true;
    this.isMonthsChosen.next(true);
    this.isButtonActive.next(false);
    this.cdr.detectChanges();
  }
}
