import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import printingSvg from '!!raw-loader!@assets/images/printing.svg';
import closeSmallSvg from '!!raw-loader!@assets/images/closeSmall.svg';
import arrowLeftGraySvg from '!!raw-loader!@assets/images/arrow-left-gray.svg';
import downloadSvg from '!!raw-loader!@assets/images/download.svg';
import editSvg from '!!raw-loader!@assets/images/edit.svg';
import letterSvg from '!!raw-loader!@assets/images/letter.svg';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICertificate } from '@interfaces/certificates.interface';
import {
  CERTIFICATE_NOTIFICATION,
  CERTIFICATE_UPDATE_NOTIFICATION,
  CONFIRM_MODAL_HEIGHT,
  CONFIRM_MODAL_SEND_PARAMS,
  CONFIRM_MODAL_WIDTH,
  EDIT_MODAL_HEIGHT,
  EDIT_MODAL_WIDTH
} from '../certificate.const';
import { CertificateModalEditComponent } from '../certificate-modal-edit/certificate-modal-edit.component';
import { CertificateViewComponent } from '@pages/employee/certificate/certificate-view/certificate-view.component';
import {
  ChooseDownloadTypeModalComponent
} from '@pages/employee/certificate/choose-download-type-modal/choose-download-type-modal.component';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { CertificateService } from '@services/certificate.service';
import { ConfirmModalComponent } from '@andkit/components/modals/confirm-modal/confirm-modal.component';
import { takeUntil, catchError } from 'rxjs/operators';
import { ITechnologyLevel } from '@interfaces/technology-levels';
import { ICommonOption } from '@interfaces/filter';
import { PrintService } from '@services/print.service';

@Component({
  selector: 'andteam-certificate-modal-view',
  templateUrl: './certificate-modal-view.component.html',
  styleUrls: ['./certificate-modal-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CertificateModalViewComponent implements OnInit, OnDestroy {
  @ViewChild(CertificateViewComponent) certificateViewComponent: CertificateViewComponent;
  @Output() confirmModal = new EventEmitter<null>();

  public printerIcon = this.sanitizer.bypassSecurityTrustHtml(printingSvg as any);
  public closeIcon = this.sanitizer.bypassSecurityTrustHtml(closeSmallSvg as any);
  public arrowIcon = this.sanitizer.bypassSecurityTrustHtml(arrowLeftGraySvg as any);
  public downloadIcon = this.sanitizer.bypassSecurityTrustHtml(downloadSvg as any);
  public editIcon = this.sanitizer.bypassSecurityTrustHtml(editSvg as any);
  public letterIcon = this.sanitizer.bypassSecurityTrustHtml(letterSvg as any);
  public isCertificateNotification$ = new BehaviorSubject<boolean>(false);
  public isCertificateUpdated = false;

  private destroy$ = new Subject();

  get isLastCertificateVersion(): boolean {
    return this.data.certificates && ((!this.data.isFromMain && this.data.currentIndex === 0) || this.data.isLastCertificateVersion);
  }

  get isRightArrowDisabled(): boolean {
    return this.data.currentIndex === this.data.certificates.length - 1;
  }

  get isLeftArrowDisabled(): boolean {
    return this.data.currentIndex === 0;
  }

  get getNotificationText(): string {
    return !this.isCertificateUpdated
      ? `${CERTIFICATE_NOTIFICATION} ${this.data.certificates[this.data.currentIndex].employeeName}`
      : CERTIFICATE_UPDATE_NOTIFICATION;
  }

  get isArrowDisabled(): boolean {
    return this.data.certificates && this.data.certificates.length > 1;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      certificates: ICertificate[],
      canEdit: boolean,
      canPrint: boolean,
      canSave: boolean,
      currentIndex: number,
      isFromHr: boolean,
      isFromMain: boolean,
      isLastCertificateVersion: boolean;
      techLevelList: ITechnologyLevel[];
      technologies: ICommonOption[]
    },
    private sanitizer: DomSanitizer,
    private modalWindow: MatDialog,
    private certificateService: CertificateService,
    private printService: PrintService
  ) { }

  public ngOnInit(): void { }

  public slideRight(): void {
    if (!this.isRightArrowDisabled) {
      this.data.isLastCertificateVersion = false;
      this.data.currentIndex++;
    }
  }

  public slideLeft(): void {
    if (!this.isLeftArrowDisabled) {
      this.data.isLastCertificateVersion = false;
      this.data.currentIndex--;
    }
  }

  public slideToNextVersion(index: number): void {
    this.data.currentIndex = index;
  }

  public editCertificateVersion(): void {
    const editModal = this.modalWindow.open(CertificateModalEditComponent, {
      width: EDIT_MODAL_WIDTH,
      height: EDIT_MODAL_HEIGHT,
      disableClose: true,
      data: {
        certificate: this.data.certificates[this.data.currentIndex],
        techLevelList: this.data.techLevelList,
        technologies: this.data.technologies,
        isFromView: true
      },
      panelClass: 'certificate-modal-edit-component'
    });

    editModal.componentInstance.closeModal
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        editModal.close();
      });

    editModal.componentInstance.confirmModal
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        editModal.close();
        this.isCertificateNotification$.next(true);
        this.isCertificateUpdated = true;
        this.confirmModal.emit();
      });
  }

  public downloadCertificate(): void {
    const downloadModal = this.modalWindow.open(ChooseDownloadTypeModalComponent, {
      width: '480px',
      height: '346px',
      autoFocus: false,
      data: this.certificateViewComponent.downloadElement
    });

    downloadModal.componentInstance.closeModal
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        downloadModal.close();
      });
  }

  public printCertificate(): void {
    this.printService.printImage(this.certificateViewComponent.downloadElement.nativeElement);
  }

  public onFadeOut(): void {
    this.isCertificateNotification$.next(false);
    this.isCertificateUpdated = false;
  }

  public onSend(): void {
    const data = { ...CONFIRM_MODAL_SEND_PARAMS };
    data.titleText = `${data.titleText} ${this.data.certificates[this.data.currentIndex].employeeName}?`;

    const confirmDialog = this.modalWindow.open(ConfirmModalComponent, {
      data,
      width: CONFIRM_MODAL_WIDTH,
      height: CONFIRM_MODAL_HEIGHT
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
    this.certificateService.sendCertificateNotification(this.data.certificates[this.data.currentIndex])
      .pipe(
        takeUntil(this.destroy$),
        catchError((error: Error) => throwError(error))
      )
      .subscribe(() => this.isCertificateNotification$.next(true));
  }
}
