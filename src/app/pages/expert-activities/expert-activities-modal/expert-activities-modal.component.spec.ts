import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

import { ExpertActivitiesModalComponent } from './expert-activities-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ExpertActivitiesModalComponent', () => {
  let component: ExpertActivitiesModalComponent;
  let fixture: ComponentFixture<ExpertActivitiesModalComponent>;

  const mockData = {
    expertActivities: [
      { id: 'id', isActive: false }
    ]
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertActivitiesModalComponent],
      imports: [SafeHtmlModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MatDialog, useValue: { closeAll: () => { } } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertActivitiesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ExpertActivitiesModalComponent', () => {
    expect(component).toBeTruthy();
  });

  it('editActivitiesStatus should return array', () => {
    component.createControls();

    const actual = component.editActivitiesStatus();

    expect(actual).toEqual(jasmine.any(Array));
  });

  it('onSubmit should emit value', () => {
    spyOn(component.checkedActivities, 'emit');

    component.onSubmit();

    expect(component.checkedActivities.emit).toHaveBeenCalledWith(jasmine.any(Array));
  });

  it('onSubmit should call window closeAll', () => {
    const modal = TestBed.inject(MatDialog);
    spyOn(modal, 'closeAll');

    component.onSubmit();

    expect(modal.closeAll).toHaveBeenCalledTimes(1);
  });

  it('onClose should call window closeAll', () => {
    const modal = TestBed.inject(MatDialog);
    spyOn(modal, 'closeAll');

    component.onClose();

    expect(modal.closeAll).toHaveBeenCalledTimes(1);
  });

  it('onClick should call modal closeAll', () => {
    const target = document.createElement('DIV');
    target.classList.add('cdk-overlay-backdrop');

    const modal = TestBed.inject(MatDialog);
    spyOn(modal, 'closeAll');

    component.onClick(target);

    expect(modal.closeAll).toHaveBeenCalledTimes(1);
  });

  it('onClick should not call modal closeAll', () => {
    const target = document.createElement('DIV');

    const modal = TestBed.inject(MatDialog);
    spyOn(modal, 'closeAll');

    component.onClick(target);

    expect(modal.closeAll).not.toHaveBeenCalled();
  });
});
