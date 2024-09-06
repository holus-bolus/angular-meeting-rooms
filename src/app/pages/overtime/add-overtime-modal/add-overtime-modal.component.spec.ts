import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddOvertimeModalComponent } from './add-overtime-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddOvertimeModalComponent', () => {
  let component: AddOvertimeModalComponent;
  let fixture: ComponentFixture<AddOvertimeModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOvertimeModalComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOvertimeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create???', () => {
  //   expect(component).toBeTruthy();
  // });
});
