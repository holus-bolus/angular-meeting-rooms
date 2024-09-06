import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

import errorInformSvg from '!!raw-loader!../../../../../../../assets/images/error-inform.svg';
import saveSvg from '!!raw-loader!../icons/save.svg';
import clearSvg from '!!raw-loader!../icons/clear.svg';

@Component({
  selector: 'andteam-feedback-textarea',
  templateUrl: './feedback-textarea.component.html',
  styleUrls: ['./feedback-textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackTextareaComponent {
  @Input() public errorMessage: string;
  @Input() public errorMaxLength: boolean;
  @Input() public errorRequire: boolean;
  @Input() public placeholder = 'Add your feedback';
  @Input() public maxRows: number;
  @Input() public charactersLimit: number;
  @Input() public disabled: boolean;
  @Input() public value: string;
  @Input() public isEditing: boolean;

  @Output() public valueChanges = new EventEmitter<string>();
  @Output() public save = new EventEmitter<void>();
  @Output() public clear = new EventEmitter<void>();

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @ViewChild('textarea') textarea: ElementRef;

  readonly warning = errorInformSvg;
  readonly saveIcon = saveSvg;
  readonly clearIcon = clearSvg;

  public onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    this.valueChanges.emit(value);
  }

  public onSave(): void {
    this.save.emit();
  }

  public onClear(): void {
    this.clear.emit();
  }

  public resizeToFitContent(): void {
    window.requestAnimationFrame(() => {
      this.autosize.resizeToFitContent(true);
    });
  }

  public focus(): void {
    this.textarea.nativeElement.focus();
  }
}
