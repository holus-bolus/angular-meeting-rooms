import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { IEmployeeInterview } from '@interfaces/interview';

import itemsListSvg from '!!raw-loader!../../icons/items-list.svg';
import noInterviewSvg from '!!raw-loader!../../icons/no-interview.svg';

const NO_ACTIVE_INTERVIEWS = 'You don\'t have active interviews';
const NO_PREVIOUS_INTERVIEWS = 'You don\'t have previous interviews';

@Component({
  selector: 'andteam-interviews-list',
  templateUrl: './interviews-list.component.html',
  styleUrls: ['./interviews-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterviewsListComponent {
  @Input() public isCurrent: boolean;
  @Input() public hasNextPage: boolean;
  @Input() public totalItems: number;
  @Input() public isInterviewer: boolean;
  @Input() public isShowSpinner: boolean;
  @Input() public interviews: IEmployeeInterview[];

  @Output() public toggleActive = new EventEmitter<boolean>();
  @Output() public showMore = new EventEmitter<void>();
  @Output() public finish = new EventEmitter<void>();

  readonly listIcon = itemsListSvg;
  readonly noInterviewsIcon = noInterviewSvg;
  readonly noActiveInterviewsMessage = NO_ACTIVE_INTERVIEWS;
  readonly noPreviousInterviewsMessage = NO_PREVIOUS_INTERVIEWS;

  public onToggleActive(isActive: boolean): void {
    this.toggleActive.emit(isActive);
  }

  public onShowMore(): void {
    this.showMore.emit();
  }

  public onFinish(): void {
    this.finish.emit();
  }

  public trackById(index: number, { salaryReviewId }: IEmployeeInterview): string {
    return salaryReviewId;
  }
}
