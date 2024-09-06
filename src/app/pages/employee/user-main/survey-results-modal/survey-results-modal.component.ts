import { Component, ChangeDetectionStrategy, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import closeSvg from '!!raw-loader!@assets/images/close.svg';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IQuestionnaireEmployee, IQuestionnaireResults } from '@interfaces/survey';
import { BehaviorSubject } from 'rxjs';
import { GOOD_MATCH } from '@pages/employee/user-main/survey-modal/survey-const';

@Component({
  selector: 'andteam-survey-results-modal',
  templateUrl: './survey-results-modal.component.html',
  styleUrls: ['./survey-results-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SurveyResultsModalComponent implements OnInit {
  public btnSubmit = BUTTON_TYPES.SUBMIT;
  public perfectMatch$ = new BehaviorSubject<IQuestionnaireEmployee[]>([]);
  public goodMatch$ = new BehaviorSubject<IQuestionnaireEmployee[]>([]);
  public simpleMatch$ = new BehaviorSubject<IQuestionnaireEmployee[]>([]);
  public isMatches$ = new BehaviorSubject<boolean>(false);

  public closeIcon: string = closeSvg;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IQuestionnaireResults,
    private dialogRef: MatDialogRef<SurveyResultsModalComponent>,
  ) { }

  public ngOnInit(): void {
    this.data.employees.forEach((match: IQuestionnaireEmployee) => {
      if (match.value > GOOD_MATCH) {
        this.perfectMatch$.value.push(match);
      } else if (match.value < GOOD_MATCH - 1) {
        this.simpleMatch$.value.push(match);
      } else {
        this.goodMatch$.value.push(match);
      }
    });

    this.isMatches$.next(!!this.perfectMatch$.value.length || !!this.goodMatch$.value.length);
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
