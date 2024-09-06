import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import closeSvg from '!!raw-loader!../../../../../../assets/images/close.svg';
import assessmentCloseSvg from '!!raw-loader!../../../../../../assets/images/assessment-close.svg';

@Component({
  selector: 'andteam-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipComponent implements OnInit {
  @Input() public isAssessment: boolean;

  @Output() public remove = new EventEmitter();

  public removeIcon: SafeHtml;
  public assessmentRemoveIcon: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  public ngOnInit(): void {
    this.removeIcon = this.sanitizer.bypassSecurityTrustHtml(closeSvg as any);
    this.assessmentRemoveIcon = this.sanitizer.bypassSecurityTrustHtml(assessmentCloseSvg as any);
  }

  public onStopClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  public onRemove(): void {
    this.remove.emit();
  }
}
