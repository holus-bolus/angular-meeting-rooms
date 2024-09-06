import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { COMPONENT_TYPES } from '@constants/types/componentTypes.constants';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';

@Component({
  selector: 'andteam-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AndkitButtonComponent {
  @Input() disabled: boolean;
  @Input() type = BUTTON_TYPES.PRIMARY;
  @Input() componentType = COMPONENT_TYPES.PORTAL;
  @Input() buttonIcon: string = null;
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() textColor: 'black' | 'white' = 'black';

  public buttonType = BUTTON_TYPES;
}
