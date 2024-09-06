import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

import trashCanSvg from '!!raw-loader!../icons/trash-can.svg';

@Component({
  selector: 'andteam-assessment-textarea',
  templateUrl: './comment-textarea.component.html',
  styleUrls: ['./comment-textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentTextareaComponent implements OnInit {
  public clearIcon: SafeHtml;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  @Input() placeholder = 'Add a comment';
  @Input() error: boolean;
  @Input() errorMessage: string;
  @Input() charactersLimit: number;
  @Input() value: string;

  @Output() blurTextarea = new EventEmitter<string>();
  @Output() changeValue = new EventEmitter<string>();

  constructor(private sanitizer: DomSanitizer) { }

  public ngOnInit(): void {
    this.clearIcon = this.sanitizer.bypassSecurityTrustHtml(trashCanSvg as any);
    this.value = this.value || '';
  }

  public clearTextarea(): void {
    this.blurTextarea.emit('');
    this.resizeToFitContent();
  }

  public onBlur(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    this.blurTextarea.emit(value);
  }

  public onChangeValue(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    this.changeValue.emit(value);
  }

  public resizeToFitContent(): void {
    window.requestAnimationFrame(() => {
      this.autosize.resizeToFitContent(true);
    });
  }
}
