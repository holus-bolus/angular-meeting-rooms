import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { DictionaryLike } from '../dictionary-like.interface';

import plainSvg from '!!raw-loader!./markers/plain.svg';
import highlightedSvg from '!!raw-loader!./markers/highlighted.svg';

@Component({
  selector: 'andteam-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.scss']
})
export class OfficeListComponent {
  @Input() public offices$: Observable<DictionaryLike[]>;
  @Output() public itemSelected = new EventEmitter<string>();

  public plainMarker = plainSvg;
  public highlightedMarker = highlightedSvg;
  public selectedId: string;

  public onClick(id: string): void {
    if (id) {
      this.selectedId = id;
      this.itemSelected.emit(id);
    } else {
      throw new Error('[OfficeListComponent]:[onClick] - incoming [id] value should be defined and not null');
    }
  }
}
