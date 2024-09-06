import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { CompanyService } from '@services/company.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import infoHeaderSvg from '!!raw-loader!@assets/images/info-header.svg';

@Component({
  selector: 'andteam-external-header',
  templateUrl: './external-header.component.html',
  styleUrls: ['./external-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExternalHeaderComponent {
  @Input() showInfoButton = true;

  @Output() infoClick: EventEmitter<void> = new EventEmitter();

  public showLongHeaderLogo: boolean;
  public logoIcon: SafeHtml;
  public logoTextIcon: SafeHtml;
  public longLogoIcon: SafeHtml;

  public infoIcon = infoHeaderSvg;

  constructor(
    private sanitizer: DomSanitizer,
    private companyService: CompanyService) {
    this.showInfoButton = true;
    this.showLongHeaderLogo = !!this.companyService.companyHeaderLogo && !this.companyService.companyLogoText;
    this.logoIcon = this.sanitizer.bypassSecurityTrustHtml(this.companyService.companyLogo as any);
    this.logoTextIcon = this.sanitizer.bypassSecurityTrustHtml(this.companyService.companyLogoText as any);
    this.longLogoIcon = this.sanitizer.bypassSecurityTrustHtml(this.companyService.companyHeaderLogo as any);
  }

  public onInfoClick(): void {
    this.infoClick.emit();
  }
}
