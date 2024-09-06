import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BrowserService } from '@services/browser.service';
import { imageExtensionValidator } from '@validators/image-extension.validator';
import { imageMaxSizeValidator } from '@validators/max-size-image.validator';
import { BROWSERS } from '@constants/browsers';
import { ImageLoadService } from '@services/imageLoad.service';
import { DataToAnotherComponentService } from '@services/dataToAnotherComponent.service';
import { b64toBlob } from '@utils/base-functions';
import cameraSvg from '!!raw-loader!@assets/images/camera.svg';
interface IProblemPayload {
  posterImageBackgroundFile: string[];
  posterPreviewImageBackgroundFile: Blob;
  posterLoadedBackgroundFileName: string[];
  posterPreviewLoadedBackgroundFileName: string[];
}

interface IImageMessage {
  description?: string;
  allowed_extensions?: string[];
  extension_error_message?: string;
  size_error_message?: string;
  preview_image_error_message?: string;
  image_size?: number;
}

interface IOutPutData {
  fileData: FormData;
  background: string | ArrayBuffer;
}

@Component({
  selector: 'andteam-img-background-uploader',
  templateUrl: './img-background-uploader.html',
  styleUrls: ['./img-background-uploader.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImgBackgroundUploaderComponent implements OnInit, OnDestroy {
  public cameraSVG: string = cameraSvg;
  public fileImageBackgroundToCrop: File;
  public fileImageBackgroundCropped: any;
  public isBackgroundCropperActive = false;
  public updateBackgroundForm: FormGroup;
  public fileImageBackground: string | ArrayBuffer;
  public isSubmitted = false;
  public isCropperImageBackgroundLoaded = false;
  public imageMessageError$ = new Subject();
  public imagePreviewMessageError$ = new Subject();
  public isBlockBackground: boolean;
  public imageSVG = 'src/assets/images/camera.svg';
  public imageMessages: IImageMessage = {
    description: 'File size limit: 3 MB. Formats: jpg, png',
    allowed_extensions: ['png', 'jpg', 'jpeg'],
    extension_error_message: 'The following formats are supported: jpg, png',
    size_error_message: 'File size limit is 3 MB',
    preview_image_error_message: 'Press crop button to set preview image',
    image_size: 3145728
  };

  @Input() set newImageMessages(messages: IImageMessage) {
    this.imageMessages = { ...this.imageMessages, ...messages };
  }
  @Input() isButton = false;

  @Output() changeBackground = new EventEmitter<IOutPutData>();
  @Output() blockBackgroundImageOutput = new EventEmitter<boolean>();

  private destroy$ = new Subject();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private browserService: BrowserService,
    private imageLoadService: ImageLoadService,
    private formBuilder: FormBuilder,
    private dataService: DataToAnotherComponentService
  ) { }

  public ngOnInit(): void {
    this.updateBackgroundForm = this.formBuilder.group({
      posterImageBackgroundFile: ['', [
        Validators.required,
        imageExtensionValidator,
        imageMaxSizeValidator,
      ]],
      posterPreviewImageBackgroundFile: ['', [Validators.required]],
      posterLoadedBackgroundFileName: [''],
      posterPreviewLoadedBackgroundFileName: ['']
    });

    this.updateBackgroundForm.get('posterImageBackgroundFile')?.statusChanges
      .pipe(
        filter(control => control.invalid),
        tap(() => this.imageMessageError$.next(this.getImageErrorMessage())),
        takeUntil(this.destroy$)
      );
    this.updateBackgroundForm.get('posterPreviewImageBackgroundFile')?.statusChanges
      .pipe(
        filter(control => control.invalid),
        tap(() => this.imagePreviewMessageError$.next(this.getImagePosterErrorMessage())),
        takeUntil(this.destroy$)
      );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onBackgroundImageLoaded(): void {
    this.isCropperImageBackgroundLoaded = true;
    this.isBlockBackground = true;
    this.sendStatusBackGround(this.isBlockBackground);
    this.dataService.isChangeStatusOfState = this.isBlockBackground;
  }

  public onBackgroundImageCropped(event: ImageCroppedEvent): void {
    const b64Data = event.base64;
    const contentType = 'image/jpeg';

    this.fileImageBackgroundCropped = b64toBlob(b64Data.substr(22), contentType);
  }

  public onBackgroundSend(): void {
    this.isSubmitted = true;

    if (this.updateBackgroundForm.valid) {
      this.sendBackground(this.updateBackgroundForm.value);
    }

    this.isBlockBackground = true;
    this.sendStatusBackGround(this.isBlockBackground);
    this.dataService.isChangeStatusOfState = this.isBlockBackground;
  }

  public sendBackground({ posterPreviewImageBackgroundFile }: IProblemPayload): void {
    const formData = new FormData();

    if (posterPreviewImageBackgroundFile) {
      formData.append('file', posterPreviewImageBackgroundFile);
    }

    this.imageLoadService.readFile(posterPreviewImageBackgroundFile)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        (image) => {
          const outPutData: IOutPutData = { fileData: formData, background: image };

          this.changeBackground.emit(outPutData);
          this.isSubmitted = false;
          this.changeDetectorRef.markForCheck();
        }
      );

    this.isBackgroundCropperActive = false;
  }

  public cropBackgroundImage(): void {
    const name = this.fileImageBackgroundToCrop.name;
    const browser = this.browserService.getBrowser();
    const file = browser === BROWSERS.EDGE
      ? { ...this.fileImageBackgroundCropped, name, lastModifiedDate: new Date(), type: 'image/jpeg' }
      : new File([this.fileImageBackgroundCropped], name, { type: this.fileImageBackgroundToCrop.type });

    this.updateBackgroundForm.get('posterPreviewImageBackgroundFile').setValue(file);
    this.updateBackgroundForm.get('posterPreviewLoadedBackgroundFileName').setValue('');
    this.isCropperImageBackgroundLoaded = true;
    this.isBackgroundCropperActive = false;
    this.fileImageBackgroundToCrop = null;
    this.onBackgroundSend();
    this.isBlockBackground = false;
    this.sendStatusBackGround(this.isBlockBackground);
    this.dataService.isChangeStatusOfState = this.isBlockBackground;
  }

  public cancelCropBackground(): void {
    this.isCropperImageBackgroundLoaded = true;
    this.isBackgroundCropperActive = false;
    this.fileImageBackgroundToCrop = null;
    this.isBlockBackground = false;
    this.sendStatusBackGround(this.isBlockBackground);
    this.dataService.isChangeStatusOfState = this.isBlockBackground;
  }

  public handleFiles(files: File[]): void {
    if (this.isExtensionAllowed(files)) {
      this.fileImageBackgroundToCrop = files[0];
      this.isBackgroundCropperActive = true;
      this.updateBackgroundForm.get('posterImageBackgroundFile').setValue(files[0]);
      this.updateBackgroundForm.get('posterLoadedBackgroundFileName').setValue('');
      this.updateBackgroundForm.get('posterPreviewImageBackgroundFile').setValue('');
      this.imageLoadService.readFile(files[0])
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(
          (image) => {
            this.fileImageBackground = image;
            this.changeDetectorRef.markForCheck();
          }
        );
    }
  }

  private isExtensionAllowed(files: File[]): boolean {
    return files.every((file) => {
      const fileExtension = file.type.split('/')[1];

      return this.imageMessages.allowed_extensions.some(extension => extension === fileExtension);
    });
  }

  private getImageErrorMessage(): string {
    const { posterImageBackgroundFile } = this.updateBackgroundForm.controls;
    const isValidationFailed = this.isSubmitted && posterImageBackgroundFile.invalid;

    if (isValidationFailed) {
      const { errors } = posterImageBackgroundFile;

      switch (true) {
        case !!errors.required:
          return;
        case !!errors.extensionError:
          return this.imageMessages.extension_error_message;
        case !!errors.sizeError:
          return this.imageMessages.size_error_message;
      }
    }
  }

  private getImagePosterErrorMessage(): string {
    const { posterPreviewImageBackgroundFile } = this.updateBackgroundForm.controls;
    const posterBackgroundImage = this.updateBackgroundForm.get('posterImageBackgroundFile').value;
    const isValidationFailed = this.isSubmitted && posterBackgroundImage && posterPreviewImageBackgroundFile.invalid;

    if (isValidationFailed) {
      const { errors } = posterPreviewImageBackgroundFile;

      if (!!errors.required) {
        return this.imageMessages.preview_image_error_message;
      }
    }
  }

  private sendStatusBackGround(isBlock: boolean): void {
    this.blockBackgroundImageOutput.emit(isBlock);
  }
}
