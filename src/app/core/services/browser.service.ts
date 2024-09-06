import { Injectable } from '@angular/core';
import { BROWSERS } from '@constants/browsers';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  getBrowser(): string {
    const userAgent = navigator.userAgent;

    if (userAgent.indexOf('Firefox') > -1) {
      return BROWSERS.MOZILLA;
    } else if (userAgent.indexOf('Opera') > -1) {
      return BROWSERS.OPERA;
    } else if (userAgent.indexOf('Trident') > -1) {
      return BROWSERS.IE;
    } else if (userAgent.indexOf('Edge') > -1) {
      return BROWSERS.EDGE;
    } else if (userAgent.indexOf('Chrome') > -1) {
      return BROWSERS.CHROME;
    } else if (userAgent.indexOf('Safari') > -1) {
      return BROWSERS.SAFARI;
    }

    return BROWSERS.UNKNOWN_BROWSER;
  }
}
