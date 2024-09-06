import { Pipe, PipeTransform  } from '@angular/core';

@Pipe({
  name: 'multyWordEnd',
})
export class MultiplyEndOfWordPipe implements PipeTransform {
  transform(str: string, count: number): string {
    return count > 1 ? str : `${str}s`;
  }
}
