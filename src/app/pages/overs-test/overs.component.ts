import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { OversService } from '@pages/overs-test/overs.service';
import { CONFIRM_MODAL_CANCEL_PARAMS, Overtime, OverTypeGroup } from '@pages/overs-test/overs';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ITab } from '@interfaces/assessment';
import { CompanyService } from '@services/company.service';
import noDataSvg from '!!raw-loader!src/assets/images/no-data.svg';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../core/andkit/components/modals/confirm-modal/confirm-modal.component';
import { CONFIRM_MODAL_WIDTH } from '../employee/certificate/certificate.const';
import { takeUntil } from 'rxjs/operators';


export enum OvertimeTabs {
  create = 'create',
  submitted = 'submitted',
}

@Component({
  selector: 'andteam-overs-test',
  templateUrl: './overs.component.html',
  styleUrls: ['./overs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OversComponent implements OnInit, OnDestroy {

  public overs$: Observable<OverTypeGroup[]>;
  public selectedOverType$: Observable<Overtime>;
  public activeTab = OvertimeTabs.create;
  public overtimeTabs = OvertimeTabs;
  public noDataIcon = noDataSvg;
  public canSelectType = new BehaviorSubject(true);
  public isShowConfirmModal = false;
  public tabs: ITab[] = [
    { title: 'Create new', active: true, key: OvertimeTabs.create },
    { title: 'Submitted', active: false, key: OvertimeTabs.submitted },
  ];
  public modalParams = CONFIRM_MODAL_CANCEL_PARAMS;
  public isOverCreated$ = new BehaviorSubject<boolean>(false);
  public isRemoveSelect$ = new BehaviorSubject<boolean>(false);
  public linkOnWiki: string;
  private destroy$ = new Subject<void>();

  constructor(
    private oversService: OversService,
    private modalWindow: MatDialog,
    private cdr: ChangeDetectorRef,
    private companyService: CompanyService,
    ) {
  }

  ngOnInit(): void {
    this.getAllOvertypes();
    this.linkOnWiki = this.companyService.companyResourcesUrls.OverWiki;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onOverCreate(): void {
    this.onSelectTab(this.overtimeTabs.submitted);
    this.isOverCreated$.next(true);
    this.isRemoveSelect$.next(false);
    this.selectedOverType$ = null;
    this.isShowConfirmModal = false;
  }

  public onFormReset(): void {
    this.selectedOverType$ = null;
    this.isRemoveSelect$.next(true);
  }

  public onFormTouch(): void {
    this.isShowConfirmModal = true;
  }

  public onChooseOver(id: string): void {
    if (this.isShowConfirmModal) {
      const confirmDialog = this.modalWindow.open(ConfirmModalComponent, {
        data: this.modalParams,
        width: CONFIRM_MODAL_WIDTH
      });

      confirmDialog.componentInstance.confirmEvent
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.isRemoveSelect$.next(false);
          this.selectedOverType$ = this.oversService.getSelectedOver(id);
          this.isShowConfirmModal = false;
          this.canSelectType.next(true);
          this.cdr.detectChanges();
        });
    } else {
      this.isRemoveSelect$.next(false);
      this.selectedOverType$ = this.oversService.getSelectedOver(id);
    }
  }

  public onSelectTab(key: OvertimeTabs): void {
    this.onFormReset();
    this.isShowConfirmModal = false;
    this.activeTab = key;

    this.tabs = this.tabs.map((tab) => {
      tab.active = !tab.active;

      return tab;
    });
  }

  public onFadeOut(): void {
    this.isOverCreated$.next(false);
  }

  private getAllOvertypes(): void {
    this.overs$ = this.oversService.getOverTypes();
  }
}
