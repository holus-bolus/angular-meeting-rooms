import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfirmModalComponent } from './confirm-modal.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@andkit/components/buttons/button/button.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule,
        ButtonModule],
      declarations: [ConfirmModalComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cautionSvg should be truthy', () => {
    component.ngOnInit();
    expect(component.cautionSvg).toBeTruthy();
  });

  it('should emit event', () => {
    const spy = spyOn(component.confirmEvent, 'emit');
    component.confirm();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit event', () => {
    const cancelSpy = spyOn(component.cancelEvent, 'emit');
    const closeSpy = spyOn(component.closeParent, 'emit');
    component.cancelConfirm();
    expect(cancelSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
  });
});
