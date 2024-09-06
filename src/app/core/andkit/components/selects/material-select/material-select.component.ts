import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ICommonOption, IOption } from '@interfaces/filter';

import mdi_filter_listSvg from '!!raw-loader!@assets/images/mdi_filter_list.svg';
import assessmentCloseSvg from '!!raw-loader!@assets/images/assessment-close.svg';

export const PANEL_CLASS = {
  left: 'mat-select-panel-left',
  bottom: 'mat-select-panel-bottom'
};

@Component({
  selector: 'andteam-material-select',
  templateUrl: './material-select.component.html',
  styleUrls: ['./material-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MaterialSelectComponent implements OnInit{
  @Input() placeholder: string;
  @Input() options: IOption[];
  @Input() option: IOption;
  @Input() isRequired: boolean;
  @Input() errorMessage: string;
  @Input() isCenter: boolean;
  @Input() isPanelLeft: boolean;
  @Input() panelPosition = 'bottom';
  @Input() panelClass = '';

  @Input() set clearOption(value: boolean) {
    this.onReset();
  }

  @Output() selectOption = new EventEmitter<IOption | ICommonOption>();
  @Output() resetOptions = new EventEmitter();

  public optionControl = new FormControl('');
  public mdi_filter_listSvg = mdi_filter_listSvg;
  public assessmentCloseSvg = assessmentCloseSvg;
  public panelClasses: string[] = [];

  public ngOnInit(): void {
    switch (this.panelPosition) {
      case 'left':
        this.panelClasses = [this.panelClass, PANEL_CLASS.left];
        break;
      case 'bottom':
        this.panelClasses = [this.panelClass, PANEL_CLASS.bottom];
        break;
    }
  }

  public onClick(option: IOption): void {
    this.option = option;
    this.selectOption.emit({ ...option });
  }

  public onKeyEnterUp(event: Event): void {
    const option = this.options.filter((value: IOption) => value.name === (event.target as HTMLInputElement).textContent);

    [this.option] = option;
    this.selectOption.emit(...option);
  }

  public onReset(): void {
    this.option = null;
    this.resetOptions.emit();
  }
}
