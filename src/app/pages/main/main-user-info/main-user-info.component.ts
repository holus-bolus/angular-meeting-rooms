import { PortalInputFileComponent } from '@andkit/components/inputs/portal-input-file/portal-input-file.component';
import { ConfirmModalComponent } from '@andkit/components/modals/confirm-modal/confirm-modal.component';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BROWSERS } from '@constants/browsers';
import { Colors } from '@pages/create-event/create-event/create-event';
import { BrowserService } from '@services/browser.service';
import { EmployeeService } from '@services/employee.service';
import { ImageLoadService } from '@services/imageLoad.service';
import { UserService } from '@services/user.service';
import { b64toBlob } from '@utils/base-functions';
import { imageExtensionValidator } from '@validators/image-extension.validator';
import { imageMaxSizeValidator } from '@validators/max-size-image.validator';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import {
  MAIN_ERROR_IMAGE_UPLOAD_DATA,
  MAIN_ERROR_IMAGE_UPLOAD_HEIGHT,
  MAIN_ERROR_IMAGE_UPLOAD_WIDTH,
} from './image-upload';

import { IMAGE_MESSAGE } from './main-user-info';
import closeSvg from '!!raw-loader!../../../core/andkit/components/inputs/portal-input/icons/close.svg';


interface IProblemPayload {
  posterImageFile: string[];
  posterPreviewImageFile: any;
  posterLoadedFileName: string[];
  posterPreviewLoadedFileName: string[];
}

@Component({
  selector: 'andteam-main-user-info',
  templateUrl: './main-user-info.component.html',
  styleUrls: ['./main-user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainUserInfoComponent implements OnInit, OnDestroy {
  @Input() username: string;
  @Input() usernameEn: string;
  @Input() avatar: string | ArrayBuffer;
  @Input() isBlockBackground: boolean;
  @Input() externalId: string;

  @Output() openSuccessPopup = new EventEmitter<void>();

  public isOpenEditImageModal = false;
  public isCropperImageLoaded = false;
  public updateAvatarForm: FormGroup;
  public isCropperActive = false;
  public colors = Colors;
  public fileImageCropped: any;
  public fileImageToCrop: File;
  public fileImage: string | ArrayBuffer;
  public newAvatar: string | ArrayBuffer;
  public isHoverEvent = true;
  public description = IMAGE_MESSAGE.DESCRIPTION;
  public isSubmitted = false;
  public transform: ImageTransform = {};
  public scale = 1;
  public imageMessageError$ = new Subject();
  public imagePreviewMessageError$ = new Subject();

  readonly closeIcon = closeSvg;

  @ViewChild(PortalInputFileComponent, { static: false }) fileInput: PortalInputFileComponent;

  private destroy$ = new Subject();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private imageLoadService: ImageLoadService,
    private browserService: BrowserService,
    private employeeService: EmployeeService,
    private modalWindow: MatDialog,
  ) {
  }

  public ngOnInit(): void {
    this.updateAvatarForm = this.formBuilder.group({
      posterImageFile: ['', [
        Validators.required,
        imageExtensionValidator,
        imageMaxSizeValidator,
      ]],
      posterPreviewImageFile: ['', [Validators.required]],
      posterLoadedFileName: [''],
      posterPreviewLoadedFileName: [''],
    });

    this.updateAvatarForm.get('posterImageFile').updateValueAndValidity();
    this.updateAvatarForm.get('posterImageFile').statusChanges
      .pipe(
        filter(control => control.invalid),
        tap(() => {
          this.imageMessageError$.next(this.getImageErrorMessage());
        }),
        takeUntil(this.destroy$),
      );
    this.updateAvatarForm.get('posterPreviewImageFile').statusChanges
      .pipe(
        filter(control => control.invalid),
        tap(() => {
          this.imagePreviewMessageError$.next(this.getImagePosterErrorMessage());
        }),
        takeUntil(this.destroy$),
      );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onCloseEditImageModal(): void {
    this.isOpenEditImageModal = true;
  }

  public onOpenEditImageModal(): void {
    this.isOpenEditImageModal = false;
    this.fileImageToCrop = null;
  }


  public onImageLoaded(): void {
    this.isCropperImageLoaded = true;
  }

  public onImageCropped(event: ImageCroppedEvent): void {
    const b64Data = event.base64;
    const contentType = 'image/jpeg';

    this.fileImageCropped = b64toBlob(b64Data.substr(22), contentType);
  }

  public onSend(): void {
    this.isSubmitted = true;

    if (this.updateAvatarForm.valid) {
      this.sendImage(this.updateAvatarForm.value);

      this.isSubmitted = false;
    }
  }

  public cropImage(): void {
    const name = this.fileImageToCrop.name;
    const browser = this.browserService.getBrowser();
    const file = browser === BROWSERS.EDGE
      ? { name, ...this.fileImageCropped, lastModifiedDate: new Date(), type: 'image/jpeg' }
      : new File([this.fileImageCropped], name, { type: this.fileImageToCrop.type });

    this.updateAvatarForm.get('posterPreviewImageFile').setValue(file);
    this.updateAvatarForm.get('posterPreviewLoadedFileName').setValue('');
    this.isCropperImageLoaded = true;
    this.isCropperActive = true;
    this.fileImageToCrop = null;

    this.onSend();
    this.onOpenEditImageModal();
  }

  public sendImage({ posterPreviewImageFile }: IProblemPayload): void {
    const formData = new FormData();

    if (posterPreviewImageFile) {
      formData.append('file', posterPreviewImageFile);
    }

    this.imageLoadService.readFile(posterPreviewImageFile)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(
        (image: string | ArrayBuffer) => {
          this.newAvatar = image;
          this.avatar = this.fileImage;
          this.changeDetectorRef.markForCheck();
        },
      );
    this.employeeService.updatePhoto(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.openSuccessPopup.emit();
      });
  }

  public handleFiles(files: File[]): void {
    if (this.isExtensionAllowed(files)) {
      if (files[0].size > 3000000) {
        const errorModal = this.modalWindow.open(ConfirmModalComponent, {
          width: MAIN_ERROR_IMAGE_UPLOAD_WIDTH,
          height: MAIN_ERROR_IMAGE_UPLOAD_HEIGHT,
          panelClass: 'upload-image-error',
          data: MAIN_ERROR_IMAGE_UPLOAD_DATA,
        });

        errorModal.componentInstance.cancelEvent
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => errorModal.close());

        errorModal.componentInstance.confirmEvent
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            errorModal.close();
            this.fileInput.triggerImageSelect();
          });
      } else {
        this.fileImageToCrop = files[0];
        this.isCropperActive = true;
        this.updateAvatarForm.get('posterImageFile').setValue(files[0]);
        this.updateAvatarForm.get('posterLoadedFileName').setValue('');
        this.updateAvatarForm.get('posterPreviewImageFile').setValue('');
        this.imageLoadService.readFile(files[0])
          .pipe(
            takeUntil(this.destroy$),
          )
          .subscribe(
            (image: string | ArrayBuffer) => {
              this.fileImage = image;
              this.changeDetectorRef.markForCheck();
            },
          );
        this.onCloseEditImageModal();

        return;
      }
    }
  }

  public handleHover(isHoverEvent: boolean): void {
    this.isHoverEvent = isHoverEvent;
  }

  public handleFileInput(event: Event): void {
    this.transform = {
      ...this.transform,
      scale: Number((event.target as HTMLInputElement).value),
    };
  }

  private getImageErrorMessage(): string {
    const { posterImageFile } = this.updateAvatarForm.controls;
    const isValidationFailed = this.isSubmitted && posterImageFile.invalid;

    if (isValidationFailed) {
      const { errors } = posterImageFile;

      switch (true) {
        case !!errors.required:
          return;
        case !!errors.extensionError:
          return IMAGE_MESSAGE.EXTENSION_ERROR_MESSAGE;
        case !!errors.sizeError:
          return IMAGE_MESSAGE.SIZE_ERROR_MESSAGE;
      }
    }
  }

  private getImagePosterErrorMessage(): string {
    const { posterPreviewImageFile } = this.updateAvatarForm.controls;
    const posterImage = this.updateAvatarForm.get('posterImageFile').value;
    const isValidationFailed = this.isSubmitted && posterImage && posterPreviewImageFile.invalid;

    if (isValidationFailed) {
      const { errors } = posterPreviewImageFile;

      switch (true) {
        case !!errors.required:
          return IMAGE_MESSAGE.PREVIEW_IMAGE_ERROR_MESSAGE;
      }
    }
  }

  private isExtensionAllowed(files: File[]): boolean {
    return files.every((file: File) => {
      const fileExtension = file.type.split('/')[1];

      return IMAGE_MESSAGE.ALLOWED_EXTENSIONS.some(extension => extension === fileExtension);
    });
  }
}


