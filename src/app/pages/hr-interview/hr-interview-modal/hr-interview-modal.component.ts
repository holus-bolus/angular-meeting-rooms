import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import { Component, Inject, ViewEncapsulation } from '@angular/core';

import emailSvg from '!!raw-loader!@assets/images/email.svg';
import cautionSvg from '!!raw-loader!@assets/images/caution.svg';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HR_INTERVIEW_MODAL } from '@pages/hr-interview/hr-interview.const';

@Component({
  selector: 'andteam-hr-interview-modal',
  templateUrl: './hr-interview-modal.component.html',
  styleUrls: ['./hr-interview-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HrInterviewModalComponent {
  public confirmButtonType = BUTTON_TYPES.PRIMARY;
  public emailSvgIcon = emailSvg;
  public cautionSvgIcon = cautionSvg;
  public isError = this.data?.isError;
  public modalText = HR_INTERVIEW_MODAL;

  constructor(
    private modalWindow: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public onClose(): void {
    this.modalWindow.closeAll();

    !this.isError ? this.router.navigate(['/']) : window.location.reload();
  }
}
