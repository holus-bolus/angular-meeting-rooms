import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OneToOneConfirmModalComponent } from './one-to-one-confirm-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('OneToOneConfirmModalComponent', () => {
  let component: OneToOneConfirmModalComponent;
  let fixture: ComponentFixture<OneToOneConfirmModalComponent>;
  const data = {
    oneToOneActionData: {
      action: {
        name: 'Add'
      },
      id: 'add'
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OneToOneConfirmModalComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: { close: () => { } } }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneToOneConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
