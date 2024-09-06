import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import cautionSvg from '!!raw-loader!@assets/images/caution.svg';


@Component({
  selector: 'andteam-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackModalComponent implements OnInit {
  title: string;
  subTitle: string;
  message: string;

  public cautionSvg: SafeHtml;

  constructor(
    private modalWindow: MatDialog,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.title = this.data?.title;
    this.subTitle = this.data?.subTitle;
    this.message = this.data.message;
    this.cautionSvg = this.sanitizer.bypassSecurityTrustHtml(cautionSvg as any);
  }

  public onSubmit(): void {
    this.modalWindow.closeAll();
  }
}
