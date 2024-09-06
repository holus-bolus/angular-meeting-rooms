import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FeedbackRequestSuccessModalComponent } from './feedback-request-success-modal.component';
import { SafePipe } from '@pipes/safe-html/safe-html.pipe';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

const matDialogDataMock = [
  {
    id: '1',
    name: 'requestedEmployee1',
    checked: true,
    disabled: false,
    selectionName: 'test',
    place: 'test',
    photo: 'test',
    level: 'test',
    technologyId: 'test',
    currency: 'test',
    position: 'test'
  },
  {
    id: '2',
    name: 'requestedEmployee2',
    checked: true,
    disabled: false,
    selectionName: 'test2',
    place: 'test2',
    photo: 'test2',
    level: 'test2',
    technologyId: 'test2',
    currency: 'test2',
    position: 'test2'
  }
];

describe('AskForFeedbackSuccessfulComponent', () => {
  let component: FeedbackRequestSuccessModalComponent;
  let fixture: ComponentFixture<FeedbackRequestSuccessModalComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackRequestSuccessModalComponent, SafePipe],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: matDialogDataMock },
        { provide: MatDialogRef, useValue: { close: () => { } } },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackRequestSuccessModalComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init requestedEmployees variable', () => {
    expect(component.requestedEmployees).toEqual(matDialogDataMock);
  });

  it('should display employees', () => {
    const employees = fixture.debugElement.nativeElement.querySelectorAll('span');

    expect(employees.length).toBe(2);
  });

  matDialogDataMock.forEach(({ name }, index) => {
    it(`should display name ${name}`, () => {
      const employees = fixture.debugElement.nativeElement.querySelectorAll('span');

      expect(employees[index].textContent).toContain(name);
    });
  });

  it('should close window from code', () => {
    const modal = TestBed.inject(MatDialogRef);
    spyOn(modal, 'close');

    component.onClose();

    expect(modal.close).toHaveBeenCalledTimes(1);
  });

  it('should close window by btn clicking', () => {
    const closeBtn = fixture.debugElement.nativeElement.querySelector('.modal-ask-for-feedback-successful-button');

    const modal = TestBed.inject(MatDialogRef);
    spyOn(modal, 'close');

    closeBtn.click();

    expect(modal.close).toHaveBeenCalledTimes(1);
  });
});
