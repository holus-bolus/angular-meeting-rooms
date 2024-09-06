import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

const DELAY_BEFORE_SPINNER_SHOWN = 1000;

@Component({
  selector: 'andteam-spinner',
  templateUrl: './spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent implements OnInit {
  @Input() public delay = DELAY_BEFORE_SPINNER_SHOWN;

  public isBluredBackground = true;
  public diameter = 100;
  public strokeWidth = 4;
  public isShowLoader$: Observable<boolean>;

  public ngOnInit(): void {
    this.isShowLoader$ = timer(this.delay).pipe(mapTo(true));
  }
}
