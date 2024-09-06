import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IEvent } from '@interfaces/event';
import { ImagesService } from '@services/images.service';
import { ImageLoadService } from '@services/imageLoad.service';

import locationSvg from '!!raw-loader!./icons/location.svg';
import calendarSvg from '!!raw-loader!./icons/calendar.svg';
import dotSvg from '!!raw-loader!./icons/dot.svg';

const posterPlaceholder = '/assets/images/EventPlaceholder.png';

@Component({
  selector: 'andteam-more-event-card',
  templateUrl: './more-event-card.component.html',
  styleUrls: ['./more-event-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoreEventCardComponent implements OnInit {
  @Input() public event: IEvent;
  @Input() public isFirstImage: boolean;

  public topicIcon$: Observable<SafeResourceUrl>;
  public posterImage$: Observable<string | ArrayBuffer>;
  public readonly locationIcon: string = locationSvg;
  public readonly calendarIcon: string = calendarSvg;
  public readonly dotIcon: string = dotSvg;


  constructor(
    private imagesService: ImagesService,
    private imageLoadService: ImageLoadService,
    private sanitizer: DomSanitizer
  ) {}

  public ngOnInit(): void {
    const posterPreview = this.isFirstImage ? this.event.poster : this.event.posterPreview;

    this.topicIcon$ = this.imagesService.getIcon(this.event.topic.icon)
      .pipe(
        switchMap(file => this.imageLoadService.readFile(file)),
        map(icon => this.sanitizer.bypassSecurityTrustResourceUrl(`${icon}`)),
      );

    if (posterPreview) {
      this.posterImage$ = this.imagesService.getImage(posterPreview)
      .pipe(
        switchMap(file => this.imageLoadService.readFile(file))
      );
    } else {
      this.posterImage$ = of(posterPlaceholder);
    }
  }
}
