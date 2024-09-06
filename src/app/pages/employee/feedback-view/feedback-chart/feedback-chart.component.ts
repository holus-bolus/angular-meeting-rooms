import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { IAverageFeedbackScale } from '@interfaces/feedback.interface';
import { FeedbackService } from '@services/feedback.service';
import { COEFFICIENT_CONVERSION_POINTS_TO_PERCENT } from '@pages/feedback/feedback-const';

@Component({
  selector: 'andteam-feedback-chart',
  templateUrl: './feedback-chart.component.html',
  styleUrls: ['./feedback-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackChartComponent  implements OnInit {
  @Input() averageFeedbackData: IAverageFeedbackScale;
  @Input() selfFeedbackData: IAverageFeedbackScale;

  public averageChartData: string[][];
  public selfChartData: string[][];
  public chartDataList: string[][];
  public coefficient = COEFFICIENT_CONVERSION_POINTS_TO_PERCENT;

  constructor(private feedbackService: FeedbackService) { }

  public ngOnInit(): void {
    if (this.averageFeedbackData) {
      this.averageChartData = Object.entries(this.averageFeedbackData);
    }

    if (this.selfFeedbackData) {
      this.selfChartData = Object.entries(this.selfFeedbackData);
    }

    this.chartDataList = this.averageFeedbackData ? this.averageChartData : this.selfChartData;
  }

  public getFeedbackSkillName(key: string): string {
    return this.feedbackService.getFeedbackSkillName(key);
  }
}
