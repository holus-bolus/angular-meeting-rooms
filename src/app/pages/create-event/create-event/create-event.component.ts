import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { ImageLoadService } from '@services/imageLoad.service';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { forkJoin, of, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { ICommonOption } from '@interfaces/filter';
import { OfficeService } from '@services/office.service';
import { ITechnologyStackTags } from '@interfaces/employee';
import { ICreationEventResponse, IOffice } from '@interfaces/event';
import { TopicsService } from '@services/portal/topics.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '@services/portal/event.service';
import { Location } from '@angular/common';
import { ImagesService } from '@services/images.service';
import { CANCEL_MODAL_DATA, Colors, CONFIRM_MODAL_DATA, CONFIRM_MODAL_WIDTH } from './create-event';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { BrowserService } from '@services/browser.service';
import { BROWSERS } from '@constants/browsers';
import { TimeService } from '@services/portal/time.service';
import { FORMATS } from '@constants/moment.constant';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@andkit/components/modals/confirm-modal/confirm-modal.component';

const ALL_OFFICES = 'All offices';
const EXTENSION_ERROR_MESSAGE = 'The following formats are supported: jpg, png';
const SIZE_ERROR_MESSAGE = 'File size limit is 3 MB';
const IMAGE_SIZE = 3145728;
const TOP_POSITION = 120;
const MAX_LENGTH_TEXT = 10022;
const MAXLENGTH_TEXT_ERROR_MESSAGE = 'Invalid text length, max size - 10000';
// tslint:disable-next-line:prefer-template
const DESCRIPTION = 'File size limit: 3 MB.\n' +
  'The following formats are supported: jpg, png Drag and drop or Browse from device';
const ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg'];
const PREVIEW_IMAGE_ERROR_MESSAGE = 'Press crop button to set preview image';
const MINLENGTH_TITLE_ERROR_MESSAGE = 'Invalid title length, min size - 3';

@Component({
  selector: 'andteam-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEventComponent implements OnInit, OnDestroy {
  public colors = Colors;
  public fileImage: string | ArrayBuffer;
  public fileImageCropped: Blob;
  public fileImageToCrop: File;
  public isCropperActive = false;
  public isCropperImageLoaded = false;
  public isHoverEvent = true;
  public creationEventForm: FormGroup;
  public destroy$ = new Subject();
  public isSubmitted = false;
  public eventId: string;
  public eventName: string;
  public topic: ICommonOption;
  public topics: ICommonOption[] = [];
  public office: ICommonOption;
  public offices: ICommonOption[] = [];
  public topPosition = TOP_POSITION;
  public description = DESCRIPTION;
  public disabled = false;

  public get showTitleBox(): boolean {
    return !this.fileImage || (this.fileImage && this.isHoverEvent);
  }

  public get officeError(): boolean {
    const { offices } = this.creationEventForm.controls;

    return this.isSubmitted && offices.invalid;
  }

  public get topicError(): boolean {
    const { topic } = this.creationEventForm.controls;

    return this.isSubmitted && topic.invalid;
  }

  public get titleError(): string {
    const { title } = this.creationEventForm.controls;
    const isValidationFailed = this.isSubmitted && title.invalid;

    if (isValidationFailed) {
      const { errors } = title;

      switch (true) {
        case !!errors.required:
          return;
        case !!errors.minlength:
          return MINLENGTH_TITLE_ERROR_MESSAGE;
      }
    }
  }

  public get hasTitleError(): boolean {
    return this.creationEventForm.get('title').errors && this.isSubmitted;
  }

  public get dateError(): boolean {
    const { date } = this.creationEventForm.controls;

    return this.isSubmitted && date.invalid;
  }

  public get hoursError(): boolean {
    const { hour } = this.creationEventForm.controls;

    return this.isSubmitted && hour.invalid;
  }

  public get minutesError(): boolean {
    const { minute } = this.creationEventForm.controls;

    return this.isSubmitted && minute.invalid;
  }

  public get imageError(): string {
    const { posterImageFile } = this.creationEventForm.controls;
    const isValidationFailed = this.isSubmitted && posterImageFile.invalid;

    if (isValidationFailed) {
      const { errors } = posterImageFile;

      switch (true) {
        case !!errors.required:
          return;
        case !!errors.extensionError:
          return EXTENSION_ERROR_MESSAGE;
        case !!errors.sizeError:
          return SIZE_ERROR_MESSAGE;
      }
    }
  }

  public get previewImageError(): string {
    const { posterPreviewImageFile } = this.creationEventForm.controls;
    const posterImage = this.creationEventForm.get('posterImageFile').value;
    const isValidationFailed = this.isSubmitted && posterImage && posterPreviewImageFile.invalid;

    if (isValidationFailed) {
      const { errors } = posterPreviewImageFile;

      switch (true) {
        case !!errors.required:
          return PREVIEW_IMAGE_ERROR_MESSAGE;
      }
    }
  }

  public get hasImageErrors(): boolean {
    return this.creationEventForm.get('posterImageFile').errors && this.isSubmitted;
  }

  public get textError(): string {
    const { text } = this.creationEventForm.controls;
    const isValidationFailed = this.isSubmitted && text.invalid;

    if (isValidationFailed) {
      const { errors } = text;

      switch (true) {
        case !!errors.required:
          this.topPosition = TOP_POSITION;

          return;
        case !!errors.maxlength:
          this.topPosition = document.body.scrollHeight;

          return MAXLENGTH_TEXT_ERROR_MESSAGE;
      }
    } else {
      this.topPosition = TOP_POSITION;
    }
  }

  public get hasTextError(): boolean {
    return this.creationEventForm.get('text').errors && this.isSubmitted;
  }

  constructor(
    private imageLoadService: ImageLoadService,
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private location: Location,
    private topicsService: TopicsService,
    private officeService: OfficeService,
    private route: ActivatedRoute,
    private timeService: TimeService,
    private eventService: EventService,
    private router: Router,
    private modalWindow: MatDialog,
    private imagesService: ImagesService,
    private browserService: BrowserService
  ) { }

  public ngOnInit(): void {
    this.eventName = this.route.snapshot.paramMap.get('id');

    this.initForm();
    this.setupFormValues();

    forkJoin([
      this.topicsService.get<ITechnologyStackTags[]>('event'),
      this.officeService.getAll<IOffice[]>()
    ]
    )
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        ([allTopics, allOffices]) => {
          this.topics = allTopics;
          this.offices = this.getMappedOffices(allOffices);

          this.changeDetectorRef.markForCheck();
        }
      );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public handleFiles([firstFile]: File[]): void {
    if (this.isExtensionAllowed(firstFile) && this.isSizeAllowed(firstFile)) {
      this.fileImageToCrop = firstFile;
      this.isCropperActive = true;
      this.imageLoadService.readFile(firstFile)
        .subscribe(
          (image) => {
            this.fileImage = image;
            this.changeDetectorRef.markForCheck();
          }
        );
    }
  }

  public onChangeData(data: string): void {
    this.creationEventForm.get('text').setValue(data);
  }

  public onSaveData(): void {
    this.isSubmitted = true;

    if (this.creationEventForm.invalid) {
      window.scrollTo({ top: this.topPosition, behavior: 'smooth' });

      return;
    }

    const confirmDialog = this.modalWindow.open(ConfirmModalComponent, {
      width: CONFIRM_MODAL_WIDTH,
      data: CONFIRM_MODAL_DATA
    });

    confirmDialog.componentInstance.confirmEvent
      .pipe(
        tap(() => {
          confirmDialog.close();
          this.disabled = true;
        }),
        switchMap(() => {
          const data = this.getFormData();

          return this.eventId
            ? this.eventService.put<ICreationEventResponse>(this.eventId, data)
            : this.eventService.post<ICreationEventResponse>(data);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.isSubmitted = false;
        this.router.navigate(['/event', data]);
        this.eventService.isEventPublished$.next(true);
      });

    confirmDialog.componentInstance.cancelEvent
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        confirmDialog.close();
      });
  }

  public onCancelCreation(): void {
    const confirmDialog = this.modalWindow.open(ConfirmModalComponent, {
      width: CONFIRM_MODAL_WIDTH,
      data: CANCEL_MODAL_DATA
    });

    confirmDialog.componentInstance.confirmEvent
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        confirmDialog.close();
        this.location.back();
      });

    confirmDialog.componentInstance.cancelEvent
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        confirmDialog.close();
      });
  }

  public onSelectOptions(options: ICommonOption[]): void {
    this.offices = this.getCheckedOffices(options);
    this.creationEventForm.get('offices').setValue(this.getServerData());
  }

  public onSelectOption(option: ICommonOption): void {
    const { id } = option;

    this.creationEventForm.get('topic').setValue(id);
  }

  public onImageLoaded(): void {
    this.isCropperImageLoaded = true;
  }

  async onImageCropped(event: ImageCroppedEvent): Promise<any> {
    const encoded = await fetch(event.base64);
    this.fileImageCropped = await encoded.blob();
  }

  public cropImage(): void {
    const browser = this.browserService.getBrowser();
    let file;
    if (browser === BROWSERS.EDGE) {
      file = this.fileImageCropped as any;
      file.lastModifiedDate = new Date();
      file.name = this.fileImageToCrop.name;
    } else {
      file = new File([this.fileImageCropped], this.fileImageToCrop.name);
    }
    this.creationEventForm.get('posterPreviewImageFile').setValue(file);
    this.creationEventForm.get('posterImageFile').setValue(file);
    this.creationEventForm.get('posterPreviewLoadedFileName').setValue('');
    this.creationEventForm.get('posterLoadedFileName').setValue('');
    this.isCropperImageLoaded = false;
    this.isCropperActive = false;
    this.fileImageToCrop = null;
  }

  private isExtensionAllowed({ type }: File): boolean {
    const fileExtension = type.split('/')[1];

    return ALLOWED_EXTENSIONS.some(extension => extension === fileExtension);
  }

  private isSizeAllowed({ size }: File): boolean {
    return size <= IMAGE_SIZE;
  }

  private getCheckedOffices(options: ICommonOption[]): ICommonOption[] {
    return this.offices.map((item) => {

      return { ...item, checked: options.some(({ id }) => id === item.id) };
    });
  }

  private getServerData(): string[] {
    return this.offices
      .filter(office => office.checked)
      .map(office => office.id);
  }

  private getFormData(): FormData {
    const formData = new FormData();
    const { hour, minute, date, signupUrl, ...values } = this.creationEventForm.value;
    const newDate = this.timeService.getDateWithNewTime(hour, minute, date);

    formData.append('date', newDate);
    formData.append('signupUrl', signupUrl.trim());

    Object.keys(values).forEach((value) => {
      formData.append(value, values[value]);
    });

    return formData;
  }

  private initForm(): void {
    this.creationEventForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      text: ['', [Validators.required, Validators.maxLength(MAX_LENGTH_TEXT)]],
      topic: ['', [Validators.required]],
      posterImageFile: [''],
      posterPreviewImageFile: [''],
      posterLoadedFileName: [''],
      posterPreviewLoadedFileName: [''],
      place: [''],
      date: ['', [Validators.required]],
      hour: [null, [Validators.required]],
      minute: [null, [Validators.required]],
      signupUrl: [''],
      urlName: [''],
      offices: ['', [Validators.required]],
    });

    if (!this.eventName) {
      this.creationEventForm.get('posterImageFile').setValidators([
        Validators.required,
        this.extensionValidator(/(\.jpg|\.jpeg|\.png)$/i),
        this.sizeValidator(),
      ]);
      this.creationEventForm.get('posterImageFile').updateValueAndValidity();
    }
  }

  private extensionValidator(regExp: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const { name } = control.value;
      const isPermittedExtension = regExp.test(name);

      return isPermittedExtension ? null : { extensionError: name };
    };
  }

  private sizeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const { size } = control.value;

      return size > IMAGE_SIZE ? { sizeError: size } : null;
    };
  }

  private setupFormValues(): void {
    if (this.eventName) {
      const { id, title, text, topic, poster, posterPreview, place, date, signupUrl, offices, urlName } = this.route.snapshot.data.events;

      this.creationEventForm.patchValue({
        title,
        text,
        urlName,
        place: place || '',
        signupUrl: signupUrl || '',
        posterLoadedFileName: poster,
        posterPreviewLoadedFileName: posterPreview,
        topic: topic.id,
        offices: offices.map(tag => tag.id),
      });

      this.eventId = id;
      this.topic = topic;
      this.office = offices.length === 1
        ? offices[0]
        : {
          id: '',
          name: ALL_OFFICES
        };

      this.imagesService.getImage(poster)
        .pipe(
          switchMap((file: Blob) => this.imageLoadService.readFile(file)),
          takeUntil(this.destroy$)
        )
        .subscribe((image: string | ArrayBuffer) => {
          const dateWithOfficeTimezone = this.timeService.getTimezoneDate(date);
          const time: string = dateWithOfficeTimezone.format(FORMATS.HOURS_MINUTES);
          const [hour, minute] = time.split(':');

          this.fileImage = image;
          this.creationEventForm.patchValue({
            hour,
            minute,
            date: dateWithOfficeTimezone
          });

          this.changeDetectorRef.markForCheck();
        }
        );
    }
  }

  private getMappedOffices(allOffices: IOffice[]): ICommonOption[] {
    const events = this.route.snapshot.data.events;
    const offices = events && events.offices || [];

    return allOffices.map((office) => {
      return {
        id: office.id,
        name: office.name,
        checked: offices.some(item => item.id === office.id),
        place: office.address,
      };
    });
  }
}
