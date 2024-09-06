import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { TRUNCATE_TITLE } from './const';

interface ITruncateContext {
  title: string;
}

@Directive({
  selector: '[andteamTruncateTitle]'
})
export class TruncateTitleDirective {
  @Input() set andteamTruncateTitle(data: { title, longBlock, blockWidth }) {
    this.truncateString(data.title, data.longBlock, data.blockWidth);
  }

  private context: ITruncateContext;
  private previousScreenWidth: number;

  constructor(
    private templateRef: TemplateRef<ITruncateContext>,
    private viewContainerRef: ViewContainerRef
  ) {}

  public truncateString(title: string, longBlock: boolean, blockWidth: number, ellipsis: string = '...'): void {
    if (longBlock && this.previousScreenWidth !== blockWidth) {
      const length = blockWidth > TRUNCATE_TITLE.MIN_WIDTH ?
        blockWidth * TRUNCATE_TITLE.BLOCK_COEFFICIENT - TRUNCATE_TITLE.MIN_MARGIN :
        blockWidth * TRUNCATE_TITLE.BLOCK_COEFFICIENT - TRUNCATE_TITLE.MAX_MARGIN;
      // tslint:disable-next-line:no-parameter-reassignment
      title = title.length > length ?
        `${title.substr(0, TRUNCATE_TITLE.REQUIRED_MIN_TITLE_LENGTH) +
           title.substr(TRUNCATE_TITLE.REQUIRED_MIN_TITLE_LENGTH, length)}${ellipsis}`
        : title;
      this.previousScreenWidth = blockWidth;
    } else {
      // tslint:disable-next-line:no-parameter-reassignment
      title = title.length > TRUNCATE_TITLE.REQUIRED_TITLE_LENGTH ?
        `${title.substr(0, TRUNCATE_TITLE.REQUIRED_TITLE_LENGTH)}${ellipsis}`
        : title;
    }
    this.context = { title };
    this.viewContainerRef.clear();
    this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
  }

}
