import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'andteam-slide-toggler',
  templateUrl: './slide-toggler.component.html',
  styleUrls: ['./slide-toggler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideTogglerComponent {
  @Input() public checked: boolean;
  @Input() public label: string;

  @Output() public toggle = new EventEmitter<boolean>();

  public onChange({ checked }: MatSlideToggleChange): void {
    this.toggle.emit(checked);
  }
}
