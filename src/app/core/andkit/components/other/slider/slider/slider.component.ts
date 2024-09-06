import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ContentChildren, ElementRef,
  Input, OnChanges, OnDestroy,
  OnInit, QueryList,
  SimpleChanges, ViewChild
} from '@angular/core';
import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SlideItemDirective } from '@andkit/components/other/slider/slide-item.directive';

import arrowSvg from '!!raw-loader!../images/arrow.svg';

@Component({
  selector: 'andteam-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() initialSlide = 1;
  @Input() itemsPerSlide: number;
  @Input() amountOfItems: number;
  @Input() slideItemsGap: string;

  @ContentChildren(SlideItemDirective) slidesItems: QueryList<SlideItemDirective>;

  public arrow: string;
  public radioButtonsState: boolean[];
  public isShowControls: boolean;

  @ViewChild('carousel', { read: ElementRef }) private carousel: ElementRef;
  @ViewChild('slide', { read: ElementRef }) private slideItem: ElementRef;
  private slidesAmount: number;
  private slideNumber: number;
  private slideWidth: number;
  private player: AnimationPlayer;
  private destroy$ = new Subject();

  constructor(private animationBuilder: AnimationBuilder,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.amountOfItems) {
      this.isShowControls = this.amountOfItems > this.itemsPerSlide;
    }
  }

  public ngOnInit(): void {
    this.arrow = arrowSvg as any;
    this.slidesAmount = Math.ceil(this.amountOfItems / this.itemsPerSlide);
    // tslint:disable-next-line:prefer-array-literal
    this.radioButtonsState = new Array(this.slidesAmount).fill(false);
    this.radioButtonsState[this.initialSlide - 1] = true;
    this.slideNumber = this.radioButtonsState.findIndex(radioButton => radioButton) + 1;
  }

  public ngAfterViewInit(): void {
    const slideItemWidth = this.slideItem.nativeElement.getBoundingClientRect().width;
    const gap = parseInt(this.slideItemsGap, 10);
    this.slideWidth = slideItemWidth * this.itemsPerSlide + gap * this.itemsPerSlide;
    this.slidesItems.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.changeDetectorRef.markForCheck());
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onButtonClick(slideNumber: number): void {
    this.setRadioButtonsState(slideNumber + 1);
    this.startAnimation();
  }

  public onArrow(direction: string): void {
    switch (direction) {
      case 'next':
        this.setRadioButtonsState(this.slideNumber + 1);
        this.startAnimation();
        break;
      case 'previous':
        this.setRadioButtonsState(this.slideNumber - 1);
        this.startAnimation();
        break;
    }
  }

  private setRadioButtonsState(slideNumber: number): void {
    if (slideNumber > 0 && slideNumber <= this.slidesAmount) {
      this.slideNumber = slideNumber;
    } else if (slideNumber <= 0) {
      this.slideNumber = this.slidesAmount;
    } else if (slideNumber > this.slidesAmount) {
      this.slideNumber = 1;
    }

    this.radioButtonsState = this.radioButtonsState.map((button, i) => (i + 1) === this.slideNumber);
  }

  private startAnimation(): void {
    const offset = this.slideWidth * (this.slideNumber - 1);

    const myAnimation: AnimationFactory = this.animationBuilder.build([
      animate('500ms ease-out', style({ transform: `translateX(-${offset}px)` }))
    ]);

    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }
}
