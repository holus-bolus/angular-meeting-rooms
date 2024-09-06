import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { OfficeService } from '@services/office.service';
import { Observable } from 'rxjs';
import { CompanyService } from '@services/company.service';

// import logoSvg from '!!raw-loader!@assets/images/logo.svg';

@Component({
  selector: 'andteam-error-header',
  templateUrl: './error-header.component.html',
  styleUrls: ['./error-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorHeaderComponent implements OnInit {
  public logoIcon: SafeHtml;
  public location$: Observable<string>;

  constructor(
    private sanitizer: DomSanitizer,
    private officeService: OfficeService,
    private companyService: CompanyService,
  ) {
    this.logoIcon = this.sanitizer.bypassSecurityTrustHtml(this.companyService.companyLogo as any);
  }

  public ngOnInit(): void {


    this.location$ = this.officeService.getMyOffice$().pipe(
      map(({ name }) => name),
    );
  }

}
