import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { INewsRow } from '@interfaces/news';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Observable, Subject } from 'rxjs';
import { map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { RolesService } from '@services/roles.service';
import { NewsService } from '@services/portal/news.service';
import { PORTAL_CONFIRMATION } from '@constants/modals/confirmation';

@Component({
  selector: 'andteam-piece-news',
  templateUrl: './piece-news.component.html',
  styleUrls: ['./piece-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeaceNewsComponent implements OnInit, OnDestroy {
  public pieceNewsId: string;
  public confirmationNews: INewsRow;
  public pieceNewsPage = true;
  public isOpenConfirmationModal = false;
  public title = PORTAL_CONFIRMATION.TITLE;
  public subTitle = PORTAL_CONFIRMATION.SUB_TITLE;

  public pieceNews$: Observable<INewsRow>;
  public relatedNews$: Observable<INewsRow[]>;
  private updatedRelatedNews$ = new Subject();
  private destroy$ = new Subject();

  constructor(
    public newsService: NewsService,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.initOfDataRelatedToRouter();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.updatedRelatedNews$.complete();
    this.newsService.isNewsPublished$.next(false);
  }

  public onDelete(id: string): void {
    this.isOpenConfirmationModal = false;
    this.newsService.delete<void>(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          if (id === this.pieceNewsId) {
            this.router.navigate(['/hot-news']);
          } else {
            this.updatedRelatedNews$.next();
          }
        }
      );
  }

  public onFadeOut(): void {
    this.newsService.isNewsPublished$.next(false);
  }

  public onOpenConfirmationModal(news: INewsRow): void {
    this.confirmationNews = news;
    this.isOpenConfirmationModal = !this.isOpenConfirmationModal;
  }

  public onCloseConfirmationModal(): void {
    this.isOpenConfirmationModal = false;
  }


  private initOfDataRelatedToRouter(): void {
    const routeData: Observable<INewsRow> = this.route.data
      .pipe(
        map(({ oneNews }: {name: string, oneNews: INewsRow}) => oneNews),
        tap(({ id }: INewsRow) => this.pieceNewsId = id),
        shareReplay(1)
      );
    const relatedNews$ = routeData.pipe(map(({ relatedNews }) => relatedNews));
    const updatedRelatedNews$ = this.updatedRelatedNews$.pipe(switchMap(() => this.getRelatedNews()));

    this.pieceNews$ = routeData;
    this.relatedNews$ = merge<INewsRow[], INewsRow[]>(updatedRelatedNews$, relatedNews$);
  }

  private getRelatedNews(): Observable<INewsRow[]> {
    return this.newsService.get<INewsRow>(this.pieceNewsId)
      .pipe(map(({ relatedNews }) => relatedNews));
  }
}
