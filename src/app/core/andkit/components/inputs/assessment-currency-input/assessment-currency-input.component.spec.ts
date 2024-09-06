import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssessmentCurrencyInputComponent } from './assessment-currency-input.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AssessmentCurrencyInputComponent', () => {
  let component: AssessmentCurrencyInputComponent;
  let fixture: ComponentFixture<AssessmentCurrencyInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentCurrencyInputComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentCurrencyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
