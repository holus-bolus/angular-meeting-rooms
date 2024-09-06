import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { cloneDeep } from 'lodash';
import {
  IOvertime,
  IOvertimeConfiguration,
  IOvertimeForEditing,
  IOvertimeModals,
  IOvertimeNotifications,
  IOvertimePayload,
  IOvertimePopups
} from '@interfaces/overtime.interface';
import { IOverviewShort, IOverviewShortForTable } from '@interfaces/overview.interface';
import { OvertimeService } from '@services/portal/overtime.service';
import {
  CONFIRMATION_MODAL_MESSAGE,
  NOTIFICATIONS_TEXTS,
  OVERTIME_STATUS,
  TABLE_HEAD
} from '@constants/overtime.const';
import { MENU_ACTIONS, TableMenu, TableMenuAction } from '@andkit/components/other/table/table.config';
import { FileTypesConstants } from '@constants/types/fileTypes.constants';
import { TimeService } from '@services/portal/time.service';
import menuSvg from '!!raw-loader!src/assets/images/menu.svg';
import pdfFileSvg from '!!raw-loader!src/assets/images/pdf-file.svg';
import pngFileSvg from '!!raw-loader!src/assets/images/png-file.svg';
import fileSvg from '!!raw-loader!src/assets/images/file.svg';

@Component({
  selector: 'andteam-overtime',
  templateUrl: './overtime.component.html',
  styleUrls: ['./overtime.component.scss']
})
export class OvertimeComponent implements OnInit, OnDestroy {
  public tableHead = TABLE_HEAD;
  public popups: IOvertimePopups = {
    modals: { view: false, add: false, edit: false, confirmation: false },
    notification: false
  };
  public overtimesForTable: IOverviewShortForTable[];
  public overtimeConfiguration: IOvertimeConfiguration;
  public myOvertime: IOvertime;
  public editedOvertime: IOvertimeForEditing;
  public notificationText: string;
  public confirmationDeleteText = CONFIRMATION_MODAL_MESSAGE.OVERTIME_DELETE;
  public confirmationDeleteSubText = CONFIRMATION_MODAL_MESSAGE.OVERTIME_DELETE_SUBTEXT;
  public idForDeleting: string;
  public isOnlyAndersen = false;
  public isAdditionalApproverRequired = false;
  public hintLink: string;
  public isNullOversData: boolean;

  private updatedType$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private overtimeService: OvertimeService,
              private timeService: TimeService,
              private cd: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.getOvertimes();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSelectOvertimeType(type: string): void {
    this.updatedType$.next(type);
  }

  public onOvertimeConfiguration(event: IOvertimeConfiguration): void {
    this.overtimeConfiguration = event;
  }

  public onOnlyAndersen(event: boolean): void {
    this.isOnlyAndersen = event;
  }

  public onAdditionalApproverRequired(event: boolean): void {
    this.isAdditionalApproverRequired = event;
  }

  public onHintLink(event: string): void {
    this.hintLink = event;
  }

  public onSubmitOvertime(overtimePayload: IOvertimePayload): void {
    this.overtimeService.addOvertime$(overtimePayload)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.showNotification('add');
        this.getOvertimes();
        this.cd.markForCheck();
        this.isNullOversData = true;
      });
    this.manageModals('add', false);
  }

  public onEditOvertime(overtimeId: string, overtimePayload: IOvertimePayload): void {
    this.overtimeService.editOvertime$(overtimeId, overtimePayload)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.showNotification('edit');
        this.getOvertimes();
        this.cd.markForCheck();
      });
    this.manageModals('edit', false);
  }

  public onFadeOut(): void {
    this.popups = { ...this.popups, notification: false };
  }

  public manageModals(modalName: keyof IOvertimeModals, open: boolean): void {
    this.popups = { ...this.popups, modals: { ...this.popups.modals, [modalName]: open } };
  }

  public handleMenuAction({ item: { id }, action }: TableMenuAction): void {
    switch (action) {
      case MENU_ACTIONS.OPEN:
        this.overtimeService.getOvertime$(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe((overtime: IOvertime) => {
            this.manageModals('view', true);
            this.myOvertime = overtime;
            this.cd.markForCheck();
          });
        break;
      case MENU_ACTIONS.DELETE:
        this.idForDeleting = id;
        this.manageModals('confirmation', true);
        break;
      case MENU_ACTIONS.EDIT:
        this.overtimeService.getOvertimeForEditing$(id)
          .pipe(
            takeUntil(this.destroy$),
          )
          .subscribe((overtimeForEditing: IOvertimeForEditing) => {
            if (overtimeForEditing.configuration && overtimeForEditing.configuration.required) {
              this.isOnlyAndersen = this.overtimeService.isAndersenProject(overtimeForEditing.configuration);
              this.isAdditionalApproverRequired = this.overtimeService.isAdditionalApproverRequired(overtimeForEditing.configuration);
              this.hintLink = this.overtimeService.getHintLink(overtimeForEditing.configuration);
            }

            this.editedOvertime = overtimeForEditing;
            this.manageModals('edit', true);
            this.cd.markForCheck();
          });
        break;
      default:
        break;
    }
  }

  public onDeleteOvertime(overtimeId: string): void {
    this.manageModals('confirmation', false);
    this.overtimeService.deleteOvertime$(overtimeId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.showNotification('delete');
        this.getOvertimes();
        this.cd.markForCheck();
        this.isNullOversData = false;
      });
  }

  private createOverMenu(status: string): TableMenu {
    return (status === OVERTIME_STATUS.ACTIVE || status === OVERTIME_STATUS.NOT_COLLECTED)
      ? {
        icon: menuSvg,
        actions: [MENU_ACTIONS.OPEN, MENU_ACTIONS.EDIT, MENU_ACTIONS.DELETE]
      }
      : {
        icon: menuSvg,
        actions: [MENU_ACTIONS.OPEN]
      };
  }

  private showNotification(actionType: keyof IOvertimeNotifications): void {
    this.popups = { ...this.popups, notification: true };
    this.notificationText = NOTIFICATIONS_TEXTS[actionType];
  }

  private getOvertimes(): void {
    this.overtimeService.getOvertimes$()
      .pipe(
        map((myOvertimes: IOverviewShort[]) => this.formatMyOvertimes(myOvertimes)),
        tap((myOvertimes: IOverviewShortForTable[]) => {
          this.overtimesForTable = cloneDeep(myOvertimes);
          this.cd.markForCheck();
          this.isNullOversData = myOvertimes.length > 0;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private formatMyOvertimes(overtimes: IOverviewShort[]): IOverviewShortForTable[] {
    return overtimes.map((overtime: IOverviewShort) => {
      return {
        ...overtime,
        date: this.timeService.getTimezoneDate(overtime.period).format('MMMM YYYY'),
        attachment: {
          icon: this.getIconForAttachment(overtime.attachment),
          name: overtime.attachment
            ? ((splittedByDot = overtime.attachment.split('.')) => splittedByDot[splittedByDot.length - 1])()
            : null,
        },
        menu: this.createOverMenu(overtime.status)
      };
    });
  }

  private getIconForAttachment(attachmentLink: string): string {
    if (!attachmentLink) {
      return null;
    }

    const format = attachmentLink.substring(attachmentLink.lastIndexOf('.') + 1, attachmentLink.length);

    switch (format) {
      case FileTypesConstants.PDF:
        return pdfFileSvg;
      case FileTypesConstants.PNG:
        return pngFileSvg;
      default:
        return fileSvg;
    }
  }
}
