import { Component, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Colors } from '@pages/create-event/create-event/create-event';
import { ModalScrollService } from '@services/modalScroll.service';
import { SIZES } from '@constants/file.constants';
import { ImageLoadService } from '@services/imageLoad.service';
import { sizeValidator } from '@validators/size.validator';

export const offices = [
  {
    name: 'Minsk',
    id: 1,
  },
  {
    name: 'Gomel',
    id: 2,
  },
  {
    name: 'Odessa',
    id: 3,
  }
];

// tslint:disable-next-line:prefer-template
const DESCRIPTION = 'File size limit: 15 MB. \n' +
  'The following formats are supported: jpg, png \n' +
  'Drag and drop or Browse from device';
const ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg'];
const REQUIRED_FIELD = 'Field is required';
const SIZE_ERROR_MESSAGE = 'File size limit is 15 MB';

@Component({
  selector: 'andteam-portal-problem-modal',
  templateUrl: './portal-problem-modal.component.html',
  styleUrls: ['./portal-problem-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortalProblemModalComponent implements OnDestroy, OnInit {
  @Output() public send = new EventEmitter<string>();
  @Output() public sendCloseEvent = new EventEmitter<void>();

  public isConfirmationModal = true;
  public offices = offices;
  public problemForm: FormGroup;
  public isShowImage = true;
  public colors = Colors;
  public fileImage: string | ArrayBuffer;
  public isHoverEvent = true;
  public description = DESCRIPTION;
  public isSubmitted = false;

  public get showTitleBox(): boolean {
    return !this.fileImage || (this.fileImage && this.isHoverEvent);
  }

  public get messageError(): string {
    const { message } = this.problemForm.controls;
    const isValidationFailed = this.isSubmitted && message.invalid;

    if (isValidationFailed) {
      const { errors } = message;

      if (!!errors.required) {
        return REQUIRED_FIELD;
      }
    }
  }

  public get hasMessageError(): boolean {
    return this.problemForm.get('message').errors && this.isSubmitted;
  }

  public get imagesError(): string {
    const { images } = this.problemForm.controls;
    const isValidationFailed = this.isSubmitted && images.invalid;

    if (isValidationFailed) {
      const { errors } = images;

      if (!!errors.sizeError) {
        return SIZE_ERROR_MESSAGE;
      }
    }
  }

  public get hasImagesError(): boolean {
    return this.problemForm.get('images').errors && this.isSubmitted;
  }

  constructor(
    private scroll: ModalScrollService,
    private formBuilder: FormBuilder,
    private imageLoadService: ImageLoadService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.problemForm = this.formBuilder.group({
      message: ['', [Validators.required]],
      images: ['', [sizeValidator(SIZES.IMAGE)]],
    });
  }

  public ngOnDestroy(): void {
    if (!this.isConfirmationModal) {
      this.scroll.enable();
    }
  }

  public onSend(): void {
    this.isSubmitted = true;

    if (this.problemForm.valid) {
      this.isConfirmationModal = false;
      this.send.emit(this.problemForm.value);
      this.isSubmitted = false;
    }
  }

  public onOpenConfirmationModal(): void {
    this.sendCloseEvent.emit();
  }

  public onChangeValue(message: string): void {
    this.problemForm.get('message').setValue(message);
  }

  public handleFiles(files: File[]): void {
    if (this.isExtensionAllowed(files)) {
      this.problemForm.get('images').setValue(files);
      this.imageLoadService.readFile(files[0])
        .subscribe(
          (image) => {
            this.fileImage = image;
            this.changeDetectorRef.markForCheck();
          }
        );
    }
  }

  public handleHover(isHoverEvent: boolean): void {
    this.isHoverEvent = isHoverEvent;
  }

  private isExtensionAllowed(files: File[]): boolean {
    return files.every((file: File) => {
      const fileExtension = file.type.split('/')[1];

      return ALLOWED_EXTENSIONS.some(extension => extension === fileExtension);
    });
  }
}
