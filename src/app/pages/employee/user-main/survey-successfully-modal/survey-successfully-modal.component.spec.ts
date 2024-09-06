import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

import { SurveySuccessfullyModalComponent } from './survey-successfully-modal.component';

describe('SurveySuccessfullyModalComponent', () => {
  let component: SurveySuccessfullyModalComponent;
  let fixture: ComponentFixture<SurveySuccessfullyModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SurveySuccessfullyModalComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: { close: () => { } } }
      ],
      imports: [SafeHtmlModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveySuccessfullyModalComponent);
    component = fixture.componentInstance;
  });

  it('should create SurveySuccessfullyModalComponent', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('onClose should call dialogRef.close', () => {
    const dialogRef = TestBed.inject(MatDialogRef);
    spyOn(dialogRef, 'close');

    component.onClose();

    expect(dialogRef.close).toHaveBeenCalledTimes(1);
  });
});
