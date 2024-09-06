import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import { ChangeDetectionStrategy, Component, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { IHrInterviewAnswer, IHrInterviewList } from '@interfaces/hr-interview.interface';
import { forIn } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import {
  HR_INTERVIEW_OTHER_FIELD,
  HR_INTERVIEW_OTHER_FIELD_ENG,
  HR_INTERVIEW_OTHER_QUESTION,
  HR_INTERVIEW_SINGLE_ANSWER
} from '../hr-interview.const';

@Component({
  selector: 'andteam-hr-interview-form',
  templateUrl: './hr-interview-form.component.html',
  styleUrls: ['./hr-interview-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HrInterviewFormComponent {
  @Input() public avatar: string;
  @Input() public username: string;
  @Input() public isEngVersion: boolean;
  @Input() public set hrInterviewList(value: IHrInterviewList[]) {
    if (value) {
      if (value.length === 10) {
        value = value.slice(0, value.length - 1);
      }

      this.hrInterviewList$.next(value);
      this.initForm(value);
    }
  }

  @Output() public sendForm = new EventEmitter<IHrInterviewList[]>();

  public hrInterviewList$ = new BehaviorSubject(null);
  public form: { [key: string]: IHrInterviewList } = {};
  public confirmButtonType = BUTTON_TYPES.SUBMIT;
  public singleAnswer = HR_INTERVIEW_SINGLE_ANSWER;
  public otherField = HR_INTERVIEW_OTHER_FIELD;
  public otherFieldEng = HR_INTERVIEW_OTHER_FIELD_ENG;
  public otherQuestion = HR_INTERVIEW_OTHER_QUESTION;
  public questionElements: HTMLElement[] = [];
  public errorElement: HTMLElement;
  public isSubmitted = false;
  public isFormHasErrors = false;

  public onRadioButtonChoose(answerId: string, questionId: string): void {
    this.updateForm(questionId, answerId);
  }

  public sendInterview(): void {
    this.isSubmitted = true;
    this.isFormHasErrors = false;
    this.checkFormOnErrors();

    !this.isFormHasErrors
      ? this.sendForm.emit(this.updateHrInterviewList())
      : this.navigateToErrorElement();
  }

  public onSaveOtherField(value: string, questionId: string, answerId: string): void {
    const mappedControlValue: IHrInterviewList = {
      ...this.form[questionId],
      answers:
        this.form[questionId].answers
          .map((answer: IHrInterviewAnswer) => answerId === answer.id
            ? { ...answer, answer: value, isOtherType: true }
            : answer
          )
    };

    this.form[questionId] = mappedControlValue;
  }

  public onAddOtherField(value: string): void {
    if (value) {
      this.otherQuestion.answers = [{ id: 'other', answer: value, checked: !!value, isOtherType: true }];
      this.form = { ...this.form, [this.otherQuestion.id]: this.otherQuestion };
    }
  }

  public onCheckboxChange(value: MatCheckboxChange, questionId: string, answerId: string): void {
    if (value.source) {
      this.updateForm(questionId, answerId, value.checked, true);
    }
  }

  public checkIsFilled(questionId: string, questionElement?: HTMLElement): boolean {
    const isFilled = this.form[questionId].answers
      .some(({ checked, answer }: IHrInterviewAnswer) => checked && answer !== this.otherField && !!answer);

    if (questionElement) {
      this.questionElements = [...this.questionElements, questionElement];
    }

    return isFilled;
  }

  public isDisabled(index: number, questionId: string): boolean {
    return !this.form[questionId].answers[index].checked;
  }

  private initForm(value: IHrInterviewList[]): void {
    value.forEach((question: IHrInterviewList) => this.form = { ...this.form, [question.id]: question });
  }

  private updateHrInterviewList(): IHrInterviewList[] {
    let updatedHrInterviewList = [];

    forIn(this.form, (control: IHrInterviewList) => {
      updatedHrInterviewList = [...updatedHrInterviewList, control];
    });

    return updatedHrInterviewList;
  }

  private updateForm(questionId: string, answerId: string, checked?: boolean, isCheckbox?: boolean): void {
    const mappedControlValue = {
      ...this.form[questionId],
      answers:
        this.form[questionId].answers
          .map((answer: IHrInterviewAnswer) => {
            if (isCheckbox) {
              return answerId === answer.id ? { ...answer, checked } : answer;
            }

            return { ...answer, checked: answer.id === answerId };
          })
    };

    this.form[questionId] = mappedControlValue;
  }

  private checkFormOnErrors(): void {
    forIn(this.form, (control: IHrInterviewList) => {
      if (!control.answers.some(({ checked, answer }) => checked && answer !== this.otherField && !!answer)) {
        this.isFormHasErrors = true;

        if (!this.errorElement) {
          this.errorElement = this.questionElements[control.questionIndex];
        }
      }
    });
  }

  private navigateToErrorElement(): void {
    if (this.errorElement) {
      window.scrollTo({ top: this.errorElement.offsetTop - 100, behavior: 'smooth' });
    }

    this.errorElement = null;
  }
}
