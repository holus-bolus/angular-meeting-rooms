import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'andteam-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent {

  constructor() { }
}
