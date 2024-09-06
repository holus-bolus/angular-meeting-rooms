import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import {BUTTON_TYPES} from '@andkit/components/buttons/button/button.config';

@Component({
  selector: 'andteam-portal-button',
  templateUrl: './portal-button.component.html',
  styleUrls: ['./portal-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortalButtonComponent {
  @Input() disabled: boolean;
  @Input() type = BUTTON_TYPES.PRIMARY;
}
