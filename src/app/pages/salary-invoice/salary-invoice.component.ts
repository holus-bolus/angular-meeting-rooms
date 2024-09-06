import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ICommonOption } from '@interfaces/filter';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Observable, of, Subject } from 'rxjs';
import { catchError, delay, first, map, mergeMap, takeUntil } from 'rxjs/operators';
import { SalaryInvoiceService } from '@services/salary-invoice.service';
import { ConfirmModalComponent } from '@andkit/components/modals/confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CONFIRM_MODAL_WIDTH, CONFIRM_MODAL_HEIGHT, LEAVE_PAGE_MODAL_PARAMS, DELETE_TASK_MODAL_PARAMS } from './salary-invoice.const';

import plusSvg from '!!raw-loader!@assets/images/plus.svg';
import closeGreySvg from '!!raw-loader!@assets/images/close-grey.svg';

@Component({
  selector: 'andteam-salary-invoice',
  templateUrl: './salary-invoice.component.html',
  styleUrls: ['./salary-invoice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalaryInvoiceComponent implements OnInit, OnDestroy {
  public cancelButtonType = BUTTON_TYPES.PREVIOUS;
  public confirmButtonType = BUTTON_TYPES.PRIMARY;
  public currentPeriod: ICommonOption;
  public previousPeriod: ICommonOption;
  public periodList: ICommonOption[];
  public plusSvg: SafeHtml;
  public closeSvg: SafeHtml;
  public isToastNotification: boolean;
  public salaryInvoiceForm: FormGroup;

  public isShowLoader = false;
  public notificationText = 'Your tasks were successfully sent to 1C';
  private destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private modalWindow: MatDialog,
    private salaryInvoiceService: SalaryInvoiceService,
  ) {
    this.salaryInvoiceForm = this.formBuilder.group({
      period: [null, [Validators.required]],
      tasks: this.formBuilder.array([['', [Validators.required]]]),
    });
    const now = new Date();
    this.currentPeriod = {
      id: 'Current month',
      name: `Current month (${new Date(now.getFullYear(), now.getMonth(), 1).toLocaleDateString()} - ` +
        `${new Date(now.getFullYear(), now.getMonth() + 1, 0).toLocaleDateString()})`,
      value: new Date(now.getFullYear(), now.getMonth(), 1).toISOString(),
    };
    this.previousPeriod = {
      id: 'Previous month',
      name: `Previous month (${new Date(now.getFullYear(), now.getMonth() - 1, 1).toLocaleDateString()} - ` +
        `${new Date(now.getFullYear(), now.getMonth(), 0).toLocaleDateString()})`,
      value: new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString(),
    };
    this.periodList = [
      this.currentPeriod,
      this.previousPeriod,
    ];

    this.salaryInvoiceForm.controls.period.setValue(this.periodList[0]);
  }

  ngOnInit(): void {
    this.plusSvg = this.sanitizer.bypassSecurityTrustHtml(plusSvg as any);
    this.closeSvg = this.sanitizer.bypassSecurityTrustHtml(closeGreySvg as any);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.isShowLoader = true;
    const workPerforme = [];
    const tasksFG = this.salaryInvoiceForm.get('tasks') as FormArray;
    for (const control in tasksFG.controls) {
      workPerforme.push(tasksFG.controls[control].value);
    }

    this.salaryInvoiceService.postSalaryInvoice$({
      workPerforme,
      period: this.salaryInvoiceForm.controls.period.value.value,
    })
      .pipe(
        mergeMap(() => this.toast()),
        catchError(() => {
          this.isShowLoader = false;

          return of(null);
        }),
        takeUntil(this.destroy$),
    )
    .subscribe(() => {
      this.isShowLoader = false;
      this.location.back();
    });
  }

  public onFadeOut(): void {
    this.isToastNotification = false;
  }

  public onCancel(event: Event): void {
    event.preventDefault();
    const confirmDialog = this.modalWindow.open(ConfirmModalComponent, {
      data: LEAVE_PAGE_MODAL_PARAMS,
      width: CONFIRM_MODAL_WIDTH,
      height: CONFIRM_MODAL_HEIGHT,
    });

    confirmDialog.afterClosed().pipe(first()).subscribe(
      (data) => {
        if (data) {
          this.location.back();
        }
      },
    );
  }

  public addNewTask(): void {
    const tasksFG = this.salaryInvoiceForm.get('tasks') as FormArray;
    tasksFG.push(this.formBuilder.control('', Validators.required));
  }

  public removeTask(index: number): void {
    const tasksFG = this.salaryInvoiceForm.get('tasks') as FormArray;
    if (tasksFG.controls[index].value === '') {
      tasksFG.removeAt(index);
    } else {
      const confirmDialog = this.modalWindow.open(ConfirmModalComponent, {
        data: DELETE_TASK_MODAL_PARAMS,
        width: CONFIRM_MODAL_WIDTH,
        height: CONFIRM_MODAL_HEIGHT,
      });
      confirmDialog.afterClosed().pipe(first()).subscribe(
        (data) => {
          if (data) {
            tasksFG.removeAt(index);
          }
        },
      );
    }
  }

  public onInputTask(taskDescription: string, formControl: FormControl): void {
    formControl.setValue(taskDescription);
  }

  private toast(): Observable<any> {
    const obs : Observable<any> = of(true);

    return obs.pipe(
      map(() => { this.isToastNotification = true; this.cdr.detectChanges(); }),
      delay(2000),
    );
  }
}
