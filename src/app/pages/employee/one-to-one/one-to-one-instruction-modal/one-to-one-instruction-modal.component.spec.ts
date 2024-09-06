import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OneToOneInstructionModalComponent } from './one-to-one-instruction-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SafePipe } from '@pipes/safe-html/safe-html.pipe';

describe('OneToOneInstructionModalComponent', () => {
  let component: OneToOneInstructionModalComponent;
  let fixture: ComponentFixture<OneToOneInstructionModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OneToOneInstructionModalComponent, SafePipe],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneToOneInstructionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
