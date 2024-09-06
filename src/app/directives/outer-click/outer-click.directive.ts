import { Directive, HostListener, Output, EventEmitter, ElementRef } from '@angular/core';

const MATERIAL_SELECTORS_LIST = ['.cdk-overlay-container'];

@Directive({
  selector: '[andteamOuterClick]'
})
export class OuterClickDirective {
  @Output() outerClick = new EventEmitter<boolean>();
  private selectionDelay = null;
  private selection = '';

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:mousedown', ['$event'])
  public onClick(event: MouseEvent): void {
    const isContains: boolean = !!(this.elementRef.nativeElement.contains(event.target)
      || this.isMaterialElement(<HTMLElement>event.target, MATERIAL_SELECTORS_LIST)
      || this.selection);

    this.outerClick.emit(isContains);
  }

  @HostListener('document:selectionchange', ['$event'])
  public onSelection(): void {
    const currentSelection = document.getSelection().toString();

    if (currentSelection !== this.selection) {
      this.selection = currentSelection;

      if (this.selectionDelay) {
        clearTimeout(this.selectionDelay);
      }

      this.selectionDelay = setTimeout(() => {
        this.selection = '';
        this.selectionDelay = null;
      }, 500);
    }
  }

  public isMaterialElement(el: HTMLElement, materialSelectorsList: string[]): boolean {
    const selector = materialSelectorsList.join(',');
    const isMaterialClass = el.closest(selector);

    return !!isMaterialClass;
  }
}
