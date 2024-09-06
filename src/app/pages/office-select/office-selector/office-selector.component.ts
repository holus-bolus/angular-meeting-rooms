import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { DictionaryLike } from '../dictionary-like.interface';
import { ModalScrollService } from '@services/modalScroll.service';

@Component({
  selector: 'andteam-office-selector',
  templateUrl: './office-selector.component.html',
  styleUrls: ['./office-selector.component.scss']
})

export class OfficeSelectorComponent implements OnInit, OnDestroy {
  @Input() public offices$: Observable<DictionaryLike[]>;
  @Input() public isConfirmationModal: boolean;
  @Output() public officeSelected = new EventEmitter<string>();
  @Output() public closeClick = new EventEmitter<boolean>();

  public currentOfficeId: string;
  public disableConfirm = true;

  constructor(private scroll: ModalScrollService) {}

  public ngOnInit(): void {
    this.scroll.disable();
  }

  public ngOnDestroy(): void {
    if (!this.isConfirmationModal) {
      this.scroll.enable();
    }
  }

  public onSelected(itemId: string): void {
    if (itemId) {
      this.currentOfficeId = itemId;
      this.disableConfirm = false;
    } else {
      throw new Error('[OfficeSelectorComponent]:[onSelected] - incoming [itemId] value should be defined and not null');
    }
  }

  public confirmSelection(): void {
    if (this.currentOfficeId) {
      this.officeSelected.emit(this.currentOfficeId);
      this.isConfirmationModal = false;
    } else {
      throw new Error('[OfficeSelectorComponent]:[confirmSelection] - currentOfficeId is not defined');
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
