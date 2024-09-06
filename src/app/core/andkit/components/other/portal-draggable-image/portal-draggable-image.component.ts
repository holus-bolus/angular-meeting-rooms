import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { IColorConfiguration } from '@interfaces/event';

@Component({
  selector: 'andteam-portal-draggable-image',
  templateUrl: './portal-draggable-image.component.html',
  styleUrls: ['./portal-draggable-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortalDraggableImageComponent {
  @Input() isShowImage: boolean;
  @Input() fileImage: File;
  @Input() colors: IColorConfiguration;
  @Input() hasImageErrors: boolean;
  @Input() showTitleBox: boolean;
  @Input() description: string;

  @Output() files = new EventEmitter<File[]>();
  @Output() hover = new EventEmitter<boolean>();

  public handleFiles(files: File[]): void {
    this.files.emit(files);
  }

  public handleHover(isHoverEvent: boolean): void {
    this.hover.emit(isHoverEvent);
  }
}
