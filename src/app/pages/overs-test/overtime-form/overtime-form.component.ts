import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  ChangeDetectorRef,
  EventEmitter, Output
} from '@angular/core';
import {
  Overtime,
  IOvertimeOptions,
  OVERTIME_RADIO_BUTTONS,
  IOvertimePostData,
  OVERTIME_CURRENCY,
  CONFIRM_MODAL_CANCEL_PARAMS,
  OVERTIME_ATTACHMENT_TYPES,
  OVERTIMES_ATTACHMENT_SIZE,
} from '@pages/overs-test/overs';
import { COMPONENT_TYPES, INPUT_TYPES } from '@constants/types/componentTypes.constants';
import { Observable, of, Subject, throwError } from 'rxjs';
import { ICommonOption } from '@interfaces/filter';
import { catchError, debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { ProjectService } from '@services/project.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KEYBOARD_BUTTONS } from '@constants/overtime.const';
import { INITIAL_DELAY } from '@andkit/components/other/loader/loader';
import { OversService } from '@pages/overs-test/overs.service';
import { EmployeeService } from '@services/employee.service';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import infoSvg from '!!raw-loader!@andkit/components/inputs/interviewers-feedback/icons/info.svg';
import infoActiveSvg from '!!raw-loader!@andkit/components/inputs/interviewers-feedback/icons/info-active.svg';
import { UserService } from '@services/user.service';
import { IUserDetails } from '@interfaces/authentication';
import { ConfirmModalComponent } from '@andkit/components/modals/confirm-modal/confirm-modal.component';
import { CONFIRM_MODAL_WIDTH } from '@pages/employee/certificate/certificate.const';
import { MatDialog } from '@angular/material/dialog';
import { CompanyService } from '@services/company.service';

@Component({
  selector: 'andteam-overtime-form',
  templateUrl: './overtime-form.component.html',
  styleUrls: ['./overtime-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OvertimeFormComponent implements OnInit, OnDestroy {

  @Input() public configuration: Overtime;

  @Output() public formTouched = new EventEmitter();
  @Output() public overCreated = new EventEmitter();
  @Output() public formReseted = new EventEmitter();

  public componentsType = COMPONENT_TYPES.OVERTIME;
  public buttonType = BUTTON_TYPES;
  public textInput = INPUT_TYPES.TEXT;
  public options: IOvertimeOptions;
  public selectedProject: ICommonOption;
  public jiraLinkErrorMessage: string;
  public overtimeRadioButtons = OVERTIME_RADIO_BUTTONS;
  public attachmentTypes = OVERTIME_ATTACHMENT_TYPES;
  public maxFileSize = OVERTIMES_ATTACHMENT_SIZE;
  public maxCommentLength = 800;
  public maxSumLength = 7;
  public commentHintText: string;
  public userId: string;
  public selectedType = 1;
  public approversOptions = [];
  public additionalInfoOptions = [];
  public isSpinnerShown = false;
  public isCurrencySingleOption = false;
  public isSumError = false;
  public sumErrorMessage = '';
  public sumMaxValue = Infinity;
  public fullNames: ICommonOption[] = [];
  public currencyOptions: ICommonOption[] = [];
  public currentForm = new FormGroup({});
  public projectControl = new FormControl('', Validators.required);
  public approverControl = new FormControl('', Validators.required);
  public additionalInfoControl = new FormControl('', Validators.required);
  public sumControl = new FormControl('', [Validators.required, Validators.maxLength(7), Validators.min(1)]);
  public hoursControl = new FormControl('', Validators.required);
  public jiraLinkControl = new FormControl('', [Validators.required]);
  public commentControl = new FormControl('', Validators.required);
  public newcommerControl = new FormControl('', Validators.required);
  public attachmentControl = new FormControl('', Validators.required);
  public currencyControl = new FormControl('', Validators.required);
  public isJiraLinkError$: Observable<boolean>;

  public readonly infoIcon = infoSvg;
  public readonly infoActiveIcon = infoActiveSvg;

  private overtimeCurrency = OVERTIME_CURRENCY;
  private modalParams = CONFIRM_MODAL_CANCEL_PARAMS;
  private destroy$ = new Subject<void>();

  constructor(
    private oversService: OversService,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private userInfo: UserService,
    private cdr: ChangeDetectorRef,
    private modalWindow: MatDialog,
    private companyService: CompanyService,
  ) {
    this.jiraLinkErrorMessage = `The format of the field should be: \'https://jira.` +
      `${this.companyService.companyUrl}/browse/PRMT-XXX\' (or XXXX) - it\'s issue number`;
  }

  ngOnInit(): void {
    this.initOptions();
    this.initForm();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSelectProject($event: any): void {
    this.approversOptions = this.configuration.overApprovers;
    this.selectedProject = $event;

    this.getApproversOptions$();
  }

  public onProjectReset(): void {
    this.approverControl.reset();
  }

  public onSelectApprover($event: any): void {
  }

  public onSelectCurrency(currency: ICommonOption): void {
    const selectedCurrency = this.configuration.overRulesCurrencies.find(item => item.currency === currency.name);

    if (selectedCurrency.maxValue) {
      this.sumMaxValue = +selectedCurrency.maxValue;
      this.sumControl.setValidators([Validators.required, Validators.max(this.sumMaxValue), Validators.min(1)]);
      this.sumErrorMessage = `Max sum is ${this.sumMaxValue} ${selectedCurrency.currency}`;
    }

    this.sumControl.setValue(this.sumControl.value);
    this.onInputSum(this.sumControl.value);
    this.currentForm.updateValueAndValidity();
    this.cdr.detectChanges();
  }

  public onInputSum(sum: number): void {
    this.isSumError = sum > this.sumMaxValue || sum < 1;
  }

  public onSelectNewcommer($event: any): void {

  }

  public onlyDecimalNumberKey(event: KeyboardEvent): boolean {
    const charCode: number = event.which ? event.which : event.keyCode;

    return (
      (charCode >= KEYBOARD_BUTTONS.zero &&
        charCode <= KEYBOARD_BUTTONS.nine) ||
      charCode === KEYBOARD_BUTTONS.dot
    );
  }

  public onCommentKeyUp(): void {
    this.commentHintText = this.getHintMessage(this.commentControl.value.length);
  }

  public getHintMessage(length: string): string {
    return `Number of characters ${length}/${this.maxCommentLength} (min 1)`;
  }

  public onSumHoursSelect(value: number): void {
    this.selectedType = value;

    if (value === 1) {
      this.hoursControl.reset();
      this.currentForm.removeControl('hours');
      this.currentForm.addControl('sum', this.sumControl);
      this.currentForm.addControl('currency', this.currencyControl);
    } else {
      this.sumControl.reset();
      this.currentForm.removeControl('currency');
      this.currentForm.removeControl('sum');
      this.currentForm.addControl('hours', this.hoursControl);
    }

    this.cdr.detectChanges();
  }

  public jiraLinkValidate(control: FormControl): void {
    this.isJiraLinkError$ = control.value.match(this.companyService.jiraLinkPattern)
      ? of(false)
      : of(true);
  }

  public onHandleFileInput(files: string[]): void {
    this.attachmentControl.markAsTouched();
    this.attachmentControl.setValue(files);
  }

  public onCancel(): void {
    const confirmDialog = this.modalWindow.open(ConfirmModalComponent, {
      data: this.modalParams,
      width: CONFIRM_MODAL_WIDTH
    });

    confirmDialog.componentInstance.confirmEvent
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.currentForm.reset();
        this.formReseted.emit();
      });
  }

  public onSubmit(): void {
    this.createOvertime();
  }

  private initForm(): void {
    if (this.configuration.isProject) {
      this.currentForm.addControl('project', this.projectControl);

      if (!this.configuration.isRequiredProject) {
        this.projectControl.clearValidators();
        this.projectControl.setErrors(null);
      }
    }

    if (this.configuration.overApprovers.length > 0 || this.configuration.isNeedGetDm) {
      this.currentForm.addControl('approver', this.approverControl);
    }

    if (this.configuration.overAdditionalInformations?.length > 0) {
      this.currentForm.addControl('AdditionalInformation', this.additionalInfoControl);
    }

    if (this.configuration.isJiraLink) {
      this.currentForm.addControl('jiraLink', this.jiraLinkControl);
      this.jiraLinkControl.setValidators([Validators.pattern(this.companyService.jiraLinkPattern), Validators.required]);
    }

    if (this.configuration.isReferralProgram) {
      this.currentForm.addControl('ReferralEmployeeFullName', this.newcommerControl);
    }

    if (this.configuration.isComment) {
      this.currentForm.addControl('comment', this.commentControl);
    }

    if (this.configuration.isHours) {
      this.currentForm.addControl('hours', this.hoursControl);
    }

    if (this.configuration.isSum) {
      this.currentForm.addControl('sum', this.sumControl);
      this.currentForm.addControl('currency', this.currencyControl);
    }

    if (this.configuration.isSum && this.configuration.isHours) {
      this.currentForm.removeControl('hours');
    }

    if (this.configuration.isAttachment) {
      this.currentForm.addControl('overFiledAttachments', this.attachmentControl);

      if (!this.configuration.isRequiredAttachment) {
        this.attachmentControl.clearValidators();
        this.attachmentControl.setErrors(null);
      }
    }

    this.currentForm.valueChanges.subscribe(() => {
      this.formTouched.emit();
    });
  }

  private initOptions(): void {
    this.options = {
      project$: this.getProjectOptions$(),
      fullNames$: this.getEmployeeNames$()
    };

    if (this.configuration.overRulesCurrencies) {
      for (const currency of this.configuration.overRulesCurrencies) {
        this.currencyOptions = [...this.currencyOptions, { name: currency.currency, id:currency.currency }];
      }

      if (this.currencyOptions.length === 1) {
        this.isCurrencySingleOption = true;
        this.currencyControl.setValue(this.currencyOptions[0].name);
        this.onSelectCurrency(this.currencyOptions[0]);
      }
    }

    this.approversOptions = this.configuration.overApprovers;
    this.getUserId$();

    if (this.configuration.overAdditionalInformations?.length > 0) {
      this.setupAdditionalInfoOptions();
    }
  }

  private getProjectOptions$(): Observable<ICommonOption[]> {
    return this.projectControl.valueChanges.pipe(
      debounceTime(INITIAL_DELAY),
      switchMap((projectNameSample: string) => {
        return projectNameSample.length >= 1
          ? this.projectService.getProjects(
            projectNameSample,
          )
          : of(null);
      })
    );
  }

  private getEmployeeNames$(): Observable<ICommonOption[]> {
    return this.newcommerControl.valueChanges.pipe(
      debounceTime(INITIAL_DELAY),
      switchMap((employeeNameSample: string) => {
        return employeeNameSample.length >= 2
          ? this.employeeService.getEmployeeFullNames(
            employeeNameSample
          )
          : of(null);
      })
    );
  }

  private getUserId$(): any {
    this.userInfo.getUserInfo$().pipe(
      takeUntil(this.destroy$)
    ).subscribe((user: IUserDetails) => {
      this.userId = user.externalId;
    });
  }

  private getApproversOptions$(): any {
    if (this.configuration.isNeedGetDm && this.projectControl.value) {
      this.oversService.getApproverDmByProject(this.configuration.id, this.selectedProject.id).pipe(
        takeUntil(this.destroy$)
      ).subscribe((dmApprover) => {
        this.approversOptions = dmApprover;
        this.cdr.detectChanges();
      });
    }
  }

  private setupAdditionalInfoOptions(): void {
    this.additionalInfoOptions = this.configuration.overAdditionalInformations.map((item) => {
      return { name: item.value, id: item.id, fieldName: item.fieldName };
    });
  }

  private createOvertime():void {
    const overtime: IOvertimePostData = {
      overTypeId: this.configuration.id,
      employeeId: this.userId,
      ...this.currentForm.value
    };

    if (overtime.approver) {
      overtime.approverId = overtime.approver.approverId;

      delete overtime.approver;
    }

    if (overtime.project) {
      overtime.projectId = this.selectedProject.id;

      delete overtime.project;
    }

    if (overtime.hours) {
      overtime.hours = +overtime.hours;
    }

    if (overtime.sum) {
      overtime.sum = +overtime.sum;
    }

    if (overtime.currency) {
      const selectedCurrency = this.overtimeCurrency.find((item) => {
        return item.name === overtime.currency;
      });

      overtime.currency = selectedCurrency.id;
    }

    if (!overtime.overFiledAttachments?.length) {
      delete overtime.overFiledAttachments;
    }

    if (overtime.AdditionalInformation) {
      const pickedInfo = this.additionalInfoOptions.find(item => item.name === overtime.AdditionalInformation);
      overtime.AdditionalInformation = pickedInfo.id;
    }

    this.isSpinnerShown = true;

    this.oversService.createOver(overtime).pipe(
      catchError((err) => {
        const modal = this.modalWindow.open(ConfirmModalComponent, {
          data: {
            titleText: `Approver is incorrect. Please <a href="https://jsupport.andersenlab.com/servicedesk/customer/portal/3/group/21" target="_blank">create a ticket</a> for the Portal Team`,
            subtitleText: '',
            cancelBtnText: '',
            confirmBtnText: 'OK',
            oneButtonMode: true,
          },
          width: CONFIRM_MODAL_WIDTH,
        });

        modal.componentInstance.confirmEvent.subscribe(() => {
          this.isSpinnerShown = false;
          this.cdr.detectChanges();
        });

        return throwError(err);
      }),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.isSpinnerShown = false;
      this.overCreated.emit();
    });
  }
}
