import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ILabel } from '@interfaces/label';
import { LABEL_TYPES } from '@constants/labelTypes';

@Component({
  selector: 'andteam-label-button',
  templateUrl: './label-button.component.html',
  styleUrls: ['./label-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelButtonComponent {
  @Input() label: ILabel;
  @Input() isDisabled: boolean;

  @Output() labelClicked = new EventEmitter<void>();

  constructor() { }

  public getLabelClass(label: ILabel): string {
    return label.labelClass || LABEL_TYPES.LABEL_DEFAULT;
  }

  public onClickLabel(): void {
    if (!this.isDisabled) {
      this.labelClicked.emit();
    }
  }
}
