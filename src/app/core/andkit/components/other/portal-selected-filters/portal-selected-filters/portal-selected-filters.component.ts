import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IFilterTag } from '@pages/main/main-events-filter/main-events-filter.component';
import { ITag } from '@interfaces/filter';

@Component({
  selector: 'andteam-portal-selected-filters',
  templateUrl: './portal-selected-filters.component.html',
  styleUrls: ['./portal-selected-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortalSelectedFiltersComponent {
  @Input() public selectedFilters: ITag[] | IFilterTag[];
  @Input() public buttonTitle: string;
  @Input() public label: string;

  @Output() public removeTag = new EventEmitter<IFilterTag>();
  @Output() public clearAll = new EventEmitter<void>();

  public onRemoveTag(tag: IFilterTag): void {
    this.removeTag.emit(tag);
  }

  public onClearAll(): void {
    this.clearAll.emit();
  }
}
