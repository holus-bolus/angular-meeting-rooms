import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule } from './../../../../core/andkit/components/pickers/date-picker/date-picker.module';
import { SelectControlModule } from '@andkit/components/select-control/select-control.module';
import { DateTimePickerModule } from '@andkit/components/date-time-picker/date-time-picker.module';
import { SafeHtmlModule } from './../../../../pipes/safe-html/safe-html.module';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OneToOneModalComponent } from '@pages/employee/one-to-one/one-to-one-modal/one-to-one-modal.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('DateTimePickerComponent', () => {
  let component: OneToOneModalComponent;
  let fixture: ComponentFixture<OneToOneModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneToOneModalComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        SafeHtmlModule,
        DateTimePickerModule,
        SelectControlModule,
        DatePickerModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => of(true) }) } },
        { provide: MatDialogRef, useValue: { close: () => { }, backdropClick: () => of(true) } }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneToOneModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call initBackdropClick', () => {
      spyOn<any>(component, 'initBackdropClick');

      fixture.detectChanges();

      expect(component['initBackdropClick']).toHaveBeenCalledTimes(1);
    });

    it('should call initMinStartDate', () => {
      spyOn<any>(component, 'initMinStartDate');

      fixture.detectChanges();

      expect(component['initMinStartDate']).toHaveBeenCalledTimes(1);
    });

    it('should call initForm', () => {
      spyOn<any>(component, 'initForm').and.callThrough();

      fixture.detectChanges();

      expect(component['initForm']).toHaveBeenCalledTimes(1);
    });

    it('should call initDateListener', () => {
      spyOn<any>(component, 'initDateListener');

      fixture.detectChanges();

      expect(component['initDateListener']).toHaveBeenCalledTimes(1);
    });

    it('should call initRiskOfLeavingListener', () => {
      spyOn<any>(component, 'initRiskOfLeavingListener');

      fixture.detectChanges();

      expect(component['initRiskOfLeavingListener']).toHaveBeenCalledTimes(1);
    });

    it('should call patchForm', () => {
      spyOn<any>(component, 'patchForm');

      fixture.detectChanges();

      expect(component['patchForm']).toHaveBeenCalledTimes(1);
    });
  });
});
