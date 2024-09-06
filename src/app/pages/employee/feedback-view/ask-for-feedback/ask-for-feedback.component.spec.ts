import { FeedbackRequestSuccessModalComponent } from './../feedback-request-success-modal/feedback-request-success-modal.component';
import { cloneDeep } from 'lodash';
import { ConfirmModalComponent } from '@andkit/components/modals/confirm-modal/confirm-modal.component';
import { ICommonOption } from './../../../../interfaces/filter';
import { IEmployeeTeammates } from './../../../../interfaces/employee';
import { FeedbackService } from './../../../../core/services/feedback.service';
import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';

import { AskForFeedbackComponent } from './ask-for-feedback.component';
import { Inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { SafePipe } from '@pipes/safe-html/safe-html.pipe';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AndkitModule } from '@andkit/andkit.module';

const teammatesMock: IEmployeeTeammates[] = [
  {
    id: '1',
    name: 'Teammate',
    roles: ['Role 1'],
    projectNames: ['Project 1'],
    photo: '',
    position: '',
    isEnabled: true
  },
  {
    id: '2',
    name: 'Teammate 2',
    roles: ['Role 2'],
    projectNames: ['Project 2'],
    photo: '',
    position: 'position',
    isEnabled: false
  },
];

const projectMock: ICommonOption[] = [
  { id: '1', name: 'Project' },
  { id: '2', name: 'Project 2' },
  { id: '3', name: 'Project 3' },
];

const matDialogDataMock = {
  userId: 'USER_ID',
  teammates: cloneDeep(teammatesMock),
  canAskFeedbackExternal: true,
  availableProjects: projectMock
};

describe('AskForFeedbackComponent', () => {
  let component: AskForFeedbackComponent;
  let fixture: ComponentFixture<AskForFeedbackComponent>;

  const feedbackService = jasmine.createSpyObj('FeedbackService', ['sendFeedbackRequest', 'getExternalFeedbackLink']);
  const matDialog = jasmine.createSpyObj('MatDialog', ['open']);
  matDialog.open.and.returnValue({
    componentInstance: {
      cancelEvent: of({}),
      confirmEvent: of({}),
    },
    close: () => { },
    afterClosed: () => of({})
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AskForFeedbackComponent, SafePipe],
      imports: [HttpClientTestingModule, AndkitModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: matDialogDataMock },
        { provide: MatDialogRef, useValue: { close: () => { } } },
        { provide: MatDialog, useValue: matDialog },
        { provide: FeedbackService, useValue: feedbackService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskForFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create AskForFeedbackComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should init component', () => {
    const spyForm = spyOn(component.currentForm, 'addControl');
    spyOn(component, 'isButtonActive');
    spyOn(component, 'initExternalFeedbackFormGroup');

    component.ngOnInit();

    expect(component.availableProjects$.value).toBe(projectMock);
    expect(component.isInternalFeedback$.value).toBe(false);
    expect(component.askForTypeFeedback$.value).toBe(true);

    expect(component.currentForm.addControl).toHaveBeenCalledTimes(2);
    expect(spyForm.calls.all()[0].args[0]).toBe('AllUsers');
    expect(spyForm.calls.all()[0].args[1]).toBe(component.allUsersControl);
    expect(spyForm.calls.all()[1].args[0]).toBe('Teammates');
    expect(spyForm.calls.all()[1].args[1]).toBe(component.teammatesControl);

    expect(component.isButtonActive).toHaveBeenCalledTimes(1);
    expect(component.initExternalFeedbackFormGroup).toHaveBeenCalledTimes(1);
  });

  it('initExternalFeedbackFormGroup should add controls', () => {
    const spyFrom = spyOn(component.externalFeedbackFormGroup, 'addControl');

    component.initExternalFeedbackFormGroup();

    expect(component.externalFeedbackFormGroup.addControl).toHaveBeenCalledTimes(5);
    expect(spyFrom.calls.all()[0].args[0]).toBe('name');
    expect(spyFrom.calls.all()[0].args[1]).toBe(component.externalFeedbackNameControl);
    expect(spyFrom.calls.all()[1].args[0]).toBe('surname');
    expect(spyFrom.calls.all()[1].args[1]).toBe(component.externalFeedbackSurnameControl);
    expect(spyFrom.calls.all()[2].args[0]).toBe('email');
    expect(spyFrom.calls.all()[2].args[1]).toBe(component.externalFeedbackEmailControl);
    expect(spyFrom.calls.all()[3].args[0]).toBe('position');
    expect(spyFrom.calls.all()[3].args[1]).toBe(component.externalFeedbackPositionControl);
    expect(spyFrom.calls.all()[4].args[0]).toBe('project');
    expect(spyFrom.calls.all()[4].args[1]).toBe(component.externalFeedbackProjectControl);
  });

  describe('onClose', () => {
    it('should close window (buttonName: Finish)', () => {
      const dialogRef = TestBed.inject(MatDialogRef);
      spyOn(dialogRef, 'close');

      component.onClose('Finish');

      expect(dialogRef.close).toHaveBeenCalledTimes(1);
    });


    it('should open modal window (buttonName: Cancel)', () => {
      component.onClose('Cancel');

      expect(matDialog.open).toHaveBeenCalledWith(ConfirmModalComponent, jasmine.any(Object));
    });

    it('subtitleText should be Your colleagues will not receive a request', () => {
      const expected = 'Your colleagues will not receive a request';

      component.isExternalFeedback$.next(false);
      component.onClose('Cancel');

      expect(component.feedbackConfirmModalData.subtitleText).toBe(expected);
    });

    // it('subtitleText should be The link wasn\'t generated or copied to clipboard', fakeAsync(() => {
    //   const expected = 'The link wasn\'t generated or copied to clipboard';
    //   component.isExternalFeedback$.next(true);
    //   tick(5000);
    //   component.onClose('Cancel');

    //   expect(component.feedbackConfirmModalData.subtitleText).toBe(expected);
    // }));
  });

  describe('addChip', () => {
    it('should add chip to allUsersChips array', () => {
      component.addChip(teammatesMock[0]);

      expect(component.allUsersChips.length).toBe(1);
      expect(component.allUsersChips[0]).toBe(teammatesMock[0]);
    });

    it('should disable currentForm', () => {
      component.addChip(teammatesMock[0]);
      component.addChip(teammatesMock[0]);
      component.addChip(teammatesMock[0]);
      component.addChip(teammatesMock[0]);
      component.addChip(teammatesMock[0]);
      component.addChip(teammatesMock[0]);
      component.addChip(teammatesMock[0]);
      component.addChip(teammatesMock[0]);
      component.addChip(teammatesMock[0]);

      expect(component.allUsersChips.length).toBe(9);
      expect(component.currentForm.disabled).toBe(true);
    });

    it('should not disable currentForm', () => {
      component.addChip(teammatesMock[0]);
      component.addChip(teammatesMock[0]);

      expect(component.allUsersChips.length).toBe(2);
      expect(component.currentForm.disabled).toBe(false);
    });

    it('should enable teammate', () => {
      const matDialogData = TestBed.inject(MAT_DIALOG_DATA);

      component.addChip(teammatesMock[0]);

      expect(matDialogData.teammates[0].disabled).toBe(true);
      expect(matDialogData.teammates[1].disabled).toBeFalsy();
    });

    it('should set empty controls', () => {
      component.addChip(teammatesMock[0]);

      expect(component.allUsersControl.value).toBe('');
      expect(component.teammatesControl.value).toBe('');
    });

    it('should return value', () => {
      const result = component.addChip(teammatesMock[0]);

      expect(result).toEqual([teammatesMock[0]]);
      expect(result).not.toEqual([teammatesMock[1]]);
    });

    it('should call isButtonActive', () => {
      spyOn(component, 'isButtonActive');

      component.addChip(teammatesMock[0]);
      component.addChip(teammatesMock[0]);
      component.addChip(teammatesMock[0]);

      expect(component.isButtonActive).toHaveBeenCalledTimes(3);
    });
  });

  describe('removeAllUsersChip', () => {
    it('should disable teammate', () => {
      const matDialogData = TestBed.inject(MAT_DIALOG_DATA);

      component.removeAllUsersChip(teammatesMock[0]);

      expect(matDialogData.teammates[0].disabled).toBe(false);
      expect(matDialogData.teammates[1].disabled).toBeFalsy();
    });

    it('should remove chip', () => {
      component.addChip(teammatesMock[0]);
      component.addChip(teammatesMock[1]);
      expect(component.allUsersChips.length).toBe(2);

      component.removeAllUsersChip(teammatesMock[1]);

      expect(component.allUsersChips.length).toBe(1);
      expect(component.allUsersChips[0]).toEqual(teammatesMock[0]);
    });

    it('should return value', () => {
      component.addChip(teammatesMock[0]);
      component.addChip(teammatesMock[1]);
      expect(component.allUsersChips.length).toBe(2);

      const result = component.removeAllUsersChip(teammatesMock[1]);

      expect(result).toEqual([teammatesMock[0]]);
      expect(result).not.toEqual([teammatesMock[1]]);
      expect(result).toBe(component.allUsersChips);
    });

    it('should enable form', () => {
      spyOn(component.currentForm, 'enable');

      component.addChip(teammatesMock[0]);
      component.removeAllUsersChip(teammatesMock[0]);

      expect(component.currentForm.enable).toHaveBeenCalledTimes(1);
    });

    it('should call isButtonActive', () => {
      spyOn(component, 'isButtonActive');

      component.addChip(teammatesMock[0]);
      component.removeAllUsersChip(teammatesMock[0]);

      expect(component.isButtonActive).toHaveBeenCalledTimes(2);
    });
  });

  describe('onSubmit', () => {
    it('should emit values', () => {
      feedbackService.sendFeedbackRequest.and.returnValue(of(true));

      spyOn(component.isShowSpinner$, 'next');
      spyOn(component.isButtonDisabled$, 'next');

      component.onSubmit();

      expect(component.isShowSpinner$.next).toHaveBeenCalledOnceWith(true);
      expect(component.isButtonDisabled$.next).toHaveBeenCalledOnceWith(true);
    });

    it('should open modal window', () => {
      feedbackService.sendFeedbackRequest.and.returnValue(of(true));

      component.onSubmit();

      expect(matDialog.open).toHaveBeenCalledWith(FeedbackRequestSuccessModalComponent, jasmine.any(Object));
    });
  });

  describe('onExternalSubmit', () => {
    it('should emit values arg: Copy link', () => {
      spyOn(component.isLinkCopied$, 'next');
      spyOn(component.rightButtonName$, 'next');

      component.onExternalSubmit('Copy link');

      expect(component.isLinkCopied$.next).toHaveBeenCalledWith(true);
      expect(component.rightButtonName$.next).toHaveBeenCalledWith('Finish');
    });

    it('should emit values arg: Generate link', () => {
      component.initExternalFeedbackFormGroup();

      spyOn(component.nameError$, 'next');
      spyOn(component.surnameError$, 'next');
      spyOn(component.positionError$, 'next');
      spyOn(component.projectError$, 'next');
      spyOn(component.emailError$, 'next');
      spyOn(component.leftButtonName$, 'next');

      component.onExternalSubmit('Generate link');

      expect(component.nameError$.next).toHaveBeenCalledWith(true);
      expect(component.surnameError$.next).toHaveBeenCalledWith(true);
      expect(component.surnameError$.next).toHaveBeenCalledWith(true);
      expect(component.surnameError$.next).toHaveBeenCalledWith(true);
      expect(component.surnameError$.next).toHaveBeenCalledWith(true);
      expect(component.leftButtonName$.next).not.toHaveBeenCalled();
    });

    it('should emit values when externalFeedbackFormGroup is valid arg: Generate link', () => {
      feedbackService.getExternalFeedbackLink.and.returnValue(of('TEST_LINK'));
      component.initExternalFeedbackFormGroup();
      spyOn(component.leftButtonName$, 'next');
      spyOn(component.isLink$, 'next');

      expect(component.externalFeedbackFormGroup.valid).toBe(false);

      component.externalFeedbackFormGroup.patchValue({
        name: 'name',
        surname: 'surname',
        project: 'project',
        position: 'position',
        email: 'email@email.com'
      });

      expect(component.externalFeedbackFormGroup.valid).toBe(true);
      component.onExternalSubmit('Generate link');

      expect(component.leftButtonName$.next).toHaveBeenCalledWith('Copy link');
      expect(component.isLink$.next).toHaveBeenCalledWith(true);
      expect(component.linkHint).toBe('https://team.andersenlab.com/feedbackexternals/TEST_LINK');
    });
  });

  it('should call onRadioButtonChoose', () => {
    const radionBtn = fixture.debugElement.nativeElement.querySelector('.type-radio-group-button');

    spyOn(component, 'onRadioButtonChoose');
    radionBtn.click();

    expect(component.onRadioButtonChoose).toHaveBeenCalledTimes(1);
  });

  it('onRadioButtonChoose should set value to typeSelectedFeedback ', () => {
    component.onRadioButtonChoose('TEST_TYPE');

    expect(component.typeSelectedFeedback).toBe('TEST_TYPE');
  });

  it('onRadioButtonChooseSubmit should emit values arg: Inside the company', () => {
    spyOn(component.askForTypeFeedback$, 'next');
    spyOn(component.isInternalFeedback$, 'next');
    spyOn(component.isExternalFeedback$, 'next');

    component.onRadioButtonChooseSubmit('Inside the company');

    expect(component.askForTypeFeedback$.next).toHaveBeenCalledWith(false);
    expect(component.isInternalFeedback$.next).toHaveBeenCalledWith(true);
    expect(component.isExternalFeedback$.next).not.toHaveBeenCalled();
  });

  it('onRadioButtonChooseSubmit should emit values arg: Outside the company', () => {
    spyOn(component.askForTypeFeedback$, 'next');
    spyOn(component.isInternalFeedback$, 'next');
    spyOn(component.isExternalFeedback$, 'next');

    component.onRadioButtonChooseSubmit('Outside the company');

    expect(component.askForTypeFeedback$.next).toHaveBeenCalledWith(false);
    expect(component.isInternalFeedback$.next).not.toHaveBeenCalled();
    expect(component.isExternalFeedback$.next).toHaveBeenCalledWith(true);
  });

  it('onFadeOut should emit value', () => {
    spyOn(component.isLinkCopied$, 'next');

    component.onFadeOut();

    expect(component.isLinkCopied$.next).toHaveBeenCalledWith(false);
  });

  it('OnSelectProject should emit value', () => {
    spyOn(component['selectedProjectId$'], 'next');

    component['OnSelectProject']({ id: 'TEST_ID', name: 'name' });

    expect(component['selectedProjectId$'].next).toHaveBeenCalledWith('TEST_ID');
  });
});
