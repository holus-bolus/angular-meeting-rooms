import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[andteamSlideItem]'
})
export class SlideItemDirective {

  constructor(public template: TemplateRef<any>) { }

}
