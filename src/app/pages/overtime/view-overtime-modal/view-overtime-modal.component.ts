import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy, OnInit
} from '@angular/core';
import { IOvertime } from '@interfaces/overtime.interface';
import { OVERTIME_PRESALE_TYPES_IDS, TEXT_LENGTH } from '@constants/overtime.const';
import { OvertimeService } from '@services/portal/overtime.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

import fileInactiveSvg from '!!raw-loader!@assets/images/file-inactive.svg';

@Component({
  selector: 'andteam-view-overtime-modal',
  templateUrl: './view-overtime-modal.component.html',
  styleUrls: ['./view-overtime-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewOvertimeModalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() overtime: IOvertime;

  @Output() closeModal = new EventEmitter<void>();

  public titleLength = TEXT_LENGTH.overtimeTitleLength;
  public isLoader = new BehaviorSubject<boolean>(false);

  readonly fileInactiveIcon = fileInactiveSvg;

  private destroy$ = new Subject();

  constructor(private overtimeService: OvertimeService) { }

  public ngOnInit(): void {
    this.showCommentForPresaleTypes();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['overtime'] && changes['overtime'].currentValue) {
      if (this.overtime.overType.required.sum && !!this.overtime.sum) {
        this.overtime.overType.required.hours = false;
      } else {
        this.overtime.overType.required.sum = false;
      }
    }
  }

  public showCommentForPresaleTypes(): void {
    for (const type in OVERTIME_PRESALE_TYPES_IDS) {
      if (OVERTIME_PRESALE_TYPES_IDS[type] === this.overtime.overType.values.overType.id) {
        this.overtime.overType.required.comment = true;

        return;
      }
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openFileUrl(overAttachmentId: string): void {
    this.isLoader.next(true);
    this.overtimeService.getAttachmentAsUrl$(overAttachmentId)
      .pipe(
        first(),
        takeUntil(this.destroy$)
      )
      .subscribe((res) => {
        this.isLoader.next(false);
        window.open(res);
      });
  }
}
