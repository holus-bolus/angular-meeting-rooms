import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import {
  ACTION_DARK_STYLE,
  ACTION_OPTION_APPROVE,
  ACTION_OPTION_DECLINE,
  ACTION_OPTION_DELETE,
  IActionSelectorOption
} from '@andkit/components/selects/action-selector/action-selector.config';

@Component({
  selector: 'andteam-action-selector',
  templateUrl: './action-selector.component.html',
  styleUrls: ['./action-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionSelectorComponent{
  @Input() public iconType: string;
  @Input() public menuItems: IActionSelectorOption[];
  @Input() public menuStyle: string;
  @Input() public menuIcons: string[];

  @Output() menuOptionSelected = new EventEmitter<IActionSelectorOption>();
  @Output() menuClosed = new EventEmitter<null>();
  @Output() menuOpened = new EventEmitter<null>();

  constructor() { }

  public onSelectMenuOption(action: IActionSelectorOption): void {
    this.menuOptionSelected.emit(action);
  }

  public isOptionRed(actionName: string): boolean {
    return actionName === ACTION_OPTION_DELETE.name || actionName === ACTION_OPTION_DECLINE.name;
  }

  public isOptionGreen(actionName: string): boolean {
    return actionName === ACTION_OPTION_APPROVE.name;
  }

  public isMenuDark(): boolean {
    return this.menuStyle === ACTION_DARK_STYLE.name;
  }

  public closeMenu(): void {
    this.menuClosed.emit();
  }

  public openMenu(): void {
    this.menuOpened.emit();
  }
}
