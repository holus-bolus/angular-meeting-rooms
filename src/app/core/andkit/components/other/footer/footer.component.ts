import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { IHR } from '@interfaces/office';
import { ICommonOption } from '@interfaces/filter';
import { OfficeService } from '@services/office.service';
import { linkType } from '@constants/types/linkType.constants';
import { URL_TYPE } from '@constants/safe-pipe.constants';
import { CompanyService } from '@services/company.service';
import emailSvg from '!!raw-loader!./icons/email.svg';
import phoneSvg from '!!raw-loader!./icons/phone.svg';
import skypeSvg from '!!raw-loader!./icons/skype.svg';

@Component({
  selector: 'andteam-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  @Input() isError: boolean;

  emailIcon: string = emailSvg;
  phoneIcon: string = phoneSvg;
  skypeIcon: string = skypeSvg;
  logoIcon: string;
  privacyPolicy: string;
  url = URL_TYPE;

  hr: IHR;
  hrs: IHR[];
  hrsOptions: ICommonOption[];
  address: string;
  linkType = linkType;

  copyrightText: string;
  headquarterAdress: string;

  constructor(
    private officeService: OfficeService,
    private changeDetectorRef: ChangeDetectorRef,
    private companyService: CompanyService) {
    this.logoIcon = this.companyService.companyLogo;
    this.headquarterAdress = this.companyService.headquarterAdress;
  }

  public ngOnInit(): void {
    this.privacyPolicy = this.companyService.privacyPolicy;
    const currentYear = new Date().getFullYear();
    this.copyrightText = `© Copyright 2007-${ currentYear } ${ this.companyService.companyName } Software , Inc. All Rights Reserved.`;
    this.officeService.getMyOffice$()
      .subscribe(
        ({ address, hrs }) => {
          this.hr = hrs[0];
          this.hrs = hrs;
          this.hrsOptions = hrs.map(hr => this.mappedHr(hr));
          this.address = address;
          this.changeDetectorRef.markForCheck();
        }
      );
  }

  public onSelectOption(hrOption: ICommonOption): void {
    this.hrs.forEach((hr) => {
      if (hr.id === hrOption.id) {
        this.hr = hr;
      }
    });
  }

  private mappedHr(hr: IHR): ICommonOption {
    return {
      id: hr.id,
      name: hr.name,
    };
  }
}
