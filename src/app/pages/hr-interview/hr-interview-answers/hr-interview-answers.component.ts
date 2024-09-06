import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

// import logoSvg from '!!raw-loader!@assets/images/logo.svg';
import checkedSvg from '!!raw-loader!@assets/images/checked.svg';
import closeSvg from '!!raw-loader!@assets/images/close.svg';

import { IHrInterviewAnswer, IHrInterviewList } from '@interfaces/hr-interview.interface';
import {
  HR_INTERVIEW_QUESTIONNAIRE,
  HR_INTERVIEW_MODAL_HEIGHT,
  HR_INTERVIEW_MODAL_WIDTH,
  HR_INTERVIEW_OTHER_ANSWER,
  HR_INTERVIEW_OTHER_FIELD,
  HR_INTERVIEW_SINGLE_ANSWER
} from '../hr-interview.const';
import html2canvas from 'html2canvas';
import { from, Subject, throwError } from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { HrInterviewModalComponent } from '../hr-interview-modal/hr-interview-modal.component';
import { HrInterviewService } from '@services/hr-interview.service';
import { CompanyService } from '@services/company.service';

@Component({
  selector: 'andteam-hr-interview-answers',
  templateUrl: './hr-interview-answers.component.html',
  styleUrls: ['./hr-interview-answers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HrInterviewAnswersComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('answersCapture') public answersCapture: ElementRef;
  @Input() public avatar: string;
  @Input() public username: string;
  @Input() public hrInterviewAnswersList: IHrInterviewList[];
  @Input() public hrInterviewListId: string;
  @Input() public isEngVersion: boolean;

  public logoIcon: string;
  public title: string;
  public hint: string;
  public checkedIcon = checkedSvg;
  public uncheckedIcon = closeSvg;
  public singleAnswer = HR_INTERVIEW_SINGLE_ANSWER;
  public otherAnswer = HR_INTERVIEW_OTHER_ANSWER;
  public otherField = HR_INTERVIEW_OTHER_FIELD;

  private destroy$ = new Subject();

  constructor(
    private modalWindow: MatDialog,
    private hrInterviewService: HrInterviewService,
    private companyService: CompanyService) {
    this.logoIcon = this.companyService.companyLogo;
  }

  public ngOnInit(): void {
    this.title = this.isEngVersion ? 
      HR_INTERVIEW_QUESTIONNAIRE.english.title :
      HR_INTERVIEW_QUESTIONNAIRE.russian.title;
    this.hint = this.isEngVersion ?
      HR_INTERVIEW_QUESTIONNAIRE.english.hint :
      HR_INTERVIEW_QUESTIONNAIRE.russian.hint;
  }

  public ngAfterViewInit(): void {
    this.sendAnswers();
  }

  public showUncheckedIcon(answerItem: IHrInterviewAnswer, question: IHrInterviewList): boolean {
    return !answerItem.checked && question.questionType !== this.singleAnswer && answerItem.answer !== this.otherField;
  }

  public showAnswerLabel(answerItem: IHrInterviewAnswer, question: IHrInterviewList): boolean {
    if (question.questionType === this.singleAnswer && answerItem.checked) {
      return true;
    }

    return question.questionType !== this.singleAnswer && answerItem.answer !== this.otherField;
  }

  public sendAnswers(): void {
    from(html2canvas(this.answersCapture.nativeElement, { scrollY: 0 }))
      .pipe(
        takeUntil(this.destroy$),
        switchMap((canvas: HTMLCanvasElement) => from(fetch(canvas.toDataURL('image/jpeg')))),
        switchMap((res: Response) => from(res.blob())),
        switchMap((blob: Blob) => {
          const file = new File([blob], 'asnwersImg', { type: 'image/jpg' });

          return this.hrInterviewService.sendHrInterviewAnswers(file, this.hrInterviewListId);
        }),
        catchError((error: Error) => {
          this.modalWindow.open(HrInterviewModalComponent, {
            width: HR_INTERVIEW_MODAL_WIDTH,
            height: HR_INTERVIEW_MODAL_HEIGHT,
            data: {
              isError: true,
              isEngVersion: this.isEngVersion
            }
          });

          return throwError(error);
        })
      )
      .subscribe(() => {
        this.modalWindow.open(HrInterviewModalComponent, {
          width: HR_INTERVIEW_MODAL_WIDTH,
          height: HR_INTERVIEW_MODAL_HEIGHT,
          data: {
            isError: false,
            isEngVersion: this.isEngVersion
          }
        });
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
