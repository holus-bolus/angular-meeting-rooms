import { switchMap, filter } from 'rxjs/operators';
import { Component, ChangeDetectionStrategy, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  IObjective,
  ObjectivesListColumnsData,
  ObjectiveStatusEnum,
  TypeObjectiveStatusOption
} from '@interfaces/objective';
import { MatDialog } from '@angular/material/dialog';
import { ObjectivesAddModalComponent } from '@pages/employee/objectives-card/objectives-add-modal/objectives-add-modal.component';
import {
  OBJECTIVES_MODAL_TO_ATCHIVE_WIDTH,
  OBJECTIVES_MODAL_WINDOW_WIDTH, OBJECTIVES_STATUS
} from '@pages/employee/objectives-card/objectives-const';
import { ObjectivesService } from '@services/objectives.service';
import {
  ObjectiveToArchiveModalComponent
} from '@pages/employee/objectives-card/objective-to-atchive-modal/objective-to-archive-modal.component';

@Component({
  selector: 'andteam-objectives-list',
  templateUrl: './objectives-list.component.html',
  styleUrls: ['./objectives-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectivesListComponent implements OnInit {
  @Input() showStatusActions = false;
  @Input() canEdit = false;
  @Input() interviewerId = '';
  @Input() employeeId = '';
  @Input() objectives: IObjective[] = [];
  @Output() updateData = new EventEmitter<string>();

  public displayedColumns: string[] = [];
  public readonly objectiveStatuses: TypeObjectiveStatusOption[] = OBJECTIVES_STATUS;
  public readonly objectiveStatusDone = this.objectiveStatuses[0];
  public readonly objectiveStatusFailed = this.objectiveStatuses[1];
  public readonly objectiveStatusEnum = ObjectiveStatusEnum;
  public readonly statusColumnName = 'status';
  public readonly dateColumnName = 'dueDate';
  public readonly utcPostfix = '.000Z';
  public readonly displayedColumnsData: ObjectivesListColumnsData[] = [
    { field: 'objective', label: 'objective' },
    { field: 'type', label: 'type' },
    { field: this.dateColumnName, label: 'due date' },
    { field: 'comment', label: 'comment' },
    { field: this.statusColumnName, label: 'status' }
  ];

  private readonly editMessage = 'The objective has been updated';
  private readonly setStatusMessage = 'The objective has been successfully archived';

  constructor(
    private modalWindow: MatDialog,
    private objectivesService: ObjectivesService
  ) {
  }

  ngOnInit(): void {
    this.displayedColumns = this.displayedColumnsData
      .map((item: ObjectivesListColumnsData) => item.field);
  }

  public openStatus(objectiveData: IObjective): void {
    this.openModal(objectiveData);
  }

  public stopPropagation($event: Event): void {
    $event.stopPropagation();
  }

  public editStatus(objectiveData: IObjective): void {
    this.openModal(objectiveData, false);
  }

  public setStatus(objectiveStaticData: IObjective, objectiveStatus: TypeObjectiveStatusOption): void {
    objectiveStaticData.objectiveStatus = objectiveStatus.id;
    objectiveStaticData.status = objectiveStatus.name;
    objectiveStaticData.interviewerId = this.interviewerId;

    const toArchiveModal = this.modalWindow.open(ObjectiveToArchiveModalComponent, {
      width: OBJECTIVES_MODAL_TO_ATCHIVE_WIDTH,
      disableClose: false,
      data: {
        objectiveStaticData,
        status: objectiveStatus.name
      }
    });

    const subscribeDialogConfirmCancel = toArchiveModal.componentInstance.cancelEvent
      .subscribe(() => {
        toArchiveModal.close();
      });

    const subscribeDialogAddCancel = toArchiveModal.componentInstance.confirmEvent
      .subscribe((comment: string) => {
        objectiveStaticData.comment = comment;

        this.objectivesService.updateObjective(objectiveStaticData.id, objectiveStaticData)
          .subscribe(() => {
            toArchiveModal.close();
            this.updateData.emit(this.setStatusMessage);
          });
      });

    toArchiveModal.afterClosed().subscribe(() => {
      subscribeDialogConfirmCancel.unsubscribe();
      subscribeDialogAddCancel.unsubscribe();
    });
  }

  public rowClick(data: IObjective): void {
    this.openModal(data);
  }

  public isCommentOneWord(value: string = ''): boolean {
    return value.trim().split(' ').length === 1;
  }

  private openModal(objectiveStaticData: IObjective, isDisabled: boolean = true): void {
    const addNewModal = this.modalWindow.open(ObjectivesAddModalComponent, {
      width: OBJECTIVES_MODAL_WINDOW_WIDTH,
      disableClose: true,
      data: {
        objectiveStaticData,
        isDisabled,
        employeeId: this.employeeId,
        interviewerId: this.interviewerId
      }
    });

    const backdropClick = addNewModal.backdropClick()
      .subscribe(() => addNewModal.componentInstance.onClose());

    addNewModal
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(({ id, data }: { id?: string; data: IObjective }) => {
          return this.objectivesService.updateObjective(id, data);
        }),
      )
      .subscribe(() => {
        this.updateData.emit(this.editMessage);
        backdropClick.unsubscribe();
      });
  }
}
