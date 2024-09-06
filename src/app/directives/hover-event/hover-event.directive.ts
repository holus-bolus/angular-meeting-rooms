import { Directive, Output, HostListener, EventEmitter } from '@angular/core';

@Directive({
  selector: '[andteamHoverEvent]'
})
export class HoverEventDirective {
  @Output() public handleHover = new EventEmitter<boolean>();

  @HostListener('mouseenter')
  public onMouseOver(): void {
    this.handleHover.emit(true);
  }

  @HostListener('mouseleave')
  public onMouseOut(): void {
    this.handleHover.emit(false);
  }
}
