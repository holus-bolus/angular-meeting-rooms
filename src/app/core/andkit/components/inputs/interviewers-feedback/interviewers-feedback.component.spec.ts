import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InterviewersFeedbackComponent } from './interviewers-feedback.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

describe('InterviewFeedbackComponent', () => {
  let component: InterviewersFeedbackComponent;
  let fixture: ComponentFixture<InterviewersFeedbackComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewersFeedbackComponent ],
      imports: [ SafeHtmlModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewersFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
