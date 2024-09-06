import { Directive, HostListener } from '@angular/core';
import { MatSelect } from '@angular/material/select';

@Directive({
  selector: '[andteamScroll]'
})
export class ScrollDirective {
  constructor(private dropdownElement: MatSelect) { }

  @HostListener('document:scroll', ['$event'])
  public onScroll(): void {
    this.dropdownElement.close();
  }
}
