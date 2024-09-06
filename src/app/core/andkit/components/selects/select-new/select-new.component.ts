import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ICommonOption } from '@interfaces/filter';
import { FormControl } from '@angular/forms';
import { MaterialInfoBtnConst } from '@andkit/components/buttons/material-info-btn/material-info-btn.const';

import portalYellowArrowUpSvg from '!!raw-loader!@assets/images/portal-yellow-arrow-up.svg';
import portalBlackArrowDownSvg from '!!raw-loader!@assets/images/portal-black-arrow-down.svg';

@Component({
  selector: 'andteam-select-new',
  templateUrl: './select-new.component.html',
  styleUrls: ['./select-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectNewComponent implements OnInit {
  @Input() options: ICommonOption[];
  @Input() placeholder: string;
  @Input() error: boolean;
  @Input() errorMessage: string;
  @Input() formControl = new FormControl();
  @Input() additionalInfo: boolean;
  @Input() disableOptionCentering = false;
  @Input() panelClass = 'select-panel-class';
  @Input() automationId = 'andteam-select';
  @Input() isFieldDisabled = false;
  @Input() disableLabel = false;
  @Input() showDescription = false;
  @Input() addAllOption = false;
  @Input() allOptionTitle = '';

  @Input() set option(value: ICommonOption) {
    this.setOption = value;
  }

  @Output() selectOption = new EventEmitter<ICommonOption>();

  public setOption: ICommonOption;
  public portalArrow = portalBlackArrowDownSvg;
  public yellow = MaterialInfoBtnConst.YELLOW;

  public ngOnInit (): void {
    if (this.addAllOption) {
      this.options = [{
        id: null,
        name: this.allOptionTitle,
      } as ICommonOption, ...this.options];
    }
  }

  public openedChange(): void {
    switch (this.portalArrow) {
      case portalYellowArrowUpSvg:
        this.portalArrow = portalBlackArrowDownSvg;
        break;
      case portalBlackArrowDownSvg:
        this.portalArrow = portalYellowArrowUpSvg;
        break;
    }
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
