import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SlideTogglerComponent } from './slide-toggler.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { OneToOneConfirmModalComponent } from '@pages/employee/one-to-one/one-to-one-confirm-modal/one-to-one-confirm-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SlideTogglerComponent', () => {
  let component: SlideTogglerComponent;
  let fixture: ComponentFixture<SlideTogglerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SlideTogglerComponent, OneToOneConfirmModalComponent],
      imports: [MatSlideToggleModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
