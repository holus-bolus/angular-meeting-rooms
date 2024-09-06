import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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

import closeSmallSvg from '!!raw-loader!@assets/images/closeSmall.svg';
import arrowLeftSvg from '!!raw-loader!@assets/images/arrow-left.svg';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICertificate } from '@interfaces/certificates.interface';
import { CertificateModalViewComponent } from '../certificate-modal-view/certificate-modal-view.component';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import {
  CERTIFICATE_HEADER_DELAY,
  CERTIFICATE_NOTIFICATION,
  CERTIFICATE_UPDATE_NOTIFICATION,
} from '../certificate.const';
import { ITechnologyLevel } from '@interfaces/technology-levels';
import { ICommonOption } from '@interfaces/filter';
import {
  ChooseDownloadTypeModalComponent
} from '@pages/employee/certificate/choose-download-type-modal/choose-download-type-modal.component';
import { CertificateViewComponent } from '@pages/employee/certificate/certificate-view/certificate-view.component';
import { takeUntil, tap } from 'rxjs/operators';
import {
  ACTION_OPTION_DOWNLOAD,
  ACTION_OPTION_PRINT
} from '@andkit/components/selects/action-selector/action-selector.config';
import { PrintService } from '@services/print.service';

@Component({
  selector: 'andteam-certificate-modal-hr-view',
  templateUrl: './certificate-modal-hr-view.component.html',
  styleUrls: ['./certificate-modal-hr-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CertificateModalHrViewComponent implements OnInit, OnDestroy {
  @ViewChild(CertificateViewComponent) certificateViewComponent: CertificateViewComponent;
  @Output() public confirmModal = new EventEmitter<null>();

  public closeIcon = this.sanitizer.bypassSecurityTrustHtml(closeSmallSvg as any);
  public arrowIcon = this.sanitizer.bypassSecurityTrustHtml(arrowLeftSvg as any);
  public isCertificateNotification$ = new BehaviorSubject<boolean>(false);
  public currentCertificate: ICertificate;
  public currentIndex: number;
  public viewModal: MatDialogRef<CertificateModalViewComponent>;
  public isShowHeader = new BehaviorSubject(false);

  private destroy$ = new Subject();

  get getNotificationText(): string {
    return this.currentCertificate
      ? `${CERTIFICATE_NOTIFICATION} ${this.currentCertificate.employeeName}`
      : CERTIFICATE_UPDATE_NOTIFICATION;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      techLevelList: ITechnologyLevel[],
      certificates: ICertificate[],
      technologies: ICommonOption[],
      isUpdated$: BehaviorSubject<boolean>
    },
    private sanitizer: DomSanitizer,
    private modalWindow: MatDialog,
    private matDialogRef: MatDialogRef<CertificateModalHrViewComponent>,
    private printService: PrintService,
    private cdr: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.data.isUpdated$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: Boolean) => {
        if (value) {
          this.cdr.detectChanges();
          this.updateViewModalData();
          this.data.isUpdated$.next(false);
        }
      });
    this.showHeader();
    this.matDialogRef.beforeClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.isShowHeader.next(false));
  }

  public viewCertificateVersion(currentIndex: number): void {
    this.viewModal = this.modalWindow.open(CertificateModalViewComponent, {
      width: '842px',
      maxWidth: '842px',
      backdropClass: 'backdropBackground',
      panelClass: 'certificate-view-container',
      data: {
        currentIndex,
        isLastCertificateVersion: currentIndex === 0,
        certificates: this.data.certificates,
        canEdit: true,
        canPrint: true,
        canSave: true,
        isFromHr: true,
        techLevelList: this.data.techLevelList,
        technologies: this.data.technologies
      },
    });

    this.viewModal.componentInstance.confirmModal
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.confirmModal.emit();
      });
  }

  public onFadeOut(): void {
    this.isCertificateNotification$.next(false);
  }

  public showNotification(certificate: ICertificate | null): void {
    if (certificate) {
      this.currentCertificate = certificate;
    }

    this.isCertificateNotification$.next(true);
  }

  public toggleCertificateHover(certificate: ICertificate): void {
    if (certificate) {
      certificate.isHover = !certificate.isHover;
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onActionChoose(action: string, index?: number): void {
    this.currentIndex = index;
    this.cdr.detectChanges();
    switch (action) {
      case ACTION_OPTION_DOWNLOAD.name: this.openDownloadModal();
        break;
      case ACTION_OPTION_PRINT.name: {
        this.printService.printImage(this.certificateViewComponent.downloadElement.nativeElement);
        this.currentIndex = null;
      }
        break;
    }
  }

  public openDownloadModal(): void {
    const downloadModal = this.modalWindow.open(ChooseDownloadTypeModalComponent, {
      width: '480px',
      height: '346px',
      data: this.certificateViewComponent.downloadElement,
    });

    downloadModal.componentInstance.closeModal
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        downloadModal.close();
        this.currentIndex = null;
        this.cdr.detectChanges();
      });
  }

  private updateViewModalData(): void {
    if (this.viewModal && this.viewModal.componentInstance) {
      this.viewModal.componentInstance.data.certificates = this.data.certificates;
    }
  }

  private showHeader(): void {
    timer(CERTIFICATE_HEADER_DELAY)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.isShowHeader.next(true)))
      .subscribe();
  }
}
