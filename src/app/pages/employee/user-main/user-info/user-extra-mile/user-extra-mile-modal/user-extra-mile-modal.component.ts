import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import { FormControl, Validators } from '@angular/forms';

import cautionSvg from '!!raw-loader!@assets/images/caution.svg';

@Component({
  selector: 'andteam-user-extra-mile-modal',
  templateUrl: './user-extra-mile-modal.component.html',
  styleUrls: ['./user-extra-mile-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserExtraMileModalComponent implements OnInit {
  @Input() isExtraMileOn = true;
  @Output() confirmExtraMile = new EventEmitter<string>();
  @Output() cancelExtraMile = new EventEmitter<string>();
  @Output() closeModal = new EventEmitter<void>();

  public isConfirmationModal = false;
  public isConfirmationType = false;
  public cautionSvg: SafeHtml;
  public cancelButtonType = BUTTON_TYPES.PREVIOUS;
  public confirmButtonType = BUTTON_TYPES.PRIMARY;
  public extraMileCommentControl: FormControl;
  public noFirstWhitespaces: RegExp = /\S/;
  public errorMessageText: string;
  public isFieldValueValid = true;

  readonly maxLength = 100;
  readonly minLength = 1;

  constructor(private sanitizer: DomSanitizer) {
  }

  public ngOnInit(): void {
    this.cautionSvg = this.sanitizer.bypassSecurityTrustHtml(cautionSvg);
    this.initForm();
  }

  public get isFormValid(): boolean {
    return this.extraMileCommentControl.valid || this.isFieldValueValid;
  }

  public initForm(): void {
    this.extraMileCommentControl = new FormControl('', [
      Validators.maxLength(this.maxLength),
      Validators.minLength(this.minLength),
      Validators.required,
      Validators.pattern(this.noFirstWhitespaces)
    ]);
  }

  public onCancelExtraMile(): void {
    this.isExtraMileOn = false;
    this.cancelExtraMile.emit('');
  }

  public onCancelConfirm(): void {
    this.closeModal.emit();
  }

  public onConfirmExtraMile(): void {
    this.extraMileCommentControl.setValue(this.extraMileCommentControl.value.trim());
    this.checkValidation();
    if (this.extraMileCommentControl.valid) {
      this.isExtraMileOn = true;
      this.confirmExtraMile.emit(this.extraMileCommentControl.value);
    }
  }

  public checkValidation(): void {
    this.errorMessageText = '';
    this.isFieldValueValid = false;

    if (this.extraMileCommentControl.value.length < this.minLength) {
      this.errorMessageText = 'Required field';
    }

    if (this.extraMileCommentControl.value.length > this.maxLength) {
      this.errorMessageText = `Text exceeds ${this.maxLength} character limit`;
    }
  }
}
