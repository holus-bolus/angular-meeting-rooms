import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Renderer2,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'andteam-assessment-tooltip',
  templateUrl: './assessment-tooltip.component.html',
  styleUrls: ['./assessment-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssessmentTooltipComponent {
  @Input() public alignTooltip: 'left' | 'center' | 'right' = 'left';
  @Input() public side: 'top' | 'bottom' | 'right' | 'left' = 'bottom';
  @Input() public panelClass: string;
  @Input() public isArrow: boolean;
  @Input() public container: HTMLElement;

  @ViewChild('tooltip') tooltip: ElementRef;
  @ViewChild('icon') icon: ElementRef;

  window: Window;
  document: Document;

  constructor(
    public renderer: Renderer2,
  ) {
    this.document = document;
    this.window = this.document.defaultView;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (this.tooltip) {
      this.renderer.removeChild(document.body, this.tooltip.nativeElement);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.calcPosition();
  }

  public onMouseEnter(): void {
    if (this.tooltip?.nativeElement) {
      this.renderer.appendChild(document.body, this.tooltip?.nativeElement);
      this.renderer.setStyle(this.tooltip.nativeElement, 'display', 'block');
      this.calcPosition();
    }
  }

  public onMouseLeft(): void {
    this.renderer.removeChild(document.body, this.tooltip.nativeElement);
  }

  private calcPosition(): void {
    let translateX = '';
    let translateY = '';
    const innerWidth = this.window.innerWidth;
    const tooltipSpan = (this.tooltip.nativeElement as HTMLElement).querySelector('span');
    const arrow = (this.tooltip.nativeElement as HTMLElement).querySelector('.arrow') as HTMLElement;
    const iconCoordinates = this.icon.nativeElement.getBoundingClientRect();

    switch (this.side) {
      case 'top':
        translateY = 'translateY(-100%)';
        break;
      case 'bottom':
        translateY = 'translateY(25px)';
        break;
      default:
        break;
    }

    switch (this.alignTooltip) {
      case 'center':
        translateX = 'translateX(calc(-50% + 8px))';
        break;
      default:
        break;
    }

    this.renderer.setStyle(tooltipSpan, 'top', `${iconCoordinates.top - 10}px`);
    this.renderer.setStyle(arrow, 'top', `${iconCoordinates.top - 17}px`);
    this.renderer.setStyle(arrow, 'left', `${iconCoordinates.left + 1}px`);

    if ((tooltipSpan.offsetWidth / 2) + iconCoordinates.right + 10 > innerWidth) {
      this.renderer.setStyle(tooltipSpan, 'transform', `${translateY}`);
      this.renderer.setStyle(tooltipSpan, 'left', `unset`);
      this.renderer.setStyle(tooltipSpan, 'right', `10px`);
    } else if (iconCoordinates.left - (tooltipSpan.offsetWidth / 2) - 10 < 0) {
      this.renderer.setStyle(tooltipSpan, 'transform', `${translateY}`);
      this.renderer.setStyle(tooltipSpan, 'left', `10px`);
      this.renderer.setStyle(tooltipSpan, 'right', `unset`);
    } else {
      this.renderer.setStyle(tooltipSpan, 'transform', `${translateX} ${translateY}`);
      this.renderer.setStyle(tooltipSpan, 'left', `${iconCoordinates.left}px`);
    }
  }
}
