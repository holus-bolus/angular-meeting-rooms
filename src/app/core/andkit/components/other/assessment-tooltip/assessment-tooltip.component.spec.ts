import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AssessmentTooltipComponent } from './assessment-tooltip.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AssessmentTooltipComponent', () => {
  let component: AssessmentTooltipComponent;
  let fixture: ComponentFixture<AssessmentTooltipComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [AssessmentTooltipComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
