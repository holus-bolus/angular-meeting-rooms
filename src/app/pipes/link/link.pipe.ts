import { Pipe, PipeTransform } from '@angular/core';
import { linkType } from '@constants/types/linkType.constants';

@Pipe({
  name: 'link'
})
export class LinkPipe implements PipeTransform {

  transform(value: string, target: string): string {
    switch (target) {
      case linkType.SKYPE:
        return `skype:${value}?chat`;
      case linkType.MAIL:
        return `mailto:${value}`;
    }
  }
}
