import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FeedbackOnProjectViewComponent } from './feedback-on-project-view.component';

describe('FeedbackOnProjectGenerateComponent', () => {
  let component: FeedbackOnProjectViewComponent;
  let fixture: ComponentFixture<FeedbackOnProjectViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackOnProjectViewComponent],
      imports: [MatDialogModule],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackOnProjectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
