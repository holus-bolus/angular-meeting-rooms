import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { IAssessment } from '@interfaces/candidate';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';

@Component({
  selector: 'andteam-interview-block',
  templateUrl: './interview-block.component.html',
  styleUrls: ['./interview-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterviewBlockComponent {
  @Input() dateIcon: SafeHtml;
  @Input() assessment: IAssessment;

  secondaryTypeButton = BUTTON_TYPES.SECONDARY;
}
