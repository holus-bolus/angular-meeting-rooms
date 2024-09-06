import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation, OnInit,
} from '@angular/core';
import { ICommonOption } from '@interfaces/filter';
import { FormControl } from '@angular/forms';
import { MaterialInfoBtnConst } from '@andkit/components/buttons/material-info-btn/material-info-btn.const';

import portalArrowSvg from '!!raw-loader!@assets/images/portal-arrow.svg';
import arrowDownBlackSvg from '!!raw-loader!@assets/images/arrow-down-black.svg';

@Component({
  selector: 'andteam-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SelectComponent implements OnInit {
  @Input() options: ICommonOption[];
  @Input() placeholder: string;
  @Input() error: boolean;
  @Input() errorMessage: string;
  @Input() formControl = new FormControl;
  @Input() additionalInfo: boolean;
  @Input() isBlackArrow = false;
  @Input() disableOptionCentering = false;
  @Input() panelClass = 'select-panel-class';
  @Input() automationId = 'andteam-select';
  @Input() isFieldDisabled = false;
  @Input() disableLabel = false;

  @Input() set option(value: ICommonOption) {
    this.setOption = value;
  }

  @Output() selectOption = new EventEmitter<ICommonOption>();

  public setOption: ICommonOption;
  public portalArrow: string;
  public yellow = MaterialInfoBtnConst.YELLOW;

  public ngOnInit(): void {
    this.portalArrow = this.isBlackArrow ? arrowDownBlackSvg : portalArrowSvg;
  }

  public onClick(option: ICommonOption): void {
    if (!option.disabled) {
      this.setOption = option;
      this.selectOption.emit({ ...option, checked: true });
    }
  }

  public onKeyEnterUp(event: Event): void {
    const option = this.options.filter((value: ICommonOption) => value.name === (event.target as HTMLInputElement).textContent);

    [this.setOption] = option;
    this.selectOption.emit(...option);
  }
}
