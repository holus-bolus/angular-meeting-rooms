import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CompanyService } from '@services/company.service';

import dotSvg from '!!raw-loader!../not-found-page/image/dot.svg';

@Component({
  selector: 'andteam-forbidden-page',
  templateUrl: './forbidden-page.component.html',
  styleUrls: ['./forbidden-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForbiddenPageComponent implements OnInit {
  public dot: string;
  public showBackgroundImage: boolean;

  constructor(public companyService: CompanyService) {
    this.showBackgroundImage = this.companyService.companyErrorBackground;
  }

  public ngOnInit(): void {
    this.dot = dotSvg as any;
  }
}
