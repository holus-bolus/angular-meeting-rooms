import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Inject,
  OnInit,
  Output,
} from '@angular/core';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { IActivities, IActivity } from '@interfaces/expert-activities.interface';
import { ICommonOption } from '@interfaces/filter';
import { ExpertActivitiesService } from '@services/expert-activities.service';

import closeSvg from '!!raw-loader!@assets/images/close.svg';

@Component({
  selector: 'andteam-expert-activities-modal',
  templateUrl: './expert-activities-modal.component.html',
  styleUrls: ['./expert-activities-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpertActivitiesModalComponent implements OnInit {
  @Output() checkedActivities = new EventEmitter();

  public closeIcon: string = closeSvg;
  public cancelButtonType = BUTTON_TYPES.PREVIOUS;
  public confirmButtonType = BUTTON_TYPES.PRIMARY;
  public expertActivities: ICommonOption[];
  public isEdit = false;
  public selectedActivity: ICommonOption;
  public nameControl = new FormControl('', Validators.required);
  public dateControl = new FormControl('');
  public currentForm = new FormGroup({
    name: this.nameControl,
    date: this.dateControl,
  });

  constructor(
    private expertActivitiesService: ExpertActivitiesService,
    private modalWindow: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      userActivities: any
      expertActivities: IActivities[]
      isEdit: boolean
      userId: string
      activity: IActivity
    },
  ) {
    this.isEdit = data.isEdit;
    this.expertActivities = data.expertActivities.map((activity: any) => {
      return {
        id: activity.expertActivityId,
        name: activity.activityName,
      };
    });

    if (!this.isEdit) {
      for (const value of this.data.userActivities) {
        this.expertActivities = this.expertActivities.filter(item => item.id !== value.id);
      }
    }
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(target: HTMLElement): void {
    if (target.classList.contains('cdk-overlay-backdrop')) {
      this.modalWindow.closeAll();
    }
  }

  public ngOnInit(): void {
    this.setupSelectedActivity();
  }

  public setupSelectedActivity(): void {
    if (this.isEdit) {
      this.nameControl.setValue(this.data.activity.activityName);

      if (this.data.activity.dueDate) {
        this.dateControl.setValue(this.data.activity.dueDate);
      }

      this.selectedActivity = {
        id: this.data.activity.expertActivityId,
        name: this.data.activity.activityName,
      };
    }
  }

  public onSubmit(): void {
    const activity: IActivity = {
      employeeId: this.data.userId,
      expertActivityId: this.expertActivities.find(item => item.name === this.nameControl.value).id,
      dueDate: this.dateControl.value._d,
    };

    this.expertActivitiesService.updateEmployeeExpertActivity(activity.employeeId, activity.expertActivityId, activity.dueDate)
      .subscribe(() => {
        this.checkedActivities.emit();
      });

    this.modalWindow.closeAll();
  }

  public onClose(): void {
    this.modalWindow.closeAll();
  }
}
