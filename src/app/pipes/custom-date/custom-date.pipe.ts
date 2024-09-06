import { Pipe, PipeTransform  } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(date: string, matcher: string): any {
    const transformDate = new Date(date);

    return this.datePipe.transform(transformDate, matcher);
  }
}
