import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IQuestionnaireEmployee, IQuestionnaireResults } from '@interfaces/survey';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { cloneDeep } from 'lodash';

import { SurveyResultsModalComponent } from './survey-results-modal.component';

const employeesMock: IQuestionnaireEmployee[] = [
  {
    employeeFullName: 'FULL_NAME 1',
    employeeId: '1',
    employeeStatus: 'STATUS',
    value: 8
  },
  {
    employeeFullName: 'FULL_NAME 2',
    employeeId: '2',
    employeeStatus: 'STATUS',
    value: 8
  },
  {
    employeeFullName: 'FULL_NAME 3',
    employeeId: '3',
    employeeStatus: 'STATUS',
    value: 5
  },
  {
    employeeFullName: 'FULL_NAME 4',
    employeeId: '4',
    employeeStatus: 'STATUS',
    value: 5
  },
  {
    employeeFullName: 'FULL_NAME 5',
    employeeId: '5',
    employeeStatus: 'STATUS',
    value: 7
  },
];

const resultsMock: IQuestionnaireResults = {
  maxValue: 5,
  employees: employeesMock
};

describe('SurveyResultsModalComponent', () => {
  let component: SurveyResultsModalComponent;
  let fixture: ComponentFixture<SurveyResultsModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyResultsModalComponent],
      imports: [SafeHtmlModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: cloneDeep(resultsMock) },
        { provide: MatDialogRef, useValue: { close: () => { } } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyResultsModalComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => fixture.destroy());

  it('should create SurveyResultsModalComponent', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should set perfectMatch, simpleMatch and goodMatch', () => {
    fixture.detectChanges();

    expect(component.perfectMatch$.value.length).toBe(2);
    expect(component.simpleMatch$.value.length).toBe(2);
    expect(component.goodMatch$.value.length).toBe(1);
  });

  it('isMatches.next should emit true', () => {
    spyOn(component.isMatches$, 'next');

    fixture.detectChanges();

    expect(component.isMatches$.next).toHaveBeenCalledOnceWith(true);
  });

  it('onClose should call dialogRef.close', () => {
    const dialogRef = TestBed.inject(MatDialogRef);
    spyOn(dialogRef, 'close');

    component.onClose();

    expect(dialogRef.close).toHaveBeenCalledTimes(1);
  });
});
