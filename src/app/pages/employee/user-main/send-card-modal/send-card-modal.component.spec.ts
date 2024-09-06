import { BlurEvent } from '@ckeditor/ckeditor5-angular';
import { of } from 'rxjs';
import { AndkitModule } from '@andkit/andkit.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { EmployeeService } from '@services/employee.service';
import { SendCardModalComponent } from './send-card-modal.component';

describe('SendCardModalComponent', () => {
  let component: SendCardModalComponent;
  let fixture: ComponentFixture<SendCardModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SendCardModalComponent],
      imports: [SafeHtmlModule, AndkitModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { surveyId: 'SURVEY_ID', questions: [] } },
        { provide: EmployeeService, useValue: { sendPostCard: () => of(true) } },
        { provide: MatDialog, useValue: { closeAll: () => { } } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendCardModalComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => fixture.destroy());

  it('should create SendCardModalComponent', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('onLeftButtonClick', () => {
    it('should call prepareImage', () => {
      spyOn<any>(component, 'prepareImage');

      component.onLeftButtonClick('Send');

      expect(component['prepareImage']).toHaveBeenCalledTimes(1);
    });

    it('isStartWindow$ should emit false', () => {
      spyOn<any>(component.isStartWindow$, 'next');

      component.onLeftButtonClick('Preview');

      expect(component.isStartWindow$.next).toHaveBeenCalledOnceWith(false);
    });

    it('leftButtonName$ should emit Send', () => {
      spyOn<any>(component.leftButtonName$, 'next');

      component.onLeftButtonClick('Preview');

      expect(component.leftButtonName$.next).toHaveBeenCalledOnceWith('Send');
    });

    it('rightButtonName$ should emit Edit', () => {
      spyOn<any>(component.rightButtonName$, 'next');

      component.onLeftButtonClick('Preview');

      expect(component.rightButtonName$.next).toHaveBeenCalledOnceWith('Edit');
    });
  });

  describe('onRightButtonClick', () => {
    it('should call modal.closeAll', () => {
      const modal = TestBed.inject(MatDialog);
      spyOn<any>(modal, 'closeAll');

      component.onRightButtonClick('Cancel');

      expect(modal.closeAll).toHaveBeenCalledTimes(1);
    });

    it('isStartWindow$ should emit true', () => {
      spyOn<any>(component.isStartWindow$, 'next');

      component.onRightButtonClick('Edit');

      expect(component.isStartWindow$.next).toHaveBeenCalledOnceWith(true);
    });

    it('leftButtonName$ should emit Preview', () => {
      spyOn<any>(component.leftButtonName$, 'next');

      component.onRightButtonClick('Edit');

      expect(component.leftButtonName$.next).toHaveBeenCalledOnceWith('Preview');
    });

    it('rightButtonName$ should emit Cancel', () => {
      spyOn<any>(component.rightButtonName$, 'next');

      component.onRightButtonClick('Edit');

      expect(component.rightButtonName$.next).toHaveBeenCalledOnceWith('Cancel');
    });
  });

  it('chooseCard should set cardNumber [6]', () => {
    component['cardNumber'] = null;
    expect(component['cardNumber']).toBe(null);

    component.chooseCard(6);
    expect(component['cardNumber']).toBe(6);
  });

  it('onEditorBlur should set editorText', () => {
    const event = { editor: { getData: () => 'Data' } } as BlurEvent;

    component.onEditorBlur(event);
    expect(component.editorText).toBe('Data');
  });

  describe('prepareImage', () => {
    beforeEach(() => {
      component.capture = { nativeElement: {} };
    });

    it('isButtonDisable$ should emit true', () => {
      spyOn(component.isButtonDisable$, 'next');

      component['prepareImage']();
      expect(component.isButtonDisable$.next).toHaveBeenCalledWith(true);
    });

    it('isShowLoader$ should emit true', () => {
      spyOn(component.isShowLoader$, 'next');

      component['prepareImage']();
      expect(component.isShowLoader$.next).toHaveBeenCalledWith(true);
    });
  });
});
