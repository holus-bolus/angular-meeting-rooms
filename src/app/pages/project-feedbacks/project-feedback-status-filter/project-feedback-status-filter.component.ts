import { Component, ChangeDetectionStrategy, Input, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'andteam-project-feedback-status-filter',
  templateUrl: './project-feedback-status-filter.component.html',
  styleUrls: ['./project-feedback-status-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProjectFeedbackStatusFilterComponent {
  @Input() public options: {active:boolean, closed:boolean};
  @Output() public checkedOptions = new EventEmitter<{active:boolean, closed:boolean}>();

  onCheck(field: string, $event: Event): void {
    $event.preventDefault();
    this.options[field] = !this.options[field];
    this.checkedOptions.emit(this.options);
  }
}
