import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FeedbackSkillComponent } from './feedback-skill.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FeedbackSkillComponent', () => {
  let component: FeedbackSkillComponent;
  let fixture: ComponentFixture<FeedbackSkillComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackSkillComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
