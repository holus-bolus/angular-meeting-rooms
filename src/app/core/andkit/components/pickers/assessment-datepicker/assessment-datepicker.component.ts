import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

export interface IDay {
  value: string;
  selected: boolean;
  disabled: boolean;
}

const DAYS_IN_CALENDAR_MIN = 35;
const DAYS_IN_CALENDAR_MAX = 42;

@Component({
  selector: 'andteam-assessment-datepicker',
  templateUrl: './assessment-datepicker.component.html',
  styleUrls: ['./assessment-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssessmentDatepickerComponent implements OnInit {
  @Input() initialDate = new Date();
  @Input() selectedDay: Date;

  currentDate: Date;
  days: IDay[];
  weekDays = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
  ];

  ngOnInit(): void {
    this.currentDate = this.selectedDay || this.initialDate;
    this.days = this.getDays(this.currentDate);
  }

  private getDays(currentMonth: Date): IDay[] {
    const firstDayOfTheWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() || 7;
    const previousMonthLastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);

    const currentDaysCount = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const previousDaysCount = firstDayOfTheWeek - 1;

    const previousCurrentDaysCount = currentDaysCount + previousDaysCount;
    const nextDaysCount = previousCurrentDaysCount > DAYS_IN_CALENDAR_MIN
      ? DAYS_IN_CALENDAR_MAX - previousCurrentDaysCount
      : DAYS_IN_CALENDAR_MIN - previousCurrentDaysCount;

    const currentDays = this.getCurrentDays(currentDaysCount, currentMonth);
    const previousDays = this.getPreviousDays(previousDaysCount, previousMonthLastDay);
    const nextDays = this.getNextDays(nextDaysCount);

    return [...previousDays, ...currentDays, ...nextDays];
  }

  private getCurrentDays(length: number, date: Date): IDay[] {
    // tslint:disable:prefer-array-literal
    return Array.from(new Array(length), (_, index) => {
      const value = `${index + 1}`;
      const disabled = false;
      const selected = this.selectedDay &&
        new Date(date.getFullYear(), date.getMonth(), Number(value)).getTime() === this.selectedDay.getTime();

      return { value, disabled, selected };
    });
  }

  private getPreviousDays(length: number, previousMonthLastDay: Date): IDay[] {
    return Array.from(new Array(length), (_, index) => {
      const daysInPreviousMonth = previousMonthLastDay.getDate();
      const value = `${daysInPreviousMonth - index}`;
      const disabled = true;
      const selected = false;

      return { value, disabled, selected };
    });
  }

  private getNextDays(length: number): IDay[] {
    return Array.from(new Array(length), (_, index) => {
      const value = `${index + 1}`;
      const disabled = true;
      const selected = false;

      return { value, disabled, selected };
    });
  }
}
