import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[andteamDragScroll]'
})
export class DragScrollDirective {
  @Input() addClass: string;

  private isMouseDown: boolean;
  private startX: number;
  private scrollLeft: number;

  constructor(private el: ElementRef) {}

  private get isScroll(): boolean {
    return this.el.nativeElement.scrollWidth > this.el.nativeElement.clientWidth;
  }

  @HostListener('mousedown', ['$event'])
  private onMouseDown(event: MouseEvent): void {
    if (!this.isScroll) return;

    this.isMouseDown = true;
    this.startX = event.pageX - this.el.nativeElement.offsetLeft;
    this.scrollLeft = this.el.nativeElement.scrollLeft;
  }

  @HostListener('mouseleave')
  @HostListener('mouseup')
  private onMouseLeave(): void {
    this.isMouseDown = false;
  }

  @HostListener('mousemove', ['$event'])
  private onMouseMove(event: MouseEvent): void {
    this.setClass();

    if (this.isScroll && this.isMouseDown) {
      const step = event.pageX - this.el.nativeElement.offsetLeft - this.startX;

      this.el.nativeElement.scrollLeft = this.scrollLeft - step;
    }
  }

  private setClass(): void {
    this.isScroll && this.addClass
      ? this.el.nativeElement.classList.add(this.addClass)
      : this.el.nativeElement.classList.remove(this.addClass);
  }
}
