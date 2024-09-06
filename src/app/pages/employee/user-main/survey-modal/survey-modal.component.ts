import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Inject,
  OnDestroy, Output, EventEmitter
} from '@angular/core';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { touchValidateDeep } from '@pages/assessment/coordinator-cabinet/coordinator-cabinet';
import { IAnswer, INgClassParams, IQuestion, ISurveyResults } from '@interfaces/survey';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@andkit/components/modals/confirm-modal/confirm-modal.component';
import {
  SURVEY_CONFIRM_WINDOW_DATA,
  SURVEY_CONFIRM_WINDOW_WIDTH, SURVEY_SUCCESSFULLY_WINDOW_DATA, SURVEY_WINDOW_WIDTH,
} from '@pages/employee/user-main/survey-modal/survey-const';
import { SurveySuccessfullyModalComponent } from '@pages/employee/user-main/survey-successfully-modal/survey-successfully-modal.component';
import { EmployeeService } from '@services/employee.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import closeSvg from '!!raw-loader!@assets/images/close.svg';

@Component({
  selector: 'andteam-questionary-modal',
  templateUrl: './survey-modal.component.html',
  styleUrls: ['./survey-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SurveyModalComponent implements OnInit, OnDestroy {
  @Output() afterSubmit = new EventEmitter<void>();

  public options: IQuestion[];
  public tabCountQuestions: number;
  public currIndexSkill = 2;
  public prevIndexSkill = -1;
  public btnPrevious = BUTTON_TYPES.PREVIOUS;
  public btnNext = BUTTON_TYPES.SUBMIT;
  public currentForm = new FormGroup({});
  public questionsFormArray: FormArray;
  public radioControl:  FormControl;
  public checkboxControl: FormControl;
  public radioButtonsCont: IQuestion[];
  public closeIcon: string = closeSvg;
  public checkboxes = [];
  public postArray = [];
  public destroy$ = new Subject();
  public paginationIndex = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      questions: IQuestion[],
      surveyId: string
    },
    private dialogRef: MatDialogRef<SurveyModalComponent>,
    private modalWindow: MatDialog,
    private employeeService: EmployeeService,
  ) { }

  public ngOnInit(): void {
    this.options = this.data.questions;
    this.options.forEach((item) => {
      item.answers.forEach((checkbox: IAnswer) => {
        checkbox.checked = false;
      });
    });
    this.dialogRef.backdropClick().subscribe(() => {
      this.onClose();
    });
    this.onFeedbackSkillsOnPage();
    this.tabCountQuestions = this.options.length;
    this.formInit();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public formInit(): void {
    this.radioControl = new FormControl('');
    this.checkboxControl = new FormControl();
    this.questionsFormArray = new FormArray(this.options
      .map((value) => {
        return new FormControl('', [Validators.required]);
      }));
    this.currentForm.addControl('radioControls', this.questionsFormArray);
  }

  public arrayPage(): number[] {
    return Array(this.tabCountQuestions);
  }

  public onPreviousPage(): void {
    if (this.currIndexSkill !== 2) {
      this.paginationIndex = this.paginationIndex - 1;
      this.prevIndexSkill = this.prevIndexSkill - 2;
      this.currIndexSkill = this.currIndexSkill - 2;
    }
  }

  public onNextPage(): void {
    if (this.currIndexSkill < this.options.length) {
      this.paginationIndex = this.paginationIndex + 1;
      this.prevIndexSkill = this.prevIndexSkill + 2;
      this.currIndexSkill = this.currIndexSkill + 2;
    }
  }

  public paginationLength(): any {
    return Array(this.options.length % 2 === 0 ? this.options.length / 2 : this.options.length / 2 + 0.5);
  }

  public onRadioChanged(questionId: number, answerId: string, optionId: string): void {
    this.postArray[questionId] = {
      answerId,
      questionId: optionId.toString()
    };
  }

  public onSelect(checkboxAnswer: IQuestion, checked: boolean, questionId: number, answerId: string): void {
    checkboxAnswer.checked = checked;
    checked
      ? this.checkboxes.push({ checkboxAnswer, questionId, answerId })
      : this.checkboxes = this.checkboxes.filter((checkbox) => {
        return checkbox.checkboxAnswer !== checkboxAnswer;
      });
  }

  public onFeedbackSkillsOnPage(): any {
    return [this.options];
  }

  public onClose(): void {
    const confirmDialog = this.modalWindow.open(ConfirmModalComponent, {
      width: SURVEY_CONFIRM_WINDOW_WIDTH,
      data: SURVEY_CONFIRM_WINDOW_DATA,
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

  public onSubmit(): void {
    touchValidateDeep(this.currentForm, 'touched');
    if (this.currentForm.valid) {
      const postCheckboxes = this.checkboxes.map((checkbox) => {
        return {
          questionId: checkbox.questionId,
          answerId: checkbox.answerId
        };
      });
      this.postArray = [...this.postArray, ...postCheckboxes].filter(Boolean);
      const data: ISurveyResults = {
        questionnaireId: this.data.surveyId,
        questionnaireAnswers: this.postArray
      };
      this.employeeService.sendSurvey(data)
        .pipe(
          takeUntil(this.destroy$)
        ).subscribe(() => {
          this.afterSubmit.emit();
          this.dialogRef.close();
          this.modalWindow.open(SurveySuccessfullyModalComponent, {
            width: SURVEY_CONFIRM_WINDOW_WIDTH,
            data: SURVEY_SUCCESSFULLY_WINDOW_DATA,
          });
        }
      );
    }
  }

  public getSurveyBlockClasses(index: number): INgClassParams {
    return {
      ['survey-block-checked']: this.questionsFormArray.controls[index].valid
    };
  }
}
