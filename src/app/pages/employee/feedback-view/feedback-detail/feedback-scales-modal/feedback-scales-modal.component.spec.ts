import { By } from '@angular/platform-browser';
import { FEEDBACK_SKILLS } from './../../../../feedback/feedback-const';
import { FeedbackService } from './../../../../../core/services/feedback.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FeedbackScalesModalComponent } from './feedback-scales-modal.component';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const scaleData = Object.entries({
  communicationSkills: 1,
  overallPerformance: 2,
  problemSolvingSkills: 3,
  professionalSkills: 4,
  qualityOfWork: 5,
  reliability: 5
});

const feedbackSkillsMock = {
  communicationSkills: 'Communication skills',
  overallPerformance: 'Overall performance',
  problemSolvingSkills: 'Problem solving skills',
  professionalSkills: 'Professional skills',
  qualityOfWork: 'Quality of work',
  reliability: 'Reliability'
};

describe('FeedbackScalesModalComponent', () => {
  let component: FeedbackScalesModalComponent;
  let fixture: ComponentFixture<FeedbackScalesModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackScalesModalComponent],
      imports: [MatSliderModule, HttpClientTestingModule],
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
    fixture = TestBed.createComponent(FeedbackScalesModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  scaleData.forEach((scale) => {
    it(`should display ${feedbackSkillsMock[scale[0]]} description by ${scale[0]} key`, () => {
      component.scaleItem = scale;
      fixture.detectChanges();

      const description = fixture.debugElement.query(By.css('.feedback-scale-description'));
      expect(description.nativeElement.textContent.trim()).toBe(feedbackSkillsMock[scale[0]]);
    });

    it(`value should be ${scale[1]}`, () => {
      component.scaleItem = scale;
      fixture.detectChanges();

      const slider = fixture.debugElement.query(By.css('.feedback-scale-range-slider'));
      expect(slider.nativeElement.textContent).toBe(scale[1].toString());
    });
  });
});
