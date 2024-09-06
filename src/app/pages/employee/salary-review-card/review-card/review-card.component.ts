import { Component, Input } from '@angular/core';
import { IEmployeesReview } from '@interfaces/candidate';
import { linkType } from '@constants/types/linkType.constants';

import skype from '!!raw-loader!./icons/skype.svg';

@Component({
  selector: 'andteam-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent {
  @Input() review: IEmployeesReview;
  @Input() isActive = false;

  skypeIcon = skype;
  linkType = linkType;
}
