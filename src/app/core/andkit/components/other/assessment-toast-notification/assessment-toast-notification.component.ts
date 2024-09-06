import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { toastInOutAnimation } from '@animations/toast.animation';

import checkedSvg from '!!raw-loader!./icons/checked.svg';

@Component({
  selector: 'andteam-assessment-toast-notification',
  templateUrl: './assessment-toast-notification.component.html',
  styleUrls: ['./assessment-toast-notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [toastInOutAnimation]
})
export class AssessmentToastNotificationComponent implements AfterViewInit, OnDestroy {
  @Input() public lifeSpan = 5000;

  @Output() public fadeOut = new EventEmitter<void>();

  public triggerState = 'bottom';

  readonly checkedIcon = checkedSvg as any;
  private destroy$ = new Subject();
  private animationDuration = 1000;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public ngAfterViewInit(): void {
    this.triggerState = 'page';
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onClick(event: MouseEvent): void {
    event.preventDefault();
    this.triggerState = 'right';
  }

  public onAnimationEnd(triggerState: string): void {
    const delay = this.lifeSpan - this.animationDuration;

    switch (triggerState) {
      case 'page':
        this.triggerState = 'page';
        this.startCountdown(delay);
        break;
      case 'right':
        this.fadeOut.emit();
        break;
      default:
        break;

    }
  }

  private startCountdown(delay: number): void {
    timer(delay)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.triggerState = 'right';
        this.changeDetectorRef.markForCheck();
      });
  }
}
