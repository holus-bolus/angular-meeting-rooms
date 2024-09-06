import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import noDataSvg from '!!raw-loader!src/assets/images/no-data.svg';
import fileInactiveSvg from '!!raw-loader!@assets/images/file-inactive.svg';
import closeSvg from '!!raw-loader!@assets/images/close.svg';

@Component({
  selector: 'andteam-drag-and-drop-file-loader',
  templateUrl: './drag-and-drop-file-loader.component.html',
  styleUrls: ['./drag-and-drop-file-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragAndDropFileLoaderComponent implements OnInit {
  @Input() public availableFileTypes: string[];
  @Input() public maxFileSize: { name: string, value: number };
  @Input() public title: string;

  @Output() public handleFiles = new EventEmitter<File[]>();

  public noDataIcon = noDataSvg;
  public attachmentIcon = fileInactiveSvg;
  public closeIcon = closeSvg;
  public sizeError: string;
  public fileFormatError: string;
  public error: string;

  public files: File[] = [];

  constructor() { }

  ngOnInit(): void {
    this.setupErrors();
  }

  public onFileDropped($event: []): void {
    this.prepareFilesList($event);

    this.handleFiles.emit(this.files);
  }

  public fileBrowseHandler(event: any): void {
    this.prepareFilesList(event.target.files);

    this.handleFiles.emit(this.files);
  }

  public deleteFile(index: number): void {
    this.files.splice(index, 1);

    this.handleFiles.emit(this.files);
  }

  public prepareFilesList(files: []): void {
    this.error = '';

    for (const item of files) {
      if (item['size'] >= this.maxFileSize.value) {
        this.error = this.sizeError;
      } else if (!this.validateType(item['type'])) {
        this.error = this.fileFormatError;
      } else if (this.files.length < 3) {
        this.files.push(item);
      }
    }
  }

  private validateType(inputType: string): boolean {
    for (const type of this.availableFileTypes) {
      if (inputType.length && inputType.includes(type)) {
        return true;
      }
    }
  }

  private setupErrors(): void {
    this.sizeError = `The size of attached file exceeds ${ this.maxFileSize.name }`;
    this.fileFormatError = `Files can have the following formats: .${this.availableFileTypes.join(', .')}`;
  }
}
