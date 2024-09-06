import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { IEmployeeCandidate } from '@interfaces/candidate';
import { AssessmentTabs } from '../coordinator-cabinet';
import { linkType } from '@constants/types/linkType.constants';

import skypeSvg from '!!raw-loader!./icons/skype.svg';

@Component({
  selector: 'andteam-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateComponent {
  @Input() public employee: IEmployeeCandidate;
  @Input() public reviewDate: string;
  @Input() public candidateId: string;
  @Input() public isActiveCandidate: boolean;
  @Input() public isCandidateListComponent: boolean;
  @Input() public activeTab: string;
  @Input() public reviewDateFrom1C: string;

  @Output() public showCandidateDetails = new EventEmitter<string>();

  public skypeIcon = skypeSvg;
  public assessmentTabs = AssessmentTabs;
  public linkType = linkType;

  public onShowCandidateDetails(): void {
    this.showCandidateDetails.emit(this.candidateId);
  }

  public preventEvent(event: Event): void {
    event.stopPropagation();
  }
}
