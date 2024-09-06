import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { POSSIBLE_HOURS, POSSIBLE_MINUTES } from '@constants/possible-times.constants';

@Component({
  selector: 'andteam-event-time-picker',
  templateUrl: './event-time-picker.component.html',
  styleUrls: ['./event-time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventTimePickerComponent {
  @Input() public hour: FormControl;
  @Input() public minute: FormControl;
  @Input() public minutesError: boolean;
  @Input() public hoursError: boolean;

  public hourList = POSSIBLE_HOURS;
  public minuteList = POSSIBLE_MINUTES;

  public selectHour({ name }: any): void {
    this.hour.setValue(name);
  }

  public selectMinutes({ name }: any): void {
    this.minute.setValue(name);
  }

}
