import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'andteam-autocomplete-portal',
  templateUrl: 'autocomplete-portal.component.html',
  styleUrls: ['autocomplete-portal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompletePortalComponent {
  @Input() public placeholder: string;
  @Input() public searchIcon: string;
  @Input() public value: string;

  @Output() public checkOption = new EventEmitter<string>();

  public onChange(newValue: string): void {
    this.checkOption.emit(newValue);
  }
}
