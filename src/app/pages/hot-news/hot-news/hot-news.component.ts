import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { INewsParams, INewsResponse, INewsRow, INewsTag } from '@interfaces/news';
import { NewsService } from '@services/portal/news.service';
import { IPaginationConfig, IRequestEmployeeParams, ITechnologyStackTags } from '@interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { catchError, switchMap, takeUntil, tap } from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { RESULTS } from './hot-news';
import { TagsService } from '@services/tags.service';

import arrowBackSvg from '!!raw-loader!../../../core/andkit/components/buttons/portal-backward-link/icons/arrow-back.svg';

@Component({
  selector: 'andteam-hot-news',
  templateUrl: './hot-news.component.html',
  styleUrls: ['./hot-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotNewsComponent implements OnInit, OnDestroy {
  public news: INewsRow[] = [];
  public totalItems: number;
  public paginationConfig: IPaginationConfig;
  public isPortalType = true;
  public fragment: string;
  public search: FormControl;
  public tag: FormControl;
  public backIcon: SafeHtml;
  public page = 1;
  public pageSize = 5;
  public isOnePage = true;
  public params: INewsParams;
  public allTags: INewsTag[];
  public titleTags: INewsTag[];
  public destroy$ = new Subject<void>();

  public messageMapping = {
    one: RESULTS.ONE_RESULT,
    few: RESULTS.FEW_RESULT,
    many: RESULTS.MANY_RESULT,
  };
  public locale = 'ru_Ru';

  @ViewChild('hotNews') hotNews: ElementRef;

  constructor(
    private newsService: NewsService,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private tagService: TagsService
  ) {}

  public ngOnInit(): void {
    this.setupPage(this.route.snapshot.fragment);
    this.setupParams(this.route.snapshot.queryParams);
    this.setupNews();
    this.setupTags();
    this.subscribeToSearch();
    this.subscribeToTagSearch();

    this.backIcon = this.sanitizer.bypassSecurityTrustHtml(arrowBackSvg as any);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public goToPage(page: number): void {
    this.replaceUrl(page);
    this.setupNews();
    this.hotNews.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  public goToHotNews(page: number): void {
    this.params = {};
    this.replaceUrl(page);
    this.setupNews();
    this.search.setValue('');
    this.tag.setValue('');
  }

  public onDelete(id: string): void {
    this.newsService.delete<void>(id)
      .subscribe(
        () => {
          this.setupNews();
        }
      );
  }

  public searchByTag(tag: string): void {
    const { value: tagsString } = this.tag;
    this.tag.setValue(`${tagsString},${tag}`);
  }

  private setupUrl(param: string, paramName: string): void {
    this.params = param
      ? { ...this.params, [paramName]: param }
      : this.getUrlParams(paramName);
    this.replaceUrl(1);
  }

  private getUrlParams(paramName: string): INewsParams {
    return Object
      .keys(this.params)
      .reduce((result, param) => {

        if (param !== paramName) {
          // tslint:disable-next-line:no-parameter-reassignment
          result = { ...result, [param]: this.params[param] };
        }

        return result;
      },      {});
  }

  private replaceUrl(page: number): void {
    this.page = page;
    this.router.navigate(['/hot-news'], {
      queryParams: { ...this.params },
      fragment: `page${page}`,
      replaceUrl: true,
    });
  }

  private setupPage(fragment: string): void {
    if (fragment) {
      const page = fragment.split('page')[1];

      this.page = Number(page);
    }
  }

  private setupParams(params: any): void {
    const { search, tags } = params;

    this.params = params;
    this.search = new FormControl(search || '');
    this.tag = new FormControl(tags || '');
  }

  private getRequestParams(): IRequestEmployeeParams {
    return {
      page: String(this.page),
      pageSize: String(this.pageSize),
      ...this.params,
    };
  }

  private setupNews(): void {
    this.newsService.getAll<INewsResponse>(this.getRequestParams())
      .subscribe(
        ({ data, pageInfo: { pageNumber, pageSize, totalItemCount, isFirstPage, isLastPage } }) => {
          this.isOnePage = isFirstPage && isLastPage;
          this.setupData(data, pageNumber, pageSize, totalItemCount);
          this.changeDetectorRef.markForCheck();
        }
      );
  }

  private setTags(tags: INewsTag[]): void {
    this.titleTags = [];

    const { value: tagsString } = this.tag;
    const isSelected = tags.some(tag => tagsString.includes(tag.name));

    if (isSelected) {
      this.titleTags = tags.filter(tag => tagsString.includes(tag.name));
    } else {
      this.titleTags = tags.slice(0, 4);
    }
    this.allTags = tags;
  }

  private setupData(news: INewsRow[] = [], pageNumber: number = 1, pageSize: number = 0, totalItemCount: number = 0): void {
    this.news = news.map((pieceNews) => {
      const { previewText, text } = pieceNews;

      return { ...pieceNews, previewText: this.truncate(previewText || text, 131) };
    });
    this.totalItems = totalItemCount;
    this.paginationConfig = { itemsPerPage: pageSize, currentPage: pageNumber, totalItems: totalItemCount };
  }

  private truncate(value: string, limit: number, ellipsis: string = '...'): string {
    if (value && value.length <= limit) {
      return value;
    }

    return `${value.substr(0, limit)}${ellipsis}`;
  }

  private setupSearchData([{ data, pageInfo: { pageNumber, pageSize, totalItemCount, isFirstPage, isLastPage } }, tags]: any): void {
    this.isOnePage = isFirstPage && isLastPage;
    this.setupData(data, pageNumber, pageSize, totalItemCount);
    this.setTags(tags);
    this.changeDetectorRef.markForCheck();
  }

  private setupTags(): void {
    const { value: queryTags } = this.tag;

    this.tagService.get<ITechnologyStackTags[]>([queryTags])
      .subscribe(
        (tags) => {
          const newsTags = tags.map(tag => ({ ...tag, checked: queryTags.includes(tag.name) }));
          this.setTags(newsTags);
        }
      );
  }

  private subscribeToSearch(): void {
    this.search.valueChanges
      .pipe(
        tap((search) => {
          this.setupUrl(search, 'search');
        }),
        switchMap(() => this.newsService.getAll<INewsResponse>(this.getRequestParams())),
        takeUntil(this.destroy$),
      )
      .subscribe(
        ({ data, pageInfo: { pageNumber, pageSize, totalItemCount, isFirstPage, isLastPage } }) => {
          this.isOnePage = isFirstPage && isLastPage;
          this.setupData(data, pageNumber, pageSize, totalItemCount);
          this.changeDetectorRef.markForCheck();
        }
      );
  }

  private subscribeToTagSearch(): void {
    this.tag.valueChanges
      .pipe(
        tap((tagString) => {
          const selectedTags = this.allTags.filter(tag => tagString.includes(tag.name)).map(tag => ({ ...tag, checked: true }));
          this.titleTags = selectedTags;
          this.allTags = selectedTags;
          this.setupUrl(tagString, 'tags');
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
            pageInfo: { pageNumber: 1, pageSize: 0, totalItemCount: 0, isFirstPage: true, isLastPage: true }
          }, this.allTags]);

          return caught;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(
        ([{ data, pageInfo: { pageNumber, pageSize, totalItemCount, isFirstPage, isLastPage } }, tags]) => {
          this.isOnePage = isFirstPage && isLastPage;
          this.setupData(data, pageNumber, pageSize, totalItemCount);

          const { value: tagsString } = this.tag;
          const newsTags = tags.map(tag => ({ ...tag, checked: tagsString.includes(tag.name) }));
          this.setTags(newsTags);
          this.changeDetectorRef.markForCheck();
        }
      );
  }
}
