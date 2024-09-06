import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  CERTIFICATE_NOTIFICATION,
  CERTIFICATE_UPDATE_NOTIFICATION,
  NO_CERTIFICATE_MESSAGE
} from '@pages/employee/certificate/certificate.const';
import { ICertificate, ICertificateData } from '@interfaces/certificates.interface';
import { CertificateModalViewComponent } from '@pages/employee/certificate/certificate-modal-view/certificate-modal-view.component';
import { CertificateModalHrViewComponent } from '@pages/employee/certificate/certificate-modal-hr-view/certificate-modal-hr-view.component';
import { CertificateService } from '@services/certificate.service';
import { Router } from '@angular/router';
import sliderLeftSvg from '!!raw-loader!@assets/images/slider-left.svg';
import sliderRightSvg from '!!raw-loader!@assets/images/slider-right.svg';
import { takeUntil } from 'rxjs/operators';
import { CertificateViewComponent } from './certificate-view/certificate-view.component';
import { ACTION_OPTION_DOWNLOAD, ACTION_OPTION_PRINT } from '@andkit/components/selects/action-selector/action-selector.config';
import { ChooseDownloadTypeModalComponent } from './choose-download-type-modal/choose-download-type-modal.component';
import { ITechnologyLevel } from '@interfaces/technology-levels';
import { TechnologyService } from '@services/technology.service';
import { ICommonOption } from '@interfaces/filter';
import { PrintService } from '@services/print.service';

@Component({
  selector: 'andteam-certificate-main',
  templateUrl: './certificate-main.component.html',
  styleUrls: ['./certificate-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificateMainComponent implements OnInit, OnDestroy {
  @ViewChild(CertificateViewComponent) certificateViewComponent: CertificateViewComponent;
  @ViewChild('versions') versions: ElementRef;

  public certificateList$: Observable<ICertificateData>;
  public certificateList: ICertificateData;
  public isModalDataUpdated$ = new BehaviorSubject<boolean>(false);
  public isCertificateUpdated$ = new BehaviorSubject<boolean>(false);
  public technologyLevelList: ITechnologyLevel[];
  public technologies: ICommonOption[];
  public employeeId: string;
  public noCertificateMessage = NO_CERTIFICATE_MESSAGE;
  public sliderLeftIcon = sliderLeftSvg;
  public sliderRightIcon = sliderRightSvg;
  public cardsOffset = 0;
  public cardWidth = 380;
  public certificateListOffset: number;
  public certificateVersions: ICertificate[];
  public certificateVersionsWidth: number[] = [];
  public isCertificateNotification$ = new BehaviorSubject<boolean>(false);
  public currentCertificate: ICertificate;
  public currentIndex = 0;
  public editModal: MatDialogRef<CertificateModalHrViewComponent>;

  private destroy$ = new Subject();

  get slideLeftAvailable(): boolean {
    return this.cardsOffset < 0;
  }

  get slideRightAvailable(): boolean {
    return this.cardsOffset !== -this.certificateListOffset;
  }

  get getNotificationText(): string {
    return this.currentCertificate
      ? `${CERTIFICATE_NOTIFICATION} ${this.currentCertificate.employeeName}`
      : CERTIFICATE_UPDATE_NOTIFICATION;
  }

  get versionsHeight(): number {
    if (this.versions) {
      return +this.versions.nativeElement.clientHeight;
    }
  }

  constructor(
    private certificateService: CertificateService,
    private router: Router,
    private modalWindow: MatDialog,
    private printService: PrintService,
    private technologyService: TechnologyService,
    private cdr: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.getCertificateList();
    this.getTechnologies();
    this.certificateService.isCertificateUpdated$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: boolean) => {
        if (value) {
          this.getCertificateList();
        }
      });
  }

  public certificateView(certificates: ICertificate[], certificateList: ICertificateData): void {
    const { canEdit, canPrint, canSave } = certificateList;

    canEdit && certificates.length > 1
      ? this.editModal = this.modalWindow.open(CertificateModalHrViewComponent, {
        width: '1116x',
        maxWidth: '1116px',
        backdropClass: 'backdropBackgroundHr',
        panelClass: 'certificate-hr-container',
        autoFocus: false,
        data: {
          certificates,
          techLevelList: this.technologyLevelList,
          technologies: this.technologies,
          isUpdated$: this.isCertificateUpdated$
        },
      })
      : this.modalWindow.open(CertificateModalViewComponent, {
        width: '842px',
        maxWidth: '842px',
        backdropClass: 'backdropBackground',
        panelClass: 'certificate-view-container',
        autoFocus: false,
        data: {
          certificates,
          canEdit,
          canPrint,
          canSave,
          isFromMain: true,
          currentIndex: 0,
          isLastCertificateVersion: this.isLastCertificate(certificateList, certificates),
          techLevelList: this.technologyLevelList,
          technologies: this.technologies
        },
      });
  }

  public onActionChoose(action: string, index?: number): void {
    this.currentIndex = index;
    this.cdr.detectChanges();
    switch (action) {
      case ACTION_OPTION_DOWNLOAD.name: this.openDownloadModal();
        break;
      case ACTION_OPTION_PRINT.name: this.printCertificate();
        break;
    }
  }

  public getCertificateList(): void {
    this.certificateService.getEmployeeCertificates$(this.getEmployeeId())
      .pipe(takeUntil(this.destroy$))
      .subscribe((certificatesData: ICertificateData) => {
        if (certificatesData.certificates) {
          this.certificateList = certificatesData;
          this.setCertificateVersions(this.certificateList);
          this.updateModalData(certificatesData.certificates[certificatesData.certificates.length - 1]);
          this.certificateListOffset = this.certificateList.certificates.slice(2, this.certificateList.certificates.length - 1).length;
          this.certificateService.isCertificateUpdated$.next(false);

          if (this.certificateVersions) {
            this.setCertificateVersionsWidth(this.certificateVersions);
          }

          this.cdr.detectChanges();
        }
      });
  }

  public getEmployeeId(): string {
    return this.router.url.split('/')[2];
  }

  public slideLeft(): void {
    if (this.slideLeftAvailable) {
      this.cardsOffset++;
    }
  }

  public slideRight(): void {
    if (this.slideRightAvailable) {
      this.cardsOffset--;
    }
  }

  public setCertificateVersionsWidth(versions: ICertificate[]): void {
    versions.reduce((acc: number) => {
      this.certificateVersionsWidth = [...this.certificateVersionsWidth, acc - 3];

      return acc - 3;
    },              100);

    this.certificateVersionsWidth.reverse();
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

  public openDownloadModal(): void {
    const downloadModal = this.modalWindow.open(ChooseDownloadTypeModalComponent, {
      width: '480px',
      height: '346px',
      data: this.certificateViewComponent.downloadElement,
      autoFocus: false
    });

    downloadModal.componentInstance.closeModal
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        downloadModal.close();
        this.cdr.detectChanges();
      });
  }

  public isLastCertificate({ certificates, canEdit }: ICertificateData, certificate: ICertificate[]): boolean {
    return canEdit && certificates[certificates.length - 1] === certificate;
  }

  public toggleCertificateHover(certificate: ICertificate): void {
    if (certificate) {
      certificate.isHover = !certificate.isHover;
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next(false);
    this.destroy$.complete();
    this.certificateService.isCertificateUpdated$.complete();
  }

  private getTechnologies(): void {
    this.technologyService.getTechnologyLevels()
      .pipe(takeUntil(this.destroy$))
      .subscribe((technologyLevels: ITechnologyLevel[]) => this.technologyLevelList = technologyLevels);

    this.technologyService.getTechnologies()
      .pipe(takeUntil(this.destroy$))
      .subscribe((technologies: ICommonOption[]) => this.technologies = technologies);
  }

  private updateModalData(certificates: ICertificate[]): void {
    if (this.editModal && this.editModal.componentInstance) {
      this.editModal.componentInstance.data.certificates = certificates;
      this.isCertificateUpdated$.next(true);
    }
  }

  private setCertificateVersions({ certificates }: ICertificateData): void {
    const certificateVersions: ICertificate[] = certificates[certificates.length - 1];

    if (certificateVersions && certificateVersions.length > 1) {
      certificateVersions.reverse();
      this.certificateVersions = certificateVersions.slice(1, certificateVersions.length);
    }

    if (certificateVersions && certificateVersions.length > 1) {
      this.certificateVersions = certificateVersions.slice(1, 6);
    }
  }

  private printCertificate(): void {
    if (window.pageYOffset) {
      window.scrollTo({ top: 0 });
    }

    this.printService.printImage(this.certificateViewComponent.downloadElement.nativeElement);
  }
}
