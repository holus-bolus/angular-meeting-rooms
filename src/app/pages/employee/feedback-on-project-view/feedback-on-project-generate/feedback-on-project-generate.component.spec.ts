import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FeedbackOnProjectGenerateComponent } from './feedback-on-project-generate.component';

describe('FeedbackOnProjectGenerateComponent', () => {
  let component: FeedbackOnProjectGenerateComponent;
  let fixture: ComponentFixture<FeedbackOnProjectGenerateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackOnProjectGenerateComponent],
      imports: [MatDialogModule],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackOnProjectGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
