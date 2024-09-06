import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { HTML_TYPE, URL_TYPE } from '@constants/safe-pipe.constants';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, type: string = HTML_TYPE): SafeHtml | SafeUrl {
    const lowerCaseType = type.toLowerCase();
    switch (lowerCaseType) {
      case URL_TYPE:
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case HTML_TYPE:
        return this.sanitizer.bypassSecurityTrustHtml(value);
      default:
        break;
    }
  }
}
