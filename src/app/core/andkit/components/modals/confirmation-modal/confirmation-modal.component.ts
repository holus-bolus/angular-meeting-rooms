import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { ModalScrollService } from '@services/modalScroll.service';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import cautionSvg from '!!raw-loader!../../../../../../assets/images/caution.svg';

@Component({
  selector: 'andteam-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationModalComponent implements OnInit, OnDestroy {
  public isConfirmationModal = true;
  public isConfirmationType = true;
  public cautionIcon: SafeHtml;

  @Input() text: string;
  @Input() subText: string;

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
