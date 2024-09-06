import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
  OnInit
} from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RolesService } from '@services/roles.service';
import { INewsRow } from '@interfaces/news';
import { ImagesService } from '@services/images.service';
import { ImageLoadService } from '@services/imageLoad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'andteam-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsCardComponent implements OnInit {
  @Input() pieceNews: INewsRow;
  @Input() isFirst: boolean;
  @Input() mainPage: boolean;

  @Output() delete = new EventEmitter<INewsRow>();

  topicIcon$: Observable<string>;
  isShowEditMenu$: Observable<boolean>;

  constructor(
    private imagesService: ImagesService,
    private rolesService: RolesService,
    private imageLoadService: ImageLoadService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.initOfDataRelatedToRouter();
  }

  public onOpenConfirmationModal(): void {
    this.delete.emit(this.pieceNews);
  }

  public onClick({ urlName }: INewsRow): void {
    const isSelection: boolean = !document.getSelection().toString();

    if (isSelection) {
      this.router.navigate(['/hot-news', urlName]);
    }
  }

  private initOfDataRelatedToRouter(): void {
    this.topicIcon$ = this.imagesService.getIcon(this.pieceNews.topic.icon)
      .pipe(
        switchMap(file => this.imageLoadService.readFileAsText(file)),
        map(image => `${image}`)
      );
    this.isShowEditMenu$ = this.rolesService.isAdminContentManager$();
  }
}
