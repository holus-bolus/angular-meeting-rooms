import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
import { Location } from '@angular/common';
import { CompanyService } from '@services/company.service';

import dotSvg from '!!raw-loader!./image/dot.svg';


@Component({
  selector: 'andteam-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundPageComponent {
  public dot: string = dotSvg;
  public showBackgroundImage: boolean;

  constructor(
    private location: Location,
    public companyService: CompanyService) {
    this.showBackgroundImage = this.companyService.companyErrorBackground;
  }

  public togglePreviousPage(): void {
    this.location.back();
  }
}
