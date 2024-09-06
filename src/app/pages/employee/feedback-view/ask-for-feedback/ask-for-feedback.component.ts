import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Inject,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmModalComponent } from '@andkit/components/modals/confirm-modal/confirm-modal.component';
import { IEmployeeTeammates } from '@interfaces/employee';
import { FeedbackRequestSuccessModalComponent }
from '@pages/employee/feedback-view/feedback-request-success-modal/feedback-request-success-modal.component';
import {
  EXTERNAL_FEEDBACK_BUTTON_NAME,
  FEEDBACK_CONFIRM_MODAL_DATA,
  FEEDBACK_CONFIRM_MODAL_WIDTH, FEEDBACK_INSIDE_OUTSIDE_TYPE,
  FEEDBACK_REQUESTED_EMPLOYEES_MAX_LENGTH
} from '@pages/feedback/feedback-const';
import { FeedbackService } from '@services/feedback.service';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import { COMPONENT_TYPES } from '@constants/types/componentTypes.constants';
import { ICommonOption } from '@interfaces/filter';
import { IExternalFeedbackPostData } from '@interfaces/feedback.interface';
import { CompanyService } from '@services/company.service';

import closeSvg from '!!raw-loader!@assets/images/close.svg';

@Component({
  selector: 'andteam-ask-for-feedback',
  templateUrl: './ask-for-feedback.component.html',
  styleUrls: ['./ask-for-feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AskForFeedbackComponent implements OnInit {
  public closeIcon: string = closeSvg;
  public currentForm = new FormGroup({});
  public allUsersControl = new FormControl('');
  public teammatesControl = new FormControl('');
  public allUsersChips: IEmployeeTeammates[] = [];
  public typesSelectedFeedback = [FEEDBACK_INSIDE_OUTSIDE_TYPE.inside, FEEDBACK_INSIDE_OUTSIDE_TYPE.outside];
  public typeSelectedFeedback: string = FEEDBACK_INSIDE_OUTSIDE_TYPE.inside;
  public isInternalFeedback$ = new BehaviorSubject<boolean>(false);
  public isExternalFeedback$ = new BehaviorSubject<boolean>(false);
  public askForTypeFeedback$ = new BehaviorSubject<boolean>(false);
  public isLinkCopied$ = new BehaviorSubject<boolean>(false);
  public isLink$ = new BehaviorSubject<boolean>(false);
  public availableProjects$ = new BehaviorSubject<ICommonOption[]>(null);
  public linkHint = 'Fill in the required fields to generate a link';
  public errorMessage = 'Required Field';
  public errorEmailMessage = 'Incorrect Email';
  public askForFeedbackSelectPanel = 'ask-for-feedback-panel-class';
  public leftButtonName$ = new BehaviorSubject<string>(EXTERNAL_FEEDBACK_BUTTON_NAME.link);
  public rightButtonName$ = new BehaviorSubject<string>(EXTERNAL_FEEDBACK_BUTTON_NAME.cancel);
  public buttonSecondary = BUTTON_TYPES.PREVIOUS;
  public isButtonDisabled$ = new BehaviorSubject<boolean>(false);
  public btnSubmit = BUTTON_TYPES.SUBMIT;
  public componentsType = COMPONENT_TYPES.OVERTIME;
  public externalFeedbackFormGroup = new FormGroup({});
  public externalFeedbackNameControl = new FormControl('', Validators.required);
  public externalFeedbackSurnameControl = new FormControl('', Validators.required);
  public externalFeedbackEmailControl = new FormControl('', Validators.email);
  public externalFeedbackPositionControl = new FormControl('', Validators.required);
  public externalFeedbackProjectControl = new FormControl('', Validators.required);
  public nameError$ = new BehaviorSubject<boolean>(false);
  public surnameError$ = new BehaviorSubject<boolean>(false);
  public positionError$ = new BehaviorSubject<boolean>(false);
  public projectError$ = new BehaviorSubject<boolean>(false);
  public emailError$ = new BehaviorSubject<boolean>(false);
  public feedbackConfirmModalData = FEEDBACK_CONFIRM_MODAL_DATA;
  public feedbackConfirmModalDataText = 'The link wasn\'t generated or copied to clipboard';
  public isShowSpinner$ = new BehaviorSubject<boolean>(false);
  public delayBeforeSpinner = 0;
  public selectedProject;

  private destroy$ = new Subject();
  private selectedProjectId$ = new BehaviorSubject<string>(null);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      userId: string,
      teammates: IEmployeeTeammates[],
      canAskFeedbackExternal: boolean,
      availableProjects: ICommonOption[]
    },
    private modalWindow: MatDialog,
    private dialogRef: MatDialogRef<AskForFeedbackComponent>,
    private feedbackService: FeedbackService,
    public companyService: CompanyService,
  ) {}

  public ngOnInit(): void {
    this.availableProjects$.next(this.data.availableProjects);
    this.isInternalFeedback$.next(!this.data.canAskFeedbackExternal);
    this.askForTypeFeedback$.next(this.data.canAskFeedbackExternal);
    this.currentForm.addControl('AllUsers', this.allUsersControl);
    this.currentForm.addControl('Teammates', this.teammatesControl);
    this.isButtonActive();
    this.initExternalFeedbackFormGroup();
  }

  public initExternalFeedbackFormGroup(): void {
    this.externalFeedbackFormGroup.addControl('name', this.externalFeedbackNameControl);
    this.externalFeedbackFormGroup.addControl('surname', this.externalFeedbackSurnameControl);
    this.externalFeedbackFormGroup.addControl('email', this.externalFeedbackEmailControl);
    this.externalFeedbackFormGroup.addControl('position', this.externalFeedbackPositionControl);
    this.externalFeedbackFormGroup.addControl('project', this.externalFeedbackProjectControl);
  }

  public onClose(buttonName: string): void {
    if (buttonName === EXTERNAL_FEEDBACK_BUTTON_NAME.cancel) {
      if (this.isExternalFeedback$.value) {
        this.feedbackConfirmModalData.subtitleText = this.feedbackConfirmModalDataText;
      }
      const confirmDialog = this.modalWindow.open(ConfirmModalComponent, {
        width: FEEDBACK_CONFIRM_MODAL_WIDTH,
        data: this.feedbackConfirmModalData
      });

      const subscribeDialogConfirmCancel = confirmDialog.componentInstance.cancelEvent.subscribe(() => {
        confirmDialog.close();
      });

      const subscribeDialogEditCancel = confirmDialog.componentInstance.confirmEvent.subscribe(() => {
        confirmDialog.close();
        this.dialogRef.close();
      });

      confirmDialog.afterClosed().subscribe(() => {
        subscribeDialogConfirmCancel.unsubscribe();
        subscribeDialogEditCancel.unsubscribe();
      });
    }

    if (buttonName === EXTERNAL_FEEDBACK_BUTTON_NAME.finish) {
      this.dialogRef.close();
    }
  }

  public addChip(chip: IEmployeeTeammates): IEmployeeTeammates[] {
    chip.name = chip.name.split('/')[0];

    this.allUsersChips.push(chip);
    if (this.allUsersChips.length === FEEDBACK_REQUESTED_EMPLOYEES_MAX_LENGTH) {
      this.currentForm.disable();
    }

    this.data.teammates.forEach((user: IEmployeeTeammates) => {
      if (user.id === chip.id) {
        user.disabled = true;
      }
    });

    this.allUsersControl.setValue('');
    this.teammatesControl.setValue('');
    this.isButtonActive();

    return this.allUsersChips;
  }

  public removeAllUsersChip(chip: IEmployeeTeammates): IEmployeeTeammates[] {
    this.data.teammates.forEach((user: IEmployeeTeammates) => {
      if (user.id === chip.id) {
        user.disabled = false;
      }
    });

    const removeChipIndex = this.allUsersChips.map((item) => {
      return item.id;
    }).indexOf(chip.id);

    this.allUsersChips.splice(removeChipIndex, 1);
    this.currentForm.enable();
    this.isButtonActive();

    return this.allUsersChips;
  }

  public onSubmit(): void {
    this.isShowSpinner$.next(true);
    this.isButtonDisabled$.next(true);

    const feedbackRequestData = {
      employeeId: this.data.userId,
      receiverIds: this.allUsersChips.map((chip: IEmployeeTeammates) => {
        return chip.id;
      })
    };

    this.feedbackService.sendFeedbackRequest(feedbackRequestData.employeeId, feedbackRequestData.receiverIds)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.dialogRef.close();

        this.modalWindow.open(FeedbackRequestSuccessModalComponent, {
          width: FEEDBACK_CONFIRM_MODAL_WIDTH,
          data: this.allUsersChips
        });
      });
  }

  public onRadioButtonChoose(type: string): void {
    this.typeSelectedFeedback = type;
  }

  public onRadioButtonChooseSubmit(type: string): void {
    this.askForTypeFeedback$.next(false);
    type === FEEDBACK_INSIDE_OUTSIDE_TYPE.inside
      ? this.isInternalFeedback$.next(true)
      : this.isExternalFeedback$.next(true);
  }

  public OnSelectProject(project: ICommonOption): void {
    this.selectedProject = project;
    this.selectedProjectId$.next(project.id);
  }

  public onExternalSubmit(type: string): void {
    if (type === EXTERNAL_FEEDBACK_BUTTON_NAME.link) {
      this.nameError$.next(!this.externalFeedbackNameControl.value);
      this.surnameError$.next(!this.externalFeedbackSurnameControl.value);
      this.positionError$.next(!this.externalFeedbackPositionControl.value);
      this.projectError$.next(!this.externalFeedbackProjectControl.value);
      this.emailError$.next(this.externalFeedbackEmailControl.invalid);
      this.externalFeedbackProjectControl.markAsTouched({ onlySelf: true });

      if (this.externalFeedbackFormGroup.valid) {
        this.leftButtonName$.next(EXTERNAL_FEEDBACK_BUTTON_NAME.copy);
        const request: IExternalFeedbackPostData = {
          employeeId: this.data.userId,
          projectId: this.selectedProjectId$.value,
          customerName: `${this.externalFeedbackNameControl.value} ${this.externalFeedbackSurnameControl.value}`,
          customerEmail: this.externalFeedbackEmailControl.value,
          customerPosition: this.externalFeedbackPositionControl.value
        };
        this.feedbackService.getExternalFeedbackLink(request)
          .pipe(
            takeUntil(this.destroy$)
          )
          .subscribe((link: string) => {
            this.leftButtonName$.next(EXTERNAL_FEEDBACK_BUTTON_NAME.copy);
            this.linkHint = `https://team.${this.companyService.companyUrl}/feedbackexternals/${link}`;
            this.isLink$.next(true);
          }
        );
      }
    } else if (type === EXTERNAL_FEEDBACK_BUTTON_NAME.copy) {
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = this.linkHint;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
      this.isLinkCopied$.next(true);
      this.rightButtonName$.next(EXTERNAL_FEEDBACK_BUTTON_NAME.finish);
    }
  }

  public isButtonActive(): void {
    this.allUsersChips.length === 0
      ? this.isButtonDisabled$.next(true)
      : this.isButtonDisabled$.next(false);
  }

  public onFadeOut(): void {
    this.isLinkCopied$.next(false);
  }
}
