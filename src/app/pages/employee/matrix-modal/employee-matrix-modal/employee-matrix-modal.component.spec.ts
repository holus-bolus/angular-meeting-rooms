import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmployeeMatrixModalComponent } from './employee-matrix-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

describe('ModalComponent', () => {
  let component: EmployeeMatrixModalComponent;
  let fixture: ComponentFixture<EmployeeMatrixModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeMatrixModalComponent ],
      imports: [ SafeHtmlModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeMatrixModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
