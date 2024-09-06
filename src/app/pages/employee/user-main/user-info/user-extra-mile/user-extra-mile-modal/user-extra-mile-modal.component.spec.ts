import { FormControl } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserExtraMileModalComponent } from './user-extra-mile-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

// length 126
const longComment = `Lorem ipsum dolor sit amet consectetur adipisicing elit.
  Quae, quis alias cupiditate laudantium delectus voluptas esse nulla?`;

describe('UserExtraMileModalComponent', () => {
  let component: UserExtraMileModalComponent;
  let fixture: ComponentFixture<UserExtraMileModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserExtraMileModalComponent],
      imports: [],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserExtraMileModalComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('initForm should set FormControl', () => {
    component.extraMileCommentControl = null;
    expect(component.extraMileCommentControl).toBe(null);

    fixture.detectChanges();
    expect(component.extraMileCommentControl).toEqual(jasmine.any(FormControl));
  });

  describe('isFormValid', () => {
    it('should return true when isFieldValueValid true', () => {
      component.isFieldValueValid = true;
      component.initForm();

      const result = component.isFormValid;
      expect(result).toBeTrue();
    });

    it('should return false when isFieldValueValid false', () => {
      component.isFieldValueValid = false;
      component.initForm();

      const result = component.isFormValid;
      expect(result).toBeFalse();
    });

    it('should return true when extraMileCommentControl valid', () => {
      component.initForm();
      component.isFieldValueValid = false;
      expect(component.isFormValid).toBeFalse();

      component.extraMileCommentControl.patchValue('VALID_VALUE');
      expect(component.isFormValid).toBeTrue();
    });
  });

  describe('onCancelExtraMile', () => {
    it('should set isExtraMileOn to false', () => {
      component.isExtraMileOn = null;
      expect(component.isExtraMileOn).toBe(null);

      component.onCancelExtraMile();
      expect(component.isExtraMileOn).toBeFalse();
    });

    it('cancelExtraMile should emit empty string', () => {
      spyOn(component.cancelExtraMile, 'emit');

      component.onCancelExtraMile();

      expect(component.cancelExtraMile.emit).toHaveBeenCalledOnceWith('');
    });
  });

  it('onCancelConfirm should emit closeModal', () => {
    spyOn(component.closeModal, 'emit');

    component.onCancelConfirm();

    expect(component.closeModal.emit).toHaveBeenCalledTimes(1);
  });

  describe('onConfirmExtraMile', () => {
    it('should trim whitespaces', () => {
      const invalidString = '  COMMENT  ';
      component.extraMileCommentControl = new FormControl(invalidString);

      component.onConfirmExtraMile();
      expect(component.extraMileCommentControl.value).toBe('COMMENT');
    });

    it('should call checkValidation', () => {
      component.extraMileCommentControl = new FormControl('');
      spyOn(component, 'checkValidation');

      component.onConfirmExtraMile();

      expect(component.checkValidation).toHaveBeenCalledTimes(1);
    });

    it('should emit value control value when valid', () => {
      component.initForm();
      component.extraMileCommentControl.patchValue('COMMENT');
      spyOn(component.confirmExtraMile, 'emit');

      component.onConfirmExtraMile();
      expect(component.confirmExtraMile.emit).toHaveBeenCalledWith('COMMENT');
    });

    it('should not emit value control value when invalid', () => {
      component.initForm();
      spyOn(component.confirmExtraMile, 'emit');

      component.onConfirmExtraMile();
      expect(component.confirmExtraMile.emit).not.toHaveBeenCalled();
    });
  });

  describe('checkValidation', () => {
    beforeEach(() => component.initForm());

    it('should set errorMessageText to [Required field] when control value length less then minLength', () => {
      component.checkValidation();
      expect(component.errorMessageText).toBe('Required field');
    });

    it('should set errorMessageText to [Text exceeds character limit] when control value length less then maxLength', () => {
      component.extraMileCommentControl.patchValue(longComment);
      component.checkValidation();
      expect(component.errorMessageText).toBe(`Text exceeds 100 character limit`);
    });
  });
});
