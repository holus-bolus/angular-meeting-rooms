import { TYPE_SELECT_OPTIONS } from './../objectives-const';
import { ConfirmModalComponent } from '@andkit/components/modals/confirm-modal/confirm-modal.component';
import { TYPE_SELECT_OPTIONS_NAME } from './../../../../interfaces/objective';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

import { ObjectivesAddModalComponent } from './objectives-add-modal.component';
import { TYPE_SELECT_OPTIONS_IDS, IObjective, TYPE_OBJECTIVE_STATUS_NAME } from '@interfaces/objective';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const matDialogOpenMock = {
  componentInstance: {
    cancelEvent: of({}),
    confirmEvent: of({}),
    onClose: () => { }
  },
  backdropClick: () => of({}),
  afterClosed: () => of({}),
  close: () => { }
};

const objectiveMock: IObjective = {
  employeeId: 'EMPLOYEE_ID',
  objective: 'OBJECTIVE',
  type: TYPE_SELECT_OPTIONS_NAME.HARD_SKILLS,
  dueDate: 'DUE_DATE',
  comment: 'COMMENT',
  status: TYPE_OBJECTIVE_STATUS_NAME.DONE
};

describe('ObjectivesAddModalComponent', () => {
  let component: ObjectivesAddModalComponent;
  let fixture: ComponentFixture<ObjectivesAddModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectivesAddModalComponent],
      imports: [HttpClientTestingModule, SafeHtmlModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
          provide: MatDialog,
          useValue: { open: () => matDialogOpenMock, closeAll: () => { } }
        },
        { provide: MatDialogRef, useValue: { close: () => { } } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectivesAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('should create ObjectivesAddModalComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('iniForm', () => {
    it('should set value OBJECTIVE to objectiveControl', () => {
      component.formData = { ...objectiveMock };

      component.initForm();

      expect(component.objectiveControl.value).toBe('OBJECTIVE');
    });

    it('should set empty string to objectiveControl', () => {
      component.initForm();

      expect(component.objectiveControl.value).toBe('');
    });

    it('should set value COMMENT to commentControl', () => {
      component.formData = { ...objectiveMock };

      component.initForm();

      expect(component.commentControl.value).toBe('COMMENT');
    });

    it('should set empty string to commentControl', () => {
      component.initForm();

      expect(component.commentControl.value).toBe('');
    });

    it('should set value HardSkills to typeControl', () => {
      component.formData = { ...objectiveMock };

      component.initForm();

      expect(component.typeControl.value).toEqual({
        id: TYPE_SELECT_OPTIONS_IDS.HARD_SKILLS,
        name: TYPE_SELECT_OPTIONS_NAME.HARD_SKILLS
      });
    });

    it('should set empty string to typeControl', () => {
      component.initForm();

      expect(component.typeControl.value).toBe('');
    });

    it('should set value DUE_DATE to dateControl', () => {
      component.formData = { ...objectiveMock };

      component.initForm();

      expect(component.dateControl.value).toBe('DUE_DATE');
    });

    it('should set empty string to dateControl', () => {
      component['nextAssessmentDate'] = 'NEXT_DATE';
      component.initForm();

      expect(component.dateControl.value).toBe('NEXT_DATE');
    });

    it('should call currentForm.addControl 4 times', () => {
      spyOn(component.currentForm, 'addControl');

      component.initForm();

      expect(component.currentForm.addControl).toHaveBeenCalledTimes(4);
    });

    it('should add all controls', () => {
      const expected = {
        objective: '',
        comment: '',
        objectiveType: '',
        dueDate: null
      };

      component.initForm();

      expect(component.currentForm.value).toEqual(expected);
    });
  });

  describe('get modalTitle', () => {
    it('should be Objective', () => {
      component.isDisabled = true;

      expect(component.modalTitle).toBe('Objective');
    });

    it('should be Edit Objective', () => {
      component.isDisabled = false;
      component.formData = { ...objectiveMock };

      expect(component.modalTitle).toBe('Edit Objective');
    });

    it('should be Add Objective', () => {
      component.isDisabled = false;
      component.formData = null;

      expect(component.modalTitle).toBe('Add Objective');
    });
  });

  describe('onClose', () => {
    it('should call modalWindow.closeAll', () => {
      const modal = TestBed.inject(MatDialog);

      component.isDisabled = true;
      spyOn(modal, 'closeAll');

      component.onClose();

      expect(modal.closeAll).toHaveBeenCalledTimes(1);
    });

    it('should call showConfirmPopup', () => {
      component.isDisabled = false;
      spyOn<any>(component, 'showConfirmPopup');

      component.onClose();

      expect(component['showConfirmPopup']).toHaveBeenCalledTimes(1);
    });
  });

  describe('showConfirmPopup', () => {
    let config;
    let modal;

    beforeEach(() => {
      config = {
        width: '496px',
        data: {
          titleText: '',
          subtitleText: '',
          cancelBtnText: 'No',
          confirmBtnText: 'Yes'
        }
      };

      modal = TestBed.inject(MatDialog);
      spyOn(modal, 'open').and.callThrough();
    });

    it('should open modal window', () => {
      component['showConfirmPopup']();

      expect(modal.open).toHaveBeenCalledTimes(1);
    });

    it('should call modal open with Cancel editing objective? && Your changes won’t be saved', () => {
      config.data.titleText = 'Cancel editing objective?';
      config.data.subtitleText = 'Your changes won’t be saved';
      component.formData = { ...objectiveMock };

      component['showConfirmPopup']();

      expect(modal.open).toHaveBeenCalledWith(ConfirmModalComponent, config);
    });

    it('should call modal open with Cancel adding objective? && Your objective won’t be added', () => {
      config.data.titleText = 'Cancel adding objective?';
      config.data.subtitleText = 'Your objective won’t be added';
      component.formData = null;

      component['showConfirmPopup']();

      expect(modal.open).toHaveBeenCalledWith(ConfirmModalComponent, config);
    });
  });

  describe('findTypeValue', () => {
    it('should return Hard Skills response', () => {
      component.isDisabled = false;

      const actual = component['findTypeValue'](TYPE_SELECT_OPTIONS_NAME.HARD_SKILLS);

      expect(actual).toBe(TYPE_SELECT_OPTIONS[2]);
    });

    it('should return Hard Skills string', () => {
      component.isDisabled = true;

      const actual = component['findTypeValue'](TYPE_SELECT_OPTIONS_NAME.HARD_SKILLS);

      expect(actual).toBe('Hard Skills');
    });

    // see ngOnInit typeOfObjectives
    it('should return Soft skills string', () => {
      component.isDisabled = true;

      const actual = component['findTypeValue'](undefined);

      expect(actual).toBe('Soft Skills');
    });
  });

  describe('assignNextAssessmentDate', () => {
    it('should return null', () => {
      const actual = component['assignNextAssessmentDate']();

      expect(actual).toBe(null);
    });

    it('should return date', () => {
      const date = new Date(Date.now() + (3600 * 1000 * 48)).toISOString();
      const actual = component['assignNextAssessmentDate'](date);

      expect(actual).toBe(date);
    });
  });

  describe('onSubmit', () => {
    const formValue = {
      objective: 'objective',
      comment: 'comment',
      objectiveType: TYPE_SELECT_OPTIONS[2], // hard skills
      dueDate: new Date().toISOString()
    };
    const expected = {
      ...formValue,
      employeeId: 'EMPLOYEE_ID',
      interviewerId: 'INTERVIEWER_ID',
      objectiveStatus: 2,
      objectiveType: 'HardSkills'
    } as IObjective;

    it('form should not be valid', () => {
      component.onSubmit();

      expect(component.currentForm.valid).toBe(false);
    });

    it('form should be valid', () => {
      component.currentForm.patchValue(formValue);

      component.onSubmit();

      expect(component.currentForm.valid).toBe(true);
    });

    it('should call dialog.close with form value', () => {
      component.currentForm.patchValue(formValue);
      component['employeeId'] = 'EMPLOYEE_ID';
      component['interviewerId'] = 'INTERVIEWER_ID';
      component.formData = null;

      const dialog = TestBed.inject(MatDialogRef);

      spyOn<any>(dialog, 'close');

      component.onSubmit();

      expect(dialog.close).toHaveBeenCalledWith({ data: expected });
    });

    it('should call dialog.close with expected value and id', () => {
      component.currentForm.patchValue(formValue);
      component['employeeId'] = 'EMPLOYEE_ID';
      component['interviewerId'] = 'INTERVIEWER_ID';
      component.formData = { ...objectiveMock, id: 'FORM_DATA_ID' };

      const dialog = TestBed.inject(MatDialogRef);

      spyOn<any>(dialog, 'close');

      component.onSubmit();

      expect(dialog.close).toHaveBeenCalledWith({ id: 'FORM_DATA_ID', data: expected });
    });
  });

  it('typeOfObjectives should contain None', () => {
    component.isDisabled = true;
    component.typeOfObjectives = TYPE_SELECT_OPTIONS;

    component.ngOnInit();

    expect(component.typeOfObjectives.length).toBe(5);
    expect(component.typeOfObjectives[0].id).toBe('None');
  });

  it('typeOfObjectives should not contain None', () => {
    component.isDisabled = false;
    component.typeOfObjectives = TYPE_SELECT_OPTIONS;

    component.ngOnInit();

    expect(component.typeOfObjectives.length).toBe(4);
    expect(component.typeOfObjectives[0].id).toBe('SoftSkills');
  });

});
