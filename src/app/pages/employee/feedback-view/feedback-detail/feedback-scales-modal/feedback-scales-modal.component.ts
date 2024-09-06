import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FeedbackService } from '@services/feedback.service';

@Component({
  selector: 'andteam-feedback-scales-modal',
  templateUrl: './feedback-scales-modal.component.html',
  styleUrls: ['./feedback-scales-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackScalesModalComponent {
  @Input() public positionType: string;
  @Input() public scaleItem = [];

  public minMarkValue = 1;
  public maxMarkValue = 5;

  constructor(private feedbackService: FeedbackService) {
  }

  public getFeedbackSkillName(key: string): string {
    return this.feedbackService.getFeedbackSkillName(key, this.positionType);
  }
}
