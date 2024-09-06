import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'andteam-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressSpinnerComponent {
  @Input() diameter = 64;
  @Input() strokeWidth = 5;
  @Input() isBluredBackground = false;

  mode = 'indeterminate';
}
