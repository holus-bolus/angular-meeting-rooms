import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { ICommonOption } from '@interfaces/filter';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, of, Subject } from 'rxjs';
import { ITechnologyStackTags } from '@interfaces/employee';
import { debounceTime, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ICreationEventResponse } from '@interfaces/event';
import {
  CANCEL_MODAL_DATA,
  CONFIRM_MODAL_DATA,
  CONFIRM_MODAL_WIDTH,
  DUE_TIME, MAXLENGTH_MAIN_TEXT, MAXLENGTH_PREVIEW,
  MAXLENGTH_PREVIEW_ERROR_MESSAGE,
  MAXLENGTH_TEXT_ERROR_MESSAGE, MINLENGTH_PREVIEW, MINLENGTH_PREVIEW_ERROR_MESSAGE, MINLENGTH_TITLE,
  MINLENGTH_TITLE_ERROR_MESSAGE,
  TOP_POSITION
} from './piece-news-creation';
import { TagsService } from '@services/tags.service';
import { NewsService } from '@services/portal/news.service';
import { TopicsService } from '@services/portal/topics.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@andkit/components/modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'andteam-piece-news-creation',
  templateUrl: './piece-news-creation.component.html',
  styleUrls: ['./piece-news-creation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieceNewsCreationComponent implements OnInit, OnDestroy {
  topics: ICommonOption[] = [];
  tags: ICommonOption[] = [];
  selectedTags: ICommonOption[];
  topic: ICommonOption;
  creationNewsForm: FormGroup;
  isSubmitted = false;
  pieceNewsId: string;
  destroy$ = new Subject();
  placeholder = 'Enter preview text *';
  topPosition = TOP_POSITION;
  disabled = false;

  get topicError(): boolean {
    const { topic } = this.creationNewsForm.controls;

    return this.isSubmitted && topic.invalid;
  }

  get titleError(): string {
    const { title } = this.creationNewsForm.controls;
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

  get hasTitleError(): boolean {
    return this.creationNewsForm.get('title').errors && this.isSubmitted;
  }

  get textError(): string {
    const { text } = this.creationNewsForm.controls;
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

  get hasTextError(): boolean {
    return this.creationNewsForm.get('text').errors && this.isSubmitted;
  }

  get hasPreviewTextError(): boolean {
    return this.creationNewsForm.get('previewText').errors && this.isSubmitted;
  }

  get previewTextError(): string {
    const { previewText } = this.creationNewsForm.controls;
    const isValidationFailed = this.isSubmitted && previewText.invalid;

    if (isValidationFailed) {
      const { errors } = previewText;

      switch (true) {
        case !!errors.required:
          return;
        case !!errors.maxlength:
          return MAXLENGTH_PREVIEW_ERROR_MESSAGE;
        case !!errors.minlength:
          return MINLENGTH_PREVIEW_ERROR_MESSAGE;
      }
    }
  }

  constructor(private formBuilder: FormBuilder,
              private topicsService: TopicsService,
              private tagsService: TagsService,
              private changeDetectorRef: ChangeDetectorRef,
              private location: Location,
              private newsService: NewsService,
              private modalWindow: MatDialog,
              private router: Router,
              private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.initForm();
    this.setupFormValues();

    this.creationNewsForm.get('title').valueChanges
      .pipe(
        debounceTime(DUE_TIME),
        takeUntil(this.destroy$)
      );

    forkJoin([
      this.topicsService.get<ITechnologyStackTags[]>('news'),
      this.tagsService.getAll<ITechnologyStackTags[]>()
    ]
    )
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        ([allTopics, allTags]) => {
          this.topics = allTopics;
          this.tags = this.getCheckedProperties(allTags, 'tags');
          this.selectedTags = this.getSelectedTags();

          this.changeDetectorRef.markForCheck();
        }
      );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onChangeData(data: string): void {
    this.creationNewsForm.get('text').setValue(data);
  }

  public onSaveData(): void {
    this.isSubmitted = true;

    if (this.creationNewsForm.invalid) {
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
          const value = this.creationNewsForm.value;

          return this.pieceNewsId
            ? this.newsService.put<ICreationEventResponse>(this.pieceNewsId, value)
            : this.newsService.post<ICreationEventResponse>(value);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((data) => {
        this.isSubmitted = false;
        this.router.navigate(['/hot-news', data]);
        this.newsService.isNewsPublished$.next(true);
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

  public onCheckOption(option: ICommonOption, controlName: string): void {
    let values: string | string[];

    if (controlName === 'tags') {
      this.tags = this.getCheckedData(this.tags, option);
      this.selectedTags = this.tags.filter(filter => filter.checked);

      values = this.getFormData(this.tags);
    } else {
      values = option.id;
    }

    this.creationNewsForm.get(controlName).setValue(values);
  }

  public onClearAll(): void {
    this.creationNewsForm.patchValue({
      tags: [],
    });
    this.selectedTags = null;
    this.tags = this.resetCheckedProperty(this.tags);
  }

  private initForm(): void {
    this.creationNewsForm = this.formBuilder.group({
      previewText: ['', [Validators.required, Validators.minLength(MINLENGTH_PREVIEW), Validators.maxLength(MAXLENGTH_PREVIEW)]],
      title: ['', [Validators.required, Validators.minLength(MINLENGTH_TITLE)]],
      text: ['', [Validators.required, Validators.maxLength(MAXLENGTH_MAIN_TEXT)]],
      topic: ['', [Validators.required]],
      tags: [[]],
    });
  }

  private getCheckedData(items: ICommonOption[], option: ICommonOption): ICommonOption[] {
    return items.map((item) => {
      return item.id === option.id
        ? { ...item, checked: !item.checked }
        : item;
    });
  }

  private getFormData(items: ICommonOption[]): string[] {
    return items.reduce((data, item) => {
      if (item.checked) {
        data.push(item.id);
      }

      return data;
    },                  []);
  }

  private getCheckedProperties(items: ICommonOption[], paramName: string): ICommonOption[] {
    return items.map((item) => {
      return {
        ...item,
        checked: this.creationNewsForm.value[paramName].some(id => id === item.id)
      };
    });
  }

  private resetCheckedProperty(items: ICommonOption[]): ICommonOption[] {
    return items.map((item) => {
      return { ...item, checked: false };
    });
  }

  private setupFormValues(): void {
    const pieceNewsName = this.route.snapshot.paramMap.get('id');

    if (pieceNewsName) {
      const { id, title, text, tags, topic, previewText } = this.route.snapshot.data.news;

      this.pieceNewsId = id;
      this.creationNewsForm.setValue({
        title,
        text,
        previewText,
        tags: tags.map(tag => tag.id),
        topic: topic.id,
      });
      this.topic = topic;
    }
  }

  private getSelectedTags(): ICommonOption[] {
    const tags = this.tags.filter(filter => filter.checked);

    return tags.length ? tags : null;
  }
}
