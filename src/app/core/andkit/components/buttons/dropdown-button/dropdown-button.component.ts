import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'andteam-dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownButtonComponent {
  @Output() openDropdown = new EventEmitter<boolean>();

  public onOpenDropdown(event: boolean): void {
    this.openDropdown.emit(event);
  }
}
