import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumber } from 'libphonenumber-js';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(number: string, ...args: string[]): string {

    try {
      const transformNumber = number.startsWith('+') ? number : `+${number}`;

      return parsePhoneNumber(transformNumber).formatInternational();
    } catch (error) {
      return number;
    }
  }
}
