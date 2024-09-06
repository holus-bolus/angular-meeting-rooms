import { ErrorHandler, Injectable } from '@angular/core';
import * as moment from 'moment-timezone';
import { OFFICES_TIMEZONES } from '@constants/timezones';
import { Moment } from 'moment-timezone/moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class TimeService implements ErrorHandler {
  timeZone = moment.tz.guess();

  public setTimeZone(timeZone: string): void {
    this.timeZone = timeZone;
  }

  getUTCOffset(cityName: string, date: string): number {
    const timeZone = this.getTimeZoneName(cityName);
    const offset = moment.tz(date, timeZone).utcOffset();

    return offset / 60;
  }

  getUTCDate(date: Moment | Date | string | number): Moment {
    return moment.utc(date);
  }

  getTimeZoneName(cityName: string): string {
    const timeZone = OFFICES_TIMEZONES.find(({ name }) => name === cityName);

    if (!timeZone) {
      throw new Error('[getTimeZoneName]: timeZone is not found');
    }

    return timeZone.timeZone;
  }

  getTimezoneDate(date: Moment | Date | string | number, timeZone: string = this.timeZone): Moment {
    return moment.utc(date).tz(timeZone);
  }

  getDateWithNewTime(hour: string, minute: string, date: Date | Moment, keepOffset: boolean = false): string {
    const timeZoneDate = this.getTimezoneDate(date).hours(Number(hour)).minutes(Number(minute));

    return timeZoneDate.toISOString(keepOffset);
  }

  handleError(error: any): void {
    console.error(`[TimeService]: ${error}`);
  }
}
