import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ApprovedAssessmentComponent } from './approved-assessment.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from '@andkit/components/pickers/date-picker/date-picker.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  AssessmentAutocompleteModule
} from '@andkit/components/selects/assessment-autocomplete/assessment-autocomplete.module';
import {
  AssessmentTimePickerModule
} from '@andkit/components/pickers/assessment-time-picker/assessment-time-picker.module';
import { IAssessment } from '@interfaces/candidate';

const assessmentWithCompleteInterviewerMatrix = {interviewerMatrix: {isDone: true, link: ''}};

describe('ApprovedAssessmentComponent', () => {
  let component: ApprovedAssessmentComponent;
  let fixture: ComponentFixture<ApprovedAssessmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        DatePickerModule,
        BrowserAnimationsModule,
        AssessmentAutocompleteModule,
        AssessmentTimePickerModule
      ],
      declarations: [ ApprovedAssessmentComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedAssessmentComponent);
    component = fixture.componentInstance;
    component.assessment = assessmentWithCompleteInterviewerMatrix as IAssessment;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
