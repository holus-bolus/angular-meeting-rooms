import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import trashCanSvg from '!!raw-loader!./icons/trash-can.svg';

@Component({
  selector: 'andteam-assessment-input',
  templateUrl: './assessment-input.component.html',
  styleUrls: ['./assessment-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentInputComponent {
  @Input() public placeholder: string;
  @Input() public error: boolean;
  @Input() public errorMessage: string;
  @Input() public emitEveryChange = false;
  @Input() value = '';

  @Output() public changeSalary = new EventEmitter<string>();
  @Output() public blurSalary = new EventEmitter<void>();

  public isFocused: boolean;

  readonly clearIcon = trashCanSvg as any;

  public onChangeValue(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.changeSalary.emit(value);
  }

  public clearTextArea(): void {
    this.changeSalary.emit('');
  }

  public onFocus(): void {
    this.isFocused = !this.isFocused;
  }
}
