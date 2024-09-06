import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AssessmentComponent } from './assessment.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {TimezoneModule} from '@pipes/timezone/timezone.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ASSESSMENT_PAGES} from '@pages/assessment/coordinator-cabinet/coordinator-cabinet';
import {IAssessment} from '@interfaces/candidate';
import {SafeHtmlModule} from '@pipes/safe-html/safe-html.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('AssessmentsComponent', () => {
  let component: AssessmentComponent;
  let fixture: ComponentFixture<AssessmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentComponent ],
      imports: [ SafeHtmlModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule, TimezoneModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentComponent);
    component = fixture.componentInstance;
    component.assessment = {interviewerMatrix: {isDone: true, link: 'esttrhew'}} as IAssessment;
    component.type = ASSESSMENT_PAGES.INTERVIEW;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
