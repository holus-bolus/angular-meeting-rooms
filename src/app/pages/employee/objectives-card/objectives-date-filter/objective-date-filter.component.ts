import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'andteam-objectives-date-filter',
  templateUrl: './objectives-date-filter.component.html',
  styleUrls: ['./objectives-date-filter.component.scss']
})
export class ObjectivesDateFilterComponent {
  @Input() public dates: string[] = [];
  @Input() public activeDate: string;

  constructor(private router: Router) {
  }

  public onDateSelect(date: string): void {
    this.activeDate = date;
    this.router.navigate([], { queryParams: { date } });
  }
}
