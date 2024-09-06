import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  Input,
} from '@angular/core';
import { ModalScrollService } from '@services/modalScroll.service';

import closeSvg from '!!raw-loader!@assets/images/close.svg';

@Component({
  selector: 'andteam-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() isConfirmationModal: boolean;
  @Input() isConfirmationType: boolean;
  @Input() isCloseIconView = true;
  @Output() closeClick = new EventEmitter<boolean>();

  closeIcon: string = closeSvg;

  constructor(private scroll: ModalScrollService) {}

  public ngOnInit(): void {
    this.scroll.disable();
  }

  public ngOnDestroy(): void {
    if (!this.isConfirmationModal) {
      this.scroll.enable();
    }
  }

  public onCloseClick(): void {
    this.closeClick.emit();
    this.isConfirmationModal = false;
  }

  public onModalClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
