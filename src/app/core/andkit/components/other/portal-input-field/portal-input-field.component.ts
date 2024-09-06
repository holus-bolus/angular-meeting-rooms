import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'andteam-portal-input-field',
  templateUrl: './portal-input-field.component.html',
  styleUrls: ['./portal-input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortalInputFieldComponent {
  @Input() public placeholder: string;
  @Input() public value: string = null;
  @Input() public autofocus = false;
  @Output() public changed = new EventEmitter<string>();

  public onChangeValue(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.changed.emit(value);
  }
}
