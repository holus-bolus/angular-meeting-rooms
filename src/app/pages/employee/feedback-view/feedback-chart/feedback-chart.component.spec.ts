import { FeedbackService } from './../../../../core/services/feedback.service';
import { IFeedbackData } from './../../../../interfaces/feedback.interface';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FeedbackChartComponent } from './feedback-chart.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FEEDBACK_SKILLS } from '@pages/feedback/feedback-const';

const feedbackDataMock: IFeedbackData = {
  employeeName: 'EMPLOYEE_NAME',
  feedbacks: [],
  averageFeedbackScale: {
    communicationSkills: 1,
    overallPerformance: 2,
    problemSolvingSkills: 3,
    professionalSkills: 4,
    qualityOfWork: 5,
    reliability: 5
  },
  canAskFeedback: true,
  selfFeedbackScale: {
    communicationSkills: 5,
    overallPerformance: 4,
    problemSolvingSkills: 3,
    professionalSkills: 2,
    qualityOfWork: 1,
    reliability: 1
  },
  canAskFeedbackExternal: true
};

const feedbackSkillsMock = {
  communicationSkills: 'Communication skills',
  overallPerformance: 'Overall performance',
  problemSolvingSkills: 'Problem solving skills',
  professionalSkills: 'Professional skills',
  qualityOfWork: 'Quality of work',
  reliability: 'Reliability'
};

describe('FeedbackChartComponent', () => {
  let component: FeedbackChartComponent;
  let fixture: ComponentFixture<FeedbackChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackChartComponent],
      imports: [MatProgressBarModule],
      providers: [
        {
          provide: FeedbackService,
          useValue: {
            getFeedbackSkillName: (key: string) => {
              const feedBackSkill = FEEDBACK_SKILLS.find(name => name.skill === key);

              return feedBackSkill ? feedBackSkill.name : '';
            }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackChartComponent);
    component = fixture.componentInstance;

    component.averageFeedbackData = feedbackDataMock.averageFeedbackScale;
    component.selfFeedbackData = feedbackDataMock.selfFeedbackScale;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init variables', () => {
    const average = feedbackDataMock.averageFeedbackScale;
    const self = feedbackDataMock.selfFeedbackScale;

    expect(component.averageFeedbackData).toEqual(average);
    expect(component.selfFeedbackData).toEqual(self);
  });

  Object.keys(feedbackDataMock.averageFeedbackScale).forEach((key) => {

    it(`getFeedbackSkillName should return ${feedbackSkillsMock[key]} by ${key} key`, () => {
      const expected = feedbackSkillsMock[key];
      const actual = component.getFeedbackSkillName(key);

      expect(actual).toBe(expected);
    });
  });

  it('getFeedbackSkillName should return empty string', () => {
    const actual = component.getFeedbackSkillName('wrongKey');

    expect(actual).toBe('');
  });
});
