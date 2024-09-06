import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'andteam-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateFilterComponent {
  @Input() isActive: boolean;
}
