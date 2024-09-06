import { By } from '@angular/platform-browser';
import { IFeedback } from './../../../../interfaces/feedback.interface';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FeedbackDetailComponent } from './feedback-detail.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { TextLengthModule } from '@pipes/text-length/text-length.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

// length 377
const commentMock = `Lorem ipsum dolor sit amet consectetur, adipisicing elit.
  Quidem assumenda illo error? Dolores, eveniet velit consequuntur aut, expedita eum vel exercitationem,
  quis corrupti aliquid obcaecati animi optio sit dolorem accusamus.
  Dolores, eveniet velit consequuntur aut, expedita eum vel exercitationem,
  quis corrupti aliquid obcaecati animi optio sit dolorem accusamus.`;

const userFeedbackMock: IFeedback = {
  employee: {
    isWork: true,
    id: 'EMPLOYEE_ID',
    name: 'EMPLOYEE_NAME',
    position: '',
    photo: ''
  },
  feedbackComment: commentMock,
  feedbackDate: 'Mon Jun 07 2021 11:16:16',
  feedbackAverageMark: 6,
  feedbackScale: {
    communicationSkills: 0,
    overallPerformance: 0,
    problemSolvingSkills: 0,
    professionalSkills: 0,
    qualityOfWork: 0,
    reliability: 0
  },
  type: 'Hidden'
};

describe('FeedbackDetailComponent', () => {
  let component: FeedbackDetailComponent;
  let fixture: ComponentFixture<FeedbackDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackDetailComponent],
      imports: [
        SafeHtmlModule,
        TextLengthModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackDetailComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    component.userFeedback = userFeedbackMock;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('employeePhoto should be empty', () => {
    component.userFeedback = { ...userFeedbackMock };
    fixture.detectChanges();

    expect(component.employeePhoto).toBeFalsy();
  });

  it('employeePhoto should not be empty', () => {
    component.userFeedback = { ...userFeedbackMock, employee: { ...userFeedbackMock.employee, photo: 'photo' } };
    fixture.detectChanges();

    expect(component.employeePhoto).toBeTruthy();
  });

  it('should display secret chips', () => {
    component.userFeedback = { ...userFeedbackMock, type: 'Hidden' };
    fixture.detectChanges();

    const chips = fixture.debugElement.query(By.css('.secret'));
    expect(chips.nativeElement.textContent).toContain('Secret');
  });

  it('should display Anonymous chips', () => {
    component.userFeedback = { ...userFeedbackMock, type: 'Anonymous' };
    fixture.detectChanges();

    const chips = fixture.debugElement.query(By.css('.anonymous'));
    expect(chips.nativeElement.textContent).toContain('Anonymous');
  });

  it('should display Client chips', () => {
    component.userFeedback = { ...userFeedbackMock, isCustomer: true };
    fixture.detectChanges();

    const chips = fixture.debugElement.query(By.css('.client'));
    expect(chips.nativeElement.textContent).toContain('Client');
  });
});
