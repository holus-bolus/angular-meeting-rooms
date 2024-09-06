import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { HrInterviewService } from '@services/hr-interview.service';
import { MOCK_HR_INTERVIEW_LIST } from '../hr-interview.const';

import { HrInterviewAnswersComponent } from './hr-interview-answers.component';

describe('HrInterviewAnswersComponent', () => {
  let component: HrInterviewAnswersComponent;
  let fixture: ComponentFixture<HrInterviewAnswersComponent>;

  const mockAnswer = {
    id: '1',
    answer: 'done',
    checked: true
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HrInterviewAnswersComponent],
      imports: [MatDialogModule, HttpClientTestingModule],
      providers: [HrInterviewService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrInterviewAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create HrInterviewAnswersComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('afterViewInit', () => {
    it('should call sendAnswers method', () => {
      const spy = spyOn(component, 'sendAnswers');
      component.ngAfterViewInit();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('showUncheckedIcon', () => {
    it('should return false if answer is checked', () => {
      mockAnswer.checked = true;

      expect(component.showUncheckedIcon(mockAnswer, MOCK_HR_INTERVIEW_LIST[0])).toBeFalsy();
    });

    it('should return true if answer is unchecked', () => {
      mockAnswer.checked = false;

      expect(component.showUncheckedIcon(mockAnswer, MOCK_HR_INTERVIEW_LIST[0])).toBeTruthy();
    });
  });

  describe('showAnswerLabel', () => {
    it('should return true if answer is not other field', () => {
      expect(component.showAnswerLabel(mockAnswer, MOCK_HR_INTERVIEW_LIST[0])).toBeTruthy();
    });

    it('should return false if answer is other field', () => {
      const mockHrInterviewList = { ...MOCK_HR_INTERVIEW_LIST[0], questionType: 'SingleAnswer' };

      mockAnswer.checked = false;

      expect(component.showAnswerLabel(mockAnswer, mockHrInterviewList)).toBeFalsy();
    });

    it('should return true if questionType is equal to single answer', () => {
      const mockHrInterviewList = { ...MOCK_HR_INTERVIEW_LIST[0], questionType: 'SingleAnswer' };

      mockAnswer.checked = true;

      expect(component.showAnswerLabel(mockAnswer, mockHrInterviewList)).toBeTruthy();
    });
  });
});
