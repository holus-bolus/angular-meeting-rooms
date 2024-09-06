import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICommonOption } from '@interfaces/filter';
import { BehaviorSubject } from 'rxjs';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import { EMPLOYEE_ROUTE_NAME, LEAVE_FEEDBACK_ON_PROJECT_NAME } from '@constants/routes-name';
import { Router } from '@angular/router';

import closeSvg from '!!raw-loader!@assets/images/close-modal.svg';


@Component({
  selector: 'andteam-feedback-on-project-generate',
  templateUrl: './feedback-on-project-generate.component.html',
  styleUrls: ['./feedback-on-project-generate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackOnProjectGenerateComponent implements OnInit {
  public closeIcon: string = closeSvg;
  public availableProjects$ = new BehaviorSubject<ICommonOption[]>(null);
  public projectControl = new FormControl('', Validators.required);

  public btnCancel = BUTTON_TYPES.PREVIOUS;
  public btnNext = BUTTON_TYPES.SUBMIT;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      availableProjects: ICommonOption[],
      userId: string
    },
    private dialogRef: MatDialogRef<FeedbackOnProjectGenerateComponent>,
    private router: Router,
  ){}

  ngOnInit(): void {
   this.availableProjects$.next(this.data.availableProjects);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onCreateFeedback(): void {
    this.router.navigate(
      [`${EMPLOYEE_ROUTE_NAME}/${this.data.userId}${LEAVE_FEEDBACK_ON_PROJECT_NAME}/${this.projectControl.value.id}`],
      { state: {
        previousPath: 'project-tab',
      }});
    this.dialogRef.close();
  }
}
