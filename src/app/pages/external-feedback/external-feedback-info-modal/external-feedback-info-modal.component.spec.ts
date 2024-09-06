import { SafeHtmlModule } from './../../../pipes/safe-html/safe-html.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalFeedbackInfoModalComponent } from './external-feedback-info-modal.component';

describe('ExternalFeedbackInfoModalComponent', () => {
  let component: ExternalFeedbackInfoModalComponent;
  let fixture: ComponentFixture<ExternalFeedbackInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExternalFeedbackInfoModalComponent],
      imports: [SafeHtmlModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalFeedbackInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
