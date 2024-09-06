import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnInit,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';
import { COMPONENT_TYPES } from '@constants/types/componentTypes.constants';

import fileActiveSvg from '!!raw-loader!./icons/file-active.svg';
import fileInactiveSvg from '!!raw-loader!./icons/file-inactive.svg';
import closeSvg from '!!raw-loader!./icons/close.svg';

@Component({
  selector: 'andteam-portal-input-file',
  templateUrl: './portal-input-file.component.html',
  styleUrls: ['./portal-input-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalInputFileComponent implements OnInit {
  @Input() public componentType = COMPONENT_TYPES.PORTAL;
  @Input() public placeholder = '';
  @Input() public initialFileName: string;
  @Input() public error: boolean;
  @Input() public errorMessage: string;
  @Input() public isSelectorDisabled = false;

  @Output() public handleFiles = new EventEmitter<File[]>();

  public uniqueId: string;
  public overtimeType = COMPONENT_TYPES.OVERTIME;
  public portalType = COMPONENT_TYPES.PORTAL;

  readonly fileActiveIcon = fileActiveSvg;
  readonly fileInactiveIcon = fileInactiveSvg;
  readonly closeIcon = closeSvg;

  @ViewChild('triggerButton', { static: false }) triggerButton: ElementRef;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.uniqueId = this.getUniqueInputId();
  }

  public triggerImageSelect (): void {
    this.triggerButton.nativeElement.click();
  }

  public handleFileInput(event: Event): void {
    const filesList = (event.target as HTMLInputElement).files;
    const files = Array.from(filesList);

    this.handleFiles.emit(files);

    (event.target as HTMLInputElement).value = '';
    this.changeDetectorRef.markForCheck();
  }

  private getUniqueInputId(): string {
    return `file${Math.random()}`;
  }
}
