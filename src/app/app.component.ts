import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { SalaryInvoiceService } from '@services/salary-invoice.service';
import { ErrorService } from '@services/error.service';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { HeaderTypes } from '@andkit/components/other/header/header';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { HeaderService } from '@services/header.service';
import { RoutesHistoryService } from '@services/routesHistory.service';
import { GA_TRACKING_ID, COMPANY_FAVICON } from '../../appConfigs/config';

import errorSvg from '!!raw-loader!src/app/pages/employee/icons/error.svg';

declare var ga: Function;
declare var ym: Function;
@Component({
  selector: 'andteam-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit {
  isShowErrorModal = false;
  isShowHeader = false;
  headerType: string;
  errorMessages: string[];

  readonly errorIcon = errorSvg;

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private errorService: ErrorService,
    private headerService: HeaderService,
    private routersHistoryService: RoutesHistoryService,
    private salaryInvoiceService: SalaryInvoiceService,
    ) {
    this.setFavicon(COMPANY_FAVICON);
  }

  public ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof ActivationEnd && event.snapshot.data.name),
      map((event: ActivationEnd) => event.snapshot.data.name),
      distinctUntilChanged()
    )
      .subscribe(
        (path: string) => {
          this.routersHistoryService.addPath(path);
          this.headerType = this.getHeaderType(path);
          this.isShowHeader = path !== 'forbidden-page';
          this.changeDetectorRef.markForCheck();
        }
      );

    this.errorService.getError().subscribe(
      (errors) => {
        this.isShowErrorModal = true;
        this.errorMessages = errors;
        this.changeDetectorRef.markForCheck();
      }
    );

    registerLocaleData(ru, 'ru');
  }

  public ngAfterViewInit(): void {
    if (GA_TRACKING_ID) {
      // tslint:disable-next-line:typedef
      (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function (): void {
          (i[r].q = i[r].q || []).push(arguments);
        };
        i[r].l = new Date().getTime();
        a = s.createElement(o);
        m = s.getElementsByTagName('head')[0];
        a.async = 1;
        a.src = g;
        m.appendChild(a);
      })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

      ga('create', GA_TRACKING_ID, 'auto');
      ga('send', 'pageview');
    }
  }

  public onCloseModal(): void {
    this.isShowErrorModal = false;
  }

  private getHeaderType(path: string): string {
    switch (path) {
      case 'main':
        this.headerService.triggerScrollableHeader(false);

        return HeaderTypes.Portal;
      case 'hot-news':
        this.headerService.triggerScrollableHeader(false);

        return HeaderTypes.Portal;
      case 'add-news':
        this.headerService.triggerScrollableHeader(false);

        return HeaderTypes.Portal;
      case 'add-event':
        this.headerService.triggerScrollableHeader(false);

        return HeaderTypes.Portal;
      case 'employee':
        this.headerService.triggerScrollableHeader(true);

        return HeaderTypes.Team;
      case 'employee-list':
        this.headerService.triggerScrollableHeader(true);

        return HeaderTypes.Team;
      case 'assessment':
        this.headerService.triggerScrollableHeader(true);

        return HeaderTypes.Team;
      case 'merch':
        this.headerService.triggerScrollableHeader(false);

        return HeaderTypes.Portal;
      default:
        this.headerService.triggerScrollableHeader(true);

        return HeaderTypes.Portal;
    }
  }

  private setFavicon(faviconPath: string): void {
    const linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'icon');
    linkElement.setAttribute('type', 'image/x-icon');
    linkElement.setAttribute('href', faviconPath);
    document.head.appendChild(linkElement);
  }
}
