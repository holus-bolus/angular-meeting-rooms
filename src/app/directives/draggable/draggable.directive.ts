import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { IColorConfiguration } from '@interfaces/event';

export interface IDragEvent {
  dataTransfer: {
    files: File[]
  };
  preventDefault(): void;
  stopPropagation(): void;
}

@Directive({
  selector: '[andteamDraggable]'
})
export class DraggableDirective {
  @Input() colors: IColorConfiguration;

  @Output() handleFiles = new EventEmitter<File[]>();

  constructor(private el: ElementRef) { }

  @HostListener('dragenter', ['$event'])
  @HostListener('dragover', ['$event'])
  public onDragEnter(event: IDragEvent): void {
    this.preventEvent(event);
    this.setColor(this.colors.Element);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: IDragEvent): void {
    this.preventEvent(event);
    this.setColor(this.colors.Element);
  }

  @HostListener('drop', ['$event'])
  public onDrag(event: IDragEvent): void {
    const filesList =  event.dataTransfer.files;
    const files = Array.from(filesList);

    this.preventEvent(event);
    this.setColor(this.colors.Element);
    this.handleFiles.emit(files);
  }

  private preventEvent(event: IDragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  private setColor(color: string): void {
    this.el.nativeElement.style.borderColor = color;
  }
}


