import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

import { HrInterviewModalComponent } from './hr-interview-modal.component';

describe('HrInterviewModalComponent', () => {
  let component: HrInterviewModalComponent;
  let fixture: ComponentFixture<HrInterviewModalComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HrInterviewModalComponent],
      imports: [MatDialogModule, RouterTestingModule, SafeHtmlModule, BrowserAnimationsModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }, { provide: Router, useValue: mockRouter }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrInterviewModalComponent);
    component = fixture.componentInstance;
    window.onbeforeunload = jasmine.createSpy();
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create HrInterviewModalComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('onClose', () => {
    it('should call navigate with param from Router', () => {
      component.isError = false;
      component.onClose();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});
