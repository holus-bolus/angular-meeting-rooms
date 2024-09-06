import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textLength'
})
export class TextLengthPipe implements PipeTransform {
  transform(value: string, maxLength: number): string {
    return value.length > maxLength ? `${value.substring(0, maxLength)}...` : value;
  }
}
