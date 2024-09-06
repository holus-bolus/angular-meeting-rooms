import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import cautionSvg from '!!raw-loader!@assets/images/caution.svg';

@Component({
  selector: 'andteam-feedback-cancel-modal',
  templateUrl: './feedback-cancel-modal.component.html',
  styleUrls: ['./feedback-cancel-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackCancelModalComponent implements OnInit {

  public isConfirmationModal = false;
  public isConfirmationType = true;
  public cautionSvg: SafeHtml;
  public firstButtonType = BUTTON_TYPES.SECONDARY;

  @Output() sendConfirmEvent = new EventEmitter<void>();
  @Output() sendCancelEvent = new EventEmitter<void>();

  constructor(private sanitizer: DomSanitizer) { }

  public ngOnInit(): void {
    this.cautionSvg = this.sanitizer.bypassSecurityTrustHtml(cautionSvg as any);
  }

  public confirm(): void {
    this.sendConfirmEvent.emit();
    this.isConfirmationModal = false;
  }

  public cancelConfirm(): void {
    this.sendCancelEvent.emit();
  }

}
