import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEmployee } from '@interfaces/userInfo.interface';
import closeSmallSvg from '!!raw-loader!@assets/images/closeSmall.svg';

@Component({
  selector: 'andteam-project-employee-list-modal',
  templateUrl: './project-employee-list-modal.component.html',
  styleUrls: ['./project-employee-list-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectEmployeeListModalComponent {
  public columnDefs: string[] = ['Employee', 'Technology', 'Role', 'RM'];
  readonly closeIcon = closeSmallSvg;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      employeeList: IEmployee[],
      title: string,
    }) { }
}
