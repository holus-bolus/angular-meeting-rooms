import { AfterContentInit, Directive, ElementRef, Inject, Input, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[andteamAutofocus]'
})
export class AutofocusDirective implements AfterContentInit {

  @Input() public andteamAutofocus: boolean;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platform: any
  ) {}

  public ngAfterContentInit(): void {
    if (isPlatformBrowser(this.platform) && this.andteamAutofocus !== false) {
      this.el.nativeElement.focus();
    }
  }
}
