import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'andteam-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditMenuComponent {
  public isOpenDropdown = false;
  public isBoolean = false;

  @Input() public param: string;
  @Input() public route: string;

  @Output() public delete = new EventEmitter<void>();

  public isCloseDropdown(): void {
    if (this.isBoolean && !this.isOpenDropdown) {
      this.isBoolean = !this.isBoolean;
    } else if (!this.isBoolean && this.isOpenDropdown) {
      this.isOpenDropdown = !this.isOpenDropdown;
    } else if (!this.isBoolean && !this.isOpenDropdown) {
      this.isOpenDropdown = !this.isOpenDropdown;
      this.isBoolean = !this.isBoolean;
    }
  }

  public onCloseDropdown(isOpen: boolean): void {
    if (this.isBoolean && this.isOpenDropdown) {
      this.isOpenDropdown = isOpen;
    }
  }

  public onMouseEnter(): void {
    this.isBoolean = false;
  }

  public onDelete(): void {
    this.delete.emit();
  }
}
