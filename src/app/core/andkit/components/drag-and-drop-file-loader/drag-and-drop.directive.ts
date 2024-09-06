import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[andteamDragAndDrop]'
})
export class DragAndDropDirective {
  @Output() fileDropped = new EventEmitter();

  @HostListener('dragOver', ['$event']) public onDragOver(evt): void {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('dragLeave', ['$event']) public onDragLeave(evt): void {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('drop', ['$event']) public onDrop(evt): void {
    evt.preventDefault();
    evt.stopPropagation();

    const files = evt.dataTransfer.files;

    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
