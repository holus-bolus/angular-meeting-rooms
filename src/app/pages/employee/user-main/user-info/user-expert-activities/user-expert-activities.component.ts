import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
  ChangeDetectorRef
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExpertActivitiesModalComponent } from '@pages/expert-activities/expert-activities-modal/expert-activities-modal.component';
import { EXPERT_ACTIVITIES_MODAL_WIDTH } from '@pages/expert-activities/expert-activities.const';
import { IActivities, IActivity } from '@interfaces/expert-activities.interface';

import plusSvg from '!!raw-loader!@assets/images/plus.svg';
import { ExpertActivitiesService } from '@services/expert-activities.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'andteam-user-expert-activities',
  templateUrl: './user-expert-activities.component.html',
  styleUrls: ['./user-expert-activities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserExpertActivitiesComponent implements OnInit {
  @Input() expertActivities: IActivities[];
  @Input() isCanEditActivities: boolean;
  @Input() userId: string;

  @Output() editedActivitiesEmit = new EventEmitter();

  public userActivities: IActivity[];
  public allActivities: any;
  public isAllActivitiesUsed = new BehaviorSubject(false);

  readonly plusIcon = plusSvg;

  constructor(
    private modalWindow: MatDialog,
    private expertActivitiesService: ExpertActivitiesService,
    private cdr: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.getAllActivities();
    this.setupActivitiesOrder();
    this.getUserActivities();
    this.handleActivitiesUpdate();
  }

  public editActivitiesModal(isEdit: boolean = false, activity?: any): void {
    if (!isEdit && this.userActivities.length >= this.allActivities.length) {
      return;
    }

    if (this.isCanEditActivities) {
      const editDialogRef = this.modalWindow.open(ExpertActivitiesModalComponent, {
        width: EXPERT_ACTIVITIES_MODAL_WIDTH,
        disableClose: true,
        data: {
          isEdit,
          activity,
          userActivities: this.userActivities,
          expertActivities: this.allActivities,
          userId: this.userId,
        },
      });

      editDialogRef.componentInstance.checkedActivities
        .subscribe(() => {
          this.getUserActivities();
        });
    }
  }

  public getUserActivities(): void {
    this.expertActivitiesService.getEmployeeExpertActivities(this.userId)
      .subscribe((activities: IActivity[]) => {
        this.userActivities = activities;

        if (this.userActivities?.length >= this.allActivities?.length) {
          this.isAllActivitiesUsed.next(true);
        }

        this.cdr.detectChanges();
      }
    );
  }

  public getAllActivities(): void {
    this.expertActivitiesService.getListOfActivities().subscribe((response) => {
      this.allActivities = response;
    });
  }

  private handleActivitiesUpdate(): void {
    this.expertActivitiesService.userId.subscribe((id) => {
      this.userId = id;
      this.getUserActivities();
    });
  }

  private setupActivitiesOrder(): void {
    this.expertActivities.splice(2, 0,  this.expertActivities.splice(4, 1)[0]);
  }
}
