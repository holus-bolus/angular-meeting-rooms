import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { INewsResponse, INewsRow, INewsTag } from '@interfaces/news';
import { NewsService } from '@services/portal/news.service';
import { HeaderService } from '@services/header.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { catchError, map, switchMap, take, takeUntil, tap, throttleTime } from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';
import { IRequestEmployeeParams, ITechnologyStackTags } from '@interfaces/employee';
import { TagsService } from '@services/tags.service';
import { truncate } from '@pipes/truncate/truncate';
import { PORTAL_CONFIRMATION } from '@constants/modals/confirmation';

import vectorYellowSvg from '!!raw-loader!@assets/images/vector-yellow.svg';

const INIT_COUNT_NEWS = 4;
const STEP_COUNT_NEWS = 6;
const ANCHOR_NEWS = 'hot-news';

@Component({
  selector: 'andteam-main-news',
  templateUrl: './main-news.component.html',
  styleUrls: ['./main-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainNewsComponent implements OnInit, OnDestroy {
  public vectorIcon = vectorYellowSvg;
  public isOpenConfirmationModal = false;
  public confirmationNews: INewsRow;
  public mainPage = true;
  public search: FormControl;
  public tag: FormControl;
  public allTags: INewsTag[];
  public titleTags: INewsTag[];
  public allNews: INewsRow[];
  public countNews = INIT_COUNT_NEWS;
  public sizeNews = 0;
  public totalItemCount = 0;
  public truncate = truncate;
  public title = PORTAL_CONFIRMATION.TITLE;
  public subTitle = PORTAL_CONFIRMATION.SUB_TITLE;
  public tagTitleList: INewsTag[];

  private initCountNews = INIT_COUNT_NEWS;
  private stepCountNews = STEP_COUNT_NEWS;
  private anchorNews = ANCHOR_NEWS;
  private destroy$ = new Subject<void>();
  private params = {
    search: '',
    tags: ''
  };

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private newsService: NewsService,
    private tagService: TagsService,
    private router: Router,
    private headerService: HeaderService
  ) { }

  public ngOnInit(): void {
    this.search = new FormControl('');
    this.tag = new FormControl('');

    this.tagService.getAll()
      .pipe(
        map((tag: ITechnologyStackTags[]) => {
          return tag.map((value: ITechnologyStackTags) => ({ ...value, checked: false }));
        }),
        take(1)
      )
      .subscribe((tags: INewsTag[]) => this.tagService.allTagsList = tags);

    this.setupNews();
    this.setupTags();
    this.subscribeToSearch();
    this.subscribeToTagSearch();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onOpenConfirmationModal(news: INewsRow): void {
    this.confirmationNews = news;
    this.isOpenConfirmationModal = !this.isOpenConfirmationModal;
  }

  public onCloseConfirmationModal(): void {
    this.isOpenConfirmationModal = false;
  }

  public onDelete(pieceNewsId: string): void {
    this.newsService.delete<void>(pieceNewsId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.isOpenConfirmationModal = false;
          this.setupNews();
        }
      );
  }

  public moreNews(): void {
    this.countNews += this.stepCountNews;
    this.setupNews();
  }

  public lessNews(): void {
    this.countNews = this.initCountNews;
    this.router.navigate([''], { fragment: this.anchorNews });
    this.headerService.addFragment(this.anchorNews);
    this.setupNews();
  }

  private setupNews(): void {
    this.newsService.getAll<INewsResponse>(this.getRequestParams())
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        ({ data, pageInfo: { totalItemCount } }) => {
          this.setupData(data, totalItemCount);
          this.changeDetectorRef.markForCheck();
        }
      );
  }

  private setupTags(): void {
    const { value: queryTags } = this.tag;

    this.tagService.get<ITechnologyStackTags[]>([queryTags])
      .pipe(takeUntil(this.destroy$))
      .subscribe((tags: ITechnologyStackTags[]) => {
        const newsTags = tags.map(tag => ({ ...tag, checked: queryTags.includes(tag.name) }));

        this.setTags(newsTags);
      });
  }

  private getRequestParams(): IRequestEmployeeParams {
    return {
      page: String(1),
      pageSize: String(this.countNews),
      ...this.params,
    };
  }

  private setupData(news: INewsRow[] = [], totalItemCount: number = 0): void {
    this.allNews = news.map((pieceNews: INewsRow) => {
      const { previewText, text } = pieceNews;

      return { ...pieceNews, previewText: this.truncate(previewText || text, 131) };
    });
    this.sizeNews = this.allNews.length;
    this.totalItemCount = totalItemCount;
  }

  private setTags(tags: INewsTag[]): void {
    const isSelected = this.tagService.allTagsList.some((tag: INewsTag) => tag.checked);

    if (isSelected) {
      this.titleTags = this.tagService.allTagsList.filter(tag => tag.checked);
    } else {
      this.titleTags = tags.slice(0, 4);
    }

    this.allTags = tags;
  }

  private subscribeToSearch(): void {
    this.search.valueChanges
      .pipe(
        tap((value: string) => this.params.search = value),
        throttleTime(200),
        switchMap(() => this.newsService.getAll<INewsResponse>(this.getRequestParams())),
        takeUntil(this.destroy$),
      )
      .subscribe(
        ({ data, pageInfo: { totalItemCount } }) => {

          this.setupData(data, totalItemCount);
          this.changeDetectorRef.markForCheck();
        }
      );
  }

  private setupSearchData([{ data, pageInfo: { totalItemCount } }, tags]: any[]): void {
    this.setupData(data, totalItemCount);
    this.setTags(tags);
    this.changeDetectorRef.markForCheck();
  }

  private subscribeToTagSearch(): void {
    this.tag.valueChanges
      .pipe(
        tap((tagString) => {
          const selectedTags = this.allTags
            .filter(tag => tagString.includes(tag.name))
            .map(tag => ({ ...tag, checked: true }));

          this.params.tags = tagString;
          this.titleTags = selectedTags;
          this.allTags = selectedTags;
        }),
        switchMap(tag =>
          forkJoin([
            this.newsService.getAll<INewsResponse>(this.getRequestParams()),
            this.tagService.get<ITechnologyStackTags[]>([tag])
          ])
        ),
        catchError((err, caught) => {
          this.setupSearchData([{
            data: [],
            pageInfo: { totalItemCount: 0 }
          }, this.allTags]);

          return caught;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(
        ([{ data, pageInfo: { totalItemCount } }, tags]): void => {
          const { value: tagsString } = this.tag;
          const newsTags = tags.map(tag => ({ ...tag, checked: tagsString.includes(tag.name) }));

          this.setupData(data, totalItemCount);
          this.setTags(newsTags);
          this.changeDetectorRef.markForCheck();
        }
      );
  }
}
