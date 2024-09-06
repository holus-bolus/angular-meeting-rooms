import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { ModalScrollService } from '@services/modalScroll.service';

import closeIcon from '!!raw-loader!@assets/images/closeSmall.svg';

@Component({
  selector: 'andteam-assessment-modal',
  templateUrl: './assessment-modal.component.html',
  styleUrls: ['./assessment-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssessmentModalComponent implements OnInit, OnDestroy {
  readonly closeIcon = closeIcon;

  @Input() isShowCloseIcon: boolean;

  @Output() closeClick = new EventEmitter<void>();

  constructor(private scroll: ModalScrollService) {
  }

  public ngOnInit(): void {
    this.scroll.disable();
  }

  public ngOnDestroy(): void {
    this.scroll.enable();
  }

  public onCloseModal(isInnerClick: boolean): void {
    if (!isInnerClick) {
      this.closeClick.emit();
    }
  }
}
