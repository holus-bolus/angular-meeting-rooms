import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CompanyService } from '@services/company.service';

import skypeSvg from '!!raw-loader!./icons/skype.svg';
import facebookSvg from '!!raw-loader!./icons/facebook.svg';
import telegramSvg from '!!raw-loader!./icons/telegram.svg';
import linkedinSvg from '!!raw-loader!./icons/linkedin.svg';
import whatsappSvg from '!!raw-loader!./icons/whatsapp.svg';
import emailSvg from '!!raw-loader!./icons/email.svg';
import phoneSvg from '!!raw-loader!./icons/phone.svg';


@Component({
  selector: 'andteam-footer-external',
  templateUrl: './footer-external.component.html',
  styleUrls: ['./footer-external.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FooterExternalComponent implements OnInit {
  public skypeIcon = skypeSvg;
  public facebookIcon = facebookSvg;
  public whatsappIcon = whatsappSvg;
  public telegramIcon = telegramSvg;
  public linkedinIcon = linkedinSvg;
  public emailIcon = emailSvg;
  public phoneIcon = phoneSvg;
  public logoIcon: string;
  public companyURL: string;
  public whatsappLink: string;
  public telegramLink: string;
  public skypeLink: string;
  public facebookLink: string;
  public linkedinLink: string;

  constructor(public companyService: CompanyService) {
    this.logoIcon = this.companyService.companyLogo;
    this.companyURL = this.companyService.companyUrl;
    this.whatsappLink = this.companyService.socialsNetworksUrls.WhatsApp;
    this.telegramLink = this.companyService.socialsNetworksUrls.Telegram;
    this.skypeLink = this.companyService.socialsNetworksUrls.Skype;
    this.facebookLink = this.companyService.socialsNetworksUrls.Facebook;
    this.linkedinLink = this.companyService.socialsNetworksUrls.LinkedIn;
  }

  public ngOnInit():void {

  }
}
