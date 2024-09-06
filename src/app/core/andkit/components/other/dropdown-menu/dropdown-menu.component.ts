import {
  Component,
  ChangeDetectionStrategy,
  Input, Output, EventEmitter
} from '@angular/core';

@Component({
  selector: 'andteam-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownMenuComponent {
  @Input() public isOpen = false;

  @Output() public outerClick = new EventEmitter<boolean>();

  public onCloseDropdown(isDropdownClick: boolean): void {
    if (!isDropdownClick && this.isOpen) {
      this.outerClick.emit(isDropdownClick);
    }
  }
}
