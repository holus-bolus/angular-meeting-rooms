import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FeedbackTextareaComponent } from './feedback-textarea.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatInputModule } from '@angular/material/input';

describe('FeedbackTextareaComponent', () => {
  let component: FeedbackTextareaComponent;
  let fixture: ComponentFixture<FeedbackTextareaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackTextareaComponent ],
      imports: [ SafeHtmlModule, MatInputModule, ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
