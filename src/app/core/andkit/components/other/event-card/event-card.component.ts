import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { IEvent } from '@interfaces/event';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ImagesService } from '@services/images.service';
import { ImageLoadService } from '@services/imageLoad.service';
import { Subject } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const posterPlaceholder = '/assets/images/EventPlaceholder.png';

@Component({
  selector: 'andteam-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCardComponent implements OnInit, OnDestroy {
  @Input() public event: IEvent;
  @Input() public isFirstImage: boolean;

  public topicIcon: SafeResourceUrl;
  public posterImage: string | ArrayBuffer;
  public destroy$ = new Subject();

  constructor(
    private imagesService: ImagesService,
    private changeDetectorRef: ChangeDetectorRef,
    private imageLoadService: ImageLoadService,
    private sanitizer: DomSanitizer
  ) {}

  public ngOnInit(): void {
    const iconName = this.event.topic.icon;
    const posterPreview = this.isFirstImage ? this.event.poster : this.event.posterPreview;


    this.imagesService.getIcon(iconName).pipe(
      switchMap(file => this.imageLoadService.readFile(file)),
      takeUntil(this.destroy$)
    )
    .subscribe(
      (icon) => {
        this.topicIcon = this.sanitizer.bypassSecurityTrustResourceUrl(`${icon}`);
        this.changeDetectorRef.markForCheck();
      }
    );

    if (posterPreview) {
      this.imagesService.getImage(posterPreview).pipe(
        switchMap(file => this.imageLoadService.readFile(file)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (posterImage: string | ArrayBuffer) => {
          this.posterImage = posterImage;
          this.changeDetectorRef.markForCheck();
        }
      );
    } else {
      this.posterImage = posterPlaceholder;
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
