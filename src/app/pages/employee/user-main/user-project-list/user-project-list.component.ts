import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IAllocation } from '@interfaces/userInfo.interface';

@Component({
  selector: 'andteam-user-project-list',
  templateUrl: './user-project-list.component.html',
  styleUrls: ['./user-project-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProjectListComponent {
  @Input() userId: string;
  @Input() allocationsCurrent: IAllocation[];
  @Input() allocationsPrevious: IAllocation[];

  public isShowPreviousProjects = false;
  
  public get toggleBtnName(): string {
    return this.isShowPreviousProjects ? 'Hide previous projects' : 'Show previous projects';
  }

  public onTogglePrevProjects(): void {
    this.isShowPreviousProjects = !this.isShowPreviousProjects;
  }
}
