import { Pipe, PipeTransform } from '@angular/core';
import { truncate } from './truncate';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, ...arg: any): string {
    return truncate(value, ...arg);
  }
}
