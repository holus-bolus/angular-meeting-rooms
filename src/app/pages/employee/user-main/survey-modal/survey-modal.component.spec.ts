import { FormControl, FormArray } from '@angular/forms';
import { SafeHtmlModule } from './../../../../pipes/safe-html/safe-html.module';
import { of } from 'rxjs';
import { SurveyModalComponent } from './survey-modal.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '@services/employee.service';
import { IQuestion } from '@interfaces/survey';
import { Inject } from '@angular/core';

const matDialogRefMock = {
  close: () => { },
  backdropClick: () => of(null)
};

const matDialogMock = {
  open: () => ({
    componentInstance: {
      cancelEvent: of(null),
      confirmEvent: of(null)
    },
    close: () => { },
    afterClosed: () => of(null)
  })
};

const questionMock = [
  {
    answers: [{ id: 'ANSWER_ID', answer: 'ANSWER', checked: false }]
  } as IQuestion
];

const dialogDataMock = {
  questions: questionMock,
  surveyId: 'SURVEY_ID'
};

describe('SurveyModalComponent', () => {
  let component: SurveyModalComponent;
  let fixture: ComponentFixture<SurveyModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyModalComponent],
      imports: [SafeHtmlModule],
      providers: [
        { provide: MatDialog, useValue: matDialogMock },
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock },
        { provide: EmployeeService, useValue: { sendSurvey: () => of(true) } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyModalComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      questionMock[0].answers[0].checked = true;
    });

    it('should set options from matDialogData', () => {
      component.options = null;
      expect(component.options).toBe(null);

      fixture.detectChanges();
      expect(component.options).toEqual(jasmine.any(Array));
    });

    it('should set answers checked to false', () => {
      const data = TestBed.inject(MAT_DIALOG_DATA);
      expect(data.questions[0].answers[0].checked).toBeTrue();

      fixture.detectChanges();
      expect(data.questions[0].answers[0].checked).toBeFalse();
    });

    it('should set tabCountQuestions to 1', () => {
      component.tabCountQuestions = null;
      expect(component.tabCountQuestions).toBe(null);

      fixture.detectChanges();
      expect(component.tabCountQuestions).toBe(1);
    });

    it('should call onFeedbackSkillsOnPage', () => {
      spyOn(component, 'onFeedbackSkillsOnPage').and.callThrough();

      fixture.detectChanges();
      expect(component.onFeedbackSkillsOnPage).toHaveBeenCalled();
    });

    it('should call formInit', () => {
      spyOn(component, 'formInit').and.callThrough();

      fixture.detectChanges();
      expect(component.formInit).toHaveBeenCalled();
    });
  });

  describe('formInit', () => {
    beforeEach(() => {
      component.options = questionMock;
    });

    it('should set radioControl', () => {
      component.radioControl = null;
      expect(component.radioControl).toBe(null);

      component.formInit();
      expect(component.radioControl).toEqual(jasmine.any(FormControl));
    });

    it('should set checkboxControl', () => {
      component.checkboxControl = null;
      expect(component.checkboxControl).toBe(null);

      component.formInit();
      expect(component.checkboxControl).toEqual(jasmine.any(FormControl));
    });

    it('should set questionFormArray [length = 1]', () => {
      component.questionsFormArray = null;
      expect(component.questionsFormArray).toBe(null);

      component.formInit();
      expect(component.questionsFormArray).toEqual(jasmine.any(FormArray));
      expect(component.questionsFormArray.controls.length).toBe(1);
    });
  });

  it('arrayPage should return array with length [tabCountQuestions]', () => {
    component.tabCountQuestions = 6;

    const result = component.arrayPage();
    expect(result).toEqual(jasmine.any(Array));
    expect(result.length).toBe(6);
  });

  describe('onPreviousPage', () => {
    it('should not set variables when currIndexSkill === 2', () => {
      component.currIndexSkill = 2;
      component.paginationIndex = 1;
      component.prevIndexSkill = 1;

      component.onPreviousPage();
      expect(component.currIndexSkill).toBe(2);
      expect(component.paginationIndex).toBe(1);
      expect(component.prevIndexSkill).toBe(1);
    });

    it('should set variables when currIndexSkill !== 2', () => {
      component.currIndexSkill = 3;
      component.paginationIndex = 3;
      component.prevIndexSkill = 3;

      component.onPreviousPage();
      expect(component.currIndexSkill).toBe(1);
      expect(component.paginationIndex).toBe(2);
      expect(component.prevIndexSkill).toBe(1);
    });
  });

  describe('onNextPage', () => {
    it('should not set variables when currIndexSkill > options.length', () => {
      component.options = Array(1);
      component.currIndexSkill = 2;
      component.paginationIndex = 1;
      component.prevIndexSkill = 1;

      component.onNextPage();
      expect(component.currIndexSkill).toBe(2);
      expect(component.paginationIndex).toBe(1);
      expect(component.prevIndexSkill).toBe(1);
    });

    it('should set variables when currIndexSkill < options.length', () => {
      component.options = Array(3);
      component.currIndexSkill = 2;
      component.paginationIndex = 1;
      component.prevIndexSkill = 1;

      component.onNextPage();
      expect(component.currIndexSkill).toBe(4);
      expect(component.paginationIndex).toBe(2);
      expect(component.prevIndexSkill).toBe(3);
    });
  });

  describe('paginationLength', () => {
    it('should return array with length 2 [options 4]', () => {
      component.options = Array(4);

      const result = component.paginationLength();
      expect(result).toEqual(jasmine.any(Array));
      expect(result.length).toBe(2);
    });

    it('should return array with length 2 [options 3]', () => {
      component.options = Array(3);

      const result = component.paginationLength();
      expect(result).toEqual(jasmine.any(Array));
      expect(result.length).toBe(2);
    });
  });

  it('should set post with index 1', () => {
    component.postArray = [];

    component.onRadioChanged(1, 'ANSWER_ID', 'OPTION_ID');
    expect(component.postArray[1]).toEqual({ answerId: 'ANSWER_ID', questionId: 'OPTION_ID' });
  });

  describe('onSelect', () => {
    beforeEach(() => {
      component.checkboxes = [];
    });
    it('should add answer [checked === true]', () => {
      component.onSelect({ checked: false } as IQuestion, true, 1, 'ANSWER_ID');
      expect(component.checkboxes[0]).toEqual({
        checkboxAnswer: { checked: true },
        questionId: 1,
        answerId: 'ANSWER_ID'
      });
    });

    it('should delete answer from list [checked === false]', () => {
      const answer = { checked: true } as IQuestion;
      component.checkboxes = [
        { checkboxAnswer: answer },
        { checkboxAnswer: { checked: true } }
      ];

      component.onSelect(answer, false, 1, 'ANSWER_ID');

      expect(component.checkboxes.length).toBe(1);
      expect(component.checkboxes).toEqual([{ checkboxAnswer: { checked: true } }]);
    });
  });
});
