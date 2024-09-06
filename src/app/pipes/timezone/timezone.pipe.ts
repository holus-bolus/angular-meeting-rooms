import { Pipe, PipeTransform } from '@angular/core';
import { TimeService } from '@services/portal/time.service';
import { Moment } from 'moment-timezone/moment-timezone';

@Pipe({
  name: 'timezone'
})
export class TimezonePipe implements PipeTransform {

  constructor(private timeService: TimeService) {}

  transform(value: string | Date | Moment, format?: string): string {
    if (!value) {
      return '';
    }

    return this.timeService.getTimezoneDate(value).format(format);
  }
}
