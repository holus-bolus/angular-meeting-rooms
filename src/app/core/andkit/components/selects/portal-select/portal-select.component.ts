import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICommonOption } from '@interfaces/filter';
import { COMPONENT_TYPES } from 'src/app/core/constants/types/componentTypes.constants';
import { ICurrencies } from '@interfaces/overtime.interface';

import portalArrowSvg from '!!raw-loader!./icons/portal-arrow.svg';
import assessmentArrowSvg from '!!raw-loader!./icons/assessment-arrow.svg';

@Component({
  selector: 'andteam-portal-select',
  templateUrl: './portal-select.component.html',
  styleUrls: ['./portal-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortalSelectComponent implements OnInit {
  public isDropdownOpen = false;
  public isInnerClickHandling = false;
  public isAssessment = false;
  public isOvertime = false;
  public portalArrow: string = portalArrowSvg;
  public assessmentArrow: string = assessmentArrowSvg;
  public upArrowIcon: string = assessmentArrowSvg;
  public isCheckTrue = true;

  @Input() placeholder: string;
  @Input() option: ICommonOption<any>;
  @Input() options: ICommonOption<any>[] | ICurrencies[] = [];
  @Input() error: boolean;
  @Input() errorMessage: string;
  @Input() hintMessage: string;
  @Input() componentType = COMPONENT_TYPES.PORTAL;
  @Input() prefixHr = '';
  @Input() dropdownHeight: string;

  @Output() selectOption = new EventEmitter<ICommonOption<any>>();

  public ngOnInit(): void {
    this.option = this.option || { id: '', name: this.placeholder };
    this.isAssessment = this.componentType === 'assessment';
    this.isOvertime = this.componentType === 'overtime';
  }

  public toggleDropdown(): void {
    if (!this.isInnerClickHandling && this.isDropdownOpen && this.isCheckTrue) {
      this.isDropdownOpen = !this.isDropdownOpen;
    }

    if (!this.isInnerClickHandling && !this.isDropdownOpen && this.isCheckTrue) {
      this.isDropdownOpen = !this.isDropdownOpen;
      this.isCheckTrue = !this.isCheckTrue;
    }

    if (!this.isInnerClickHandling && !this.isDropdownOpen && !this.isCheckTrue) {
      this.isDropdownOpen = false;
      this.isCheckTrue = !this.isCheckTrue;
    }
  }

  public onFocus(): void {
    this.isCheckTrue = true;
  }

  public onOuterCLick(isInner: boolean): void {
    this.isDropdownOpen = isInner;
    this.isInnerClickHandling = isInner;
    this.isCheckTrue = isInner;
  }

  public onSelectClick(event: MouseEvent, option: ICommonOption): void {
    this.isDropdownOpen = false;
    this.isInnerClickHandling = false;
    this.option = option;
    this.selectOption.emit({ ...option, checked: true });
  }
}
