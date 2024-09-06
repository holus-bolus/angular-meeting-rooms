import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  TemplateRef,
  OnDestroy
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  ACTION_OPTION_DOWNLOAD,
  ACTION_OPTION_EDIT,
  ACTION_OPTION_PRINT,
  ACTION_OPTION_SEND,
  IActionSelectorOption
} from '@andkit/components/selects/action-selector/action-selector.config';

import ukFlagIconSvg from '!!raw-loader!@assets/images/uk-flag-icon.svg';
import dividerSvg from '!!raw-loader!@assets/images/divider.svg';
import arrowRightSvg from '!!raw-loader!@assets/images/arrow-right.svg';
import stampSvg from '!!raw-loader!@assets/images/stamp.svg';

import printingSvg from '!!raw-loader!@assets/images/printing.svg';
import downloadSvg from '!!raw-loader!@assets/images/download.svg';
import editSvg from '!!raw-loader!@assets/images/edit.svg';
import letterSvg from '!!raw-loader!@assets/images/letter.svg';

import { ICertificate } from '@interfaces/certificates.interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CertificateModalEditComponent } from '@pages/employee/certificate/certificate-modal-edit/certificate-modal-edit.component';

import {
  CONFIRM_MODAL_WIDTH,
  EDIT_MODAL_WIDTH,
  CONFIRM_MODAL_SEND_PARAMS,
  EDIT_MODAL_HEIGHT,
  CONFIRM_MODAL_HEIGHT
} from '../certificate.const';
import { ConfirmModalComponent } from '@andkit/components/modals/confirm-modal/confirm-modal.component';
import { CertificateService } from '@services/certificate.service';
import { Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { ITechnologyLevel } from '@interfaces/technology-levels';
import { ICommonOption } from '@interfaces/filter';
import { CompanyService } from '@services/company.service';

@Component({
  selector: 'andteam-certificate-view',
  templateUrl: './certificate-view.component.html',
  styleUrls: ['./certificate-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CertificateViewComponent implements OnInit, OnDestroy {
  @Input() public certificate: ICertificate;
  @Input() public isViewVersion = false;
  @Input() public isLastCertificateVersion = false;
  @Input() public canEdit = false;
  @Input() public canSave = false;
  @Input() public canPrint = false;
  @Input() public isFromHr = false;
  @Input() public techLevelList: ITechnologyLevel[];
  @Input() public technologies: ICommonOption[];

  @Output() public actionChoose = new EventEmitter<string>();
  @Output() public showNotification = new EventEmitter<ICertificate | null>();

  @ViewChild('download') downloadElement: ElementRef;
  @ViewChild('download') printElement: TemplateRef<any>;

  public logoIcon: SafeHtml;
  public sign: SafeHtml;
  public ceoName: string;
  public companyName: string;
  public iconUKFlag = this.sanitizer.bypassSecurityTrustHtml(ukFlagIconSvg as any);
  public stamp = this.sanitizer.bypassSecurityTrustHtml(stampSvg as any);
  public divider = this.sanitizer.bypassSecurityTrustHtml(dividerSvg as any);
  public arrow = this.sanitizer.bypassSecurityTrustHtml(arrowRightSvg as any);
  public printerIcon = this.sanitizer.bypassSecurityTrustHtml(printingSvg as any);
  public downloadIcon = this.sanitizer.bypassSecurityTrustHtml(downloadSvg as any);
  public editIcon = this.sanitizer.bypassSecurityTrustHtml(editSvg as any);
  public letterIcon = this.sanitizer.bypassSecurityTrustHtml(letterSvg as any);
  public iconType = 'more_vert';
  public menuItems: IActionSelectorOption[] = [ACTION_OPTION_EDIT, ACTION_OPTION_SEND, ACTION_OPTION_DOWNLOAD, ACTION_OPTION_PRINT];
  public isShowActionMenu = false;
  public isOpenActionDropdown = false;
  public menuIcons: SafeHtml[] = [this.editIcon, this.letterIcon, this.downloadIcon, this.printerIcon];
  public editModal: MatDialogRef<CertificateModalEditComponent>;

  private destroy$ = new Subject();

  get getMenuItems(): IActionSelectorOption[] {
    return this.canEdit && this.isLastCertificateVersion ? this.menuItems : this.menuItems.slice(2, this.menuItems.length);
  }

  get getMenuIcons(): SafeHtml[] {
    return this.canEdit && this.isLastCertificateVersion ? this.menuIcons : this.menuIcons.slice(2, this.menuIcons.length);
  }

  get isActionMenu(): boolean {
    return !this.isViewVersion && (this.canEdit || this.canPrint || this.canSave);
  }

  constructor(
    private modalWindow: MatDialog,
    private sanitizer: DomSanitizer,
    private certificateService: CertificateService,
    public companyService: CompanyService,
  ) {
    this.logoIcon = this.sanitizer.bypassSecurityTrustHtml(this.companyService.companyLogo as any);
    this.sign = this.sanitizer.bypassSecurityTrustHtml(this.companyService.companyCeoSign as any);
    this.ceoName = this.companyService.companyCeoName;
    this.companyName = this.companyService.companyName;
  }

  public ngOnInit(): void {
  }

  public onSelectMenuOption(event: IActionSelectorOption): void {
    this.actionChoose.emit(event.name);

    const actions = {
      [ACTION_OPTION_EDIT.name]: () => this.openEditModal(),
      [ACTION_OPTION_SEND.name]: () => this.onSend(),
    };

    if (actions[event.name]) {
      actions[event.name]();
    }
  }

  public openEditModal(): void {
    this.editModal = this.modalWindow.open(CertificateModalEditComponent, {
      width: EDIT_MODAL_WIDTH,
      height: EDIT_MODAL_HEIGHT,
      disableClose: true,
      data: {
        certificate: this.certificate,
        techLevelList: this.techLevelList,
        technologies: this.technologies,
        isFromView: this.isFromHr
      },
      panelClass: 'certificate-modal-edit-component'
    });

    this.editModal.componentInstance.closeModal
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.editModal.close();
      });

    this.editModal.componentInstance.confirmModal
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.editModal.close();
        this.showNotification.emit();
      });
  }

  public showActionMenu(): void {
    this.isShowActionMenu = true;
  }

  public hideActionMenu(isHover?: boolean): void {
    if (isHover && !this.isOpenActionDropdown) {
      this.isShowActionMenu = false;
    }

    if (!isHover) {
      this.isShowActionMenu = false;
      this.isOpenActionDropdown = false;
    }
  }

  public openActionMenu(): void {
    this.isOpenActionDropdown = true;
  }

  public isActivePosition(level: string): boolean {
    if (!this.certificate.beforeTechnologyLevel) {
      this.certificate.beforeTechnologyLevel === this.techLevelList[0].fullName;
    }

    return level === this.certificate.afterTechnologyLevel;
  }

  public isShowDivider(level: string, index: number): boolean {
    return index !== 0;
  }

  public onSend(): void {
    const data = { ...CONFIRM_MODAL_SEND_PARAMS };
    data.titleText = `${data.titleText} ${this.certificate.employeeName}?`;

    const confirmDialog = this.modalWindow.open(ConfirmModalComponent, {
      data,
      width: CONFIRM_MODAL_WIDTH,
      height: CONFIRM_MODAL_HEIGHT,
    });

    confirmDialog.componentInstance.cancelEvent
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        confirmDialog.close();
      });

    confirmDialog.componentInstance.confirmEvent
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.sendCertificateNotification();

        confirmDialog.close();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private sendCertificateNotification(): void {
    this.certificateService.sendCertificateNotification(this.certificate)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error: Error) => throwError(error))
      )
      .subscribe(() => this.showNotification.emit(this.certificate));
  }
}
