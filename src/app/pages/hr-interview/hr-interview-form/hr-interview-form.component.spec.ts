import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { HR_INTERVIEW_OTHER_QUESTION, MOCK_HR_INTERVIEW_LIST } from '../hr-interview.const';

import { HrInterviewFormComponent } from './hr-interview-form.component';

describe('HrInterviewFormComponent', () => {
  let component: HrInterviewFormComponent;
  let fixture: ComponentFixture<HrInterviewFormComponent>;

  const mockAnswerId = '1d';
  const mockQuestionId = '2d';
  const mockValue = 'mock value';
  const mockForm = { [mockQuestionId]: MOCK_HR_INTERVIEW_LIST[0] };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HrInterviewFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrInterviewFormComponent);
    component = fixture.componentInstance;
    component.form = mockForm;
    component.otherQuestion = HR_INTERVIEW_OTHER_QUESTION;
    component.questionElements = [];
    fixture.detectChanges();
  });

  it('should create HrInterviewFormComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('onRadioButtonChoose', () => {
    it('should call upodateForm method', () => {
      const spy = spyOn<any>(component, 'updateForm');

      component.onRadioButtonChoose(mockAnswerId, mockQuestionId);

      expect(spy).toHaveBeenCalledWith(mockQuestionId, mockAnswerId);
    });
  });

  describe('sendInterview', () => {
    it('should call checkFormOnErrors method', () => {
      const spy = spyOn<any>(component, 'checkFormOnErrors');

      component.sendInterview();

      expect(spy).toHaveBeenCalled();
    });

    it('should set isSubmitted to true', () => {
      component.sendInterview();

      expect(component.isSubmitted).toBeTruthy();
    });

    it('should set isFormHasErrors to false', () => {
      component.sendInterview();

      expect(component.isFormHasErrors).toBeFalsy();
    });

    it('should call emit and updateHrInterviewList method if isFormHasErrors is false', () => {
      const updateSpy = spyOn<any>(component, 'updateHrInterviewList');
      const emitSpy = spyOn(component.sendForm, 'emit');

      component.sendInterview();

      expect(updateSpy).toHaveBeenCalled();
      expect(emitSpy).toHaveBeenCalled();
    });
  });

  describe('onSaveOtherField', () => {
    it('should transform answers and set this in form', () => {
      const mappedControlValue = MOCK_HR_INTERVIEW_LIST[0];

      mappedControlValue.answers = [
        {
          id: mockAnswerId,
          answer: mockValue,
          isOtherType: true,
          checked: true
        }
      ];

      component.onSaveOtherField(mockValue, mockQuestionId, mockAnswerId);

      expect(component.form[mockQuestionId]).toEqual(mappedControlValue);
    });
  });

  describe('onAddOtherField', () => {
    it('should should transform answers and add this in form', () => {
      const mockOtherQuestion = component.otherQuestion;

      mockOtherQuestion.answers = [
        {
          id: 'other',
          answer: mockValue,
          isOtherType: true,
          checked: true
        }
      ];

      const mockNewForm = { ...component.form, [mockOtherQuestion.id]: mockOtherQuestion };

      component.onAddOtherField(mockValue);

      expect(component.form).toEqual(mockNewForm);
    });
  });

  describe('onCheckboxChange', () => {
    it('should call update form with passed params', () => {
      const mockValue = { source: {}, checked: true } as MatCheckboxChange;
      const spy = spyOn<any>(component, 'updateForm');

      component.onCheckboxChange(mockValue, mockQuestionId, mockAnswerId);

      expect(spy).toHaveBeenCalledWith(mockQuestionId, mockAnswerId, mockValue.checked, true);
    });
  });

  describe('checkIsFilled', () => {
    it('should return true if one of answers is checked', () => {
      component.checkIsFilled(mockQuestionId);

      expect(component.checkIsFilled(mockQuestionId)).toBeTruthy();
    });

    it('should return false if all answers are unchecked', () => {
      component.form[mockQuestionId].answers[0].checked = false;

      const returnedValue = component.checkIsFilled(mockQuestionId);

      component.form[mockQuestionId].answers[0].checked = true;

      expect(returnedValue).toBeFalsy();
    });

    it('should update questionElements if method has questionElement parameter', () => {
      const element = {} as HTMLElement;

      component.checkIsFilled(mockQuestionId, element);

      expect(component.questionElements).toEqual([element]);
    });
  });

  describe('onCheckboxChange', () => {
    it('should call update form with passed params', () => {
      const mockValue = { source: {}, checked: true } as MatCheckboxChange;
      const spy = spyOn<any>(component, 'updateForm');

      component.onCheckboxChange(mockValue, mockQuestionId, mockAnswerId);

      expect(spy).toHaveBeenCalledWith(mockQuestionId, mockAnswerId, mockValue.checked, true);
    });
  });

  describe('isDisabled', () => {
    it('should return false if current answer is checked', () => {
      expect(component.isDisabled(0, mockQuestionId)).toBeFalsy();
    });

    it('should return true if current answer is unchecked', () => {
      component.form[mockQuestionId].answers[0].checked = false;

      const returnedValue = component.isDisabled(0, mockQuestionId);

      component.form[mockQuestionId].answers[0].checked = true;

      expect(returnedValue).toBeTruthy();
    });
  });

  describe('set hrInterviewList', () => {
    it('should call initForm', () => {
      const spy = spyOn<any>(component, 'initForm');

      component.hrInterviewList = [];

      expect(spy).toHaveBeenCalledWith([]);
    });

    it('should call next method in hrInterviewList subject', () => {
      const spy = spyOn(component.hrInterviewList$, 'next');

      component.hrInterviewList = [];

      expect(spy).toHaveBeenCalledWith([]);
    });
  });

  describe('initForm', () => {
    it('should set form from passing parameters', () => {
      component['initForm'](MOCK_HR_INTERVIEW_LIST);

      expect(component.form).toEqual(mockForm);
    });
  });

  describe('updateForm', () => {
    it('should update form according to the passed params', () => {
      component['updateForm'](mockQuestionId, mockAnswerId);

      expect(component.form[mockQuestionId]).toEqual(MOCK_HR_INTERVIEW_LIST[0]);
    });

    it('should update form according to the passed params for checkboxes ', () => {
      component['updateForm'](mockQuestionId, mockAnswerId, true, true);

      expect(component.form[mockQuestionId]).toEqual(MOCK_HR_INTERVIEW_LIST[0]);
    });
  });

  describe('checkFormOnErrors', () => {
    it('should set isFormHasErrors to true value if form has errors', () => {
      component.form[mockQuestionId].answers[0].checked = false;
      component['checkFormOnErrors']();
      component.form[mockQuestionId].answers[0].checked = true;

      expect(component.isFormHasErrors).toBeTruthy();
    });

    it('should set errorElement if it has no value before', () => {
      component.form[mockQuestionId].answers[0].checked = false;
      component.questionElements = [{} as HTMLElement];
      component['checkFormOnErrors']();
      component.form[mockQuestionId].answers[0].checked = true;

      expect(component.errorElement).toEqual(component.questionElements[component.form[mockQuestionId].questionIndex]);
    });
  });

  describe('navigateToErrorElement', () => {
    it('should call scrollTo from window if errorElement has value', () => {
      const spy = spyOn(window, 'scrollTo');

      component.errorElement = {} as HTMLElement;

      component['navigateToErrorElement']();

      expect(spy).toHaveBeenCalled();
    });

    it('should set errorElement to null', () => {
      component['navigateToErrorElement']();

      expect(component.errorElement).toBeNull();
    });
  });
});
