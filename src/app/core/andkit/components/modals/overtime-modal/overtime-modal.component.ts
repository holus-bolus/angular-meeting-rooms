import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ModalScrollService } from '@services/modalScroll.service';
import cautionSvg from '!!raw-loader!../../../../../../assets/images/caution.svg';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';

@Component({
  selector: 'andteam-overtime-modal',
  templateUrl: './overtime-modal.component.html',
  styleUrls: ['./overtime-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OvertimeModalComponent implements OnInit, OnDestroy {
  public isConfirmationModal = true;
  public isConfirmationType = true;
  public cautionIcon: SafeHtml;
  public firstButtonType = BUTTON_TYPES.SECONDARY;

  @Input() text: string;
  @Input() subText: string;
  @Input() confirmTextButton: string;
  @Input() cancelConfirmTextButton: string;

  @Output() sendConfirmEvent = new EventEmitter<void>();
  @Output() sendCloseEvent = new EventEmitter<void>();

  constructor(private scroll: ModalScrollService,
              private sanitizer: DomSanitizer) {
  }

  public ngOnInit(): void {
    this.cautionIcon = this.sanitizer.bypassSecurityTrustHtml(cautionSvg as any);
  }

  public ngOnDestroy(): void {
    this.scroll.enable();
  }

  public confirm(): void {
    this.sendConfirmEvent.emit();
    this.isConfirmationModal = false;
  }

  public cancelConfirm(): void {
    this.sendCloseEvent.emit();
  }
}
