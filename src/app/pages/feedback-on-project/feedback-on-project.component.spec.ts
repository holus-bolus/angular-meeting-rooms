import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FeedbackOnProjectComponent } from './feedback-on-project.component';

describe('FeedbackOnProjectComponent', () => {
  let component: FeedbackOnProjectComponent;
  let fixture: ComponentFixture<FeedbackOnProjectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackOnProjectComponent],
      imports: [MatDialogModule],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackOnProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
