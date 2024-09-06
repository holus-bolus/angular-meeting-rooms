import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'certificateDate'
})
export class CertificateDatePipe implements PipeTransform {

  transform(date: string): string {
    const currentDate: string = moment().format('YYYY-MM-DD');
    const certificateDate: string = date.split('T')[0];
    const transformedDate: string = moment(date).format('MMM DD');

    return currentDate === certificateDate
      ? `${transformedDate}, ${moment(date).format('H:mm')}`
      : transformedDate;
  }
}
