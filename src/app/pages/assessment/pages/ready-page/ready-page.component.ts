import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MAX_LENGTH_COMMENT } from '@pages/assessment/coordinator-cabinet/coordinator-cabinet';
import { ISalaryReview } from '@interfaces/candidate';

import dateIconSvg from '!!raw-loader!../../icons/date-icon.svg';

@Component({
  selector: 'andteam-ready-page',
  templateUrl: './ready-page.component.html',
  styleUrls: ['./ready-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadyPageComponent implements OnInit {
  review$ = new Observable<ISalaryReview>();
  isAssessment = true;
  candidateId: string;
  reviewDate: string;

  coordinatorCommentControl: FormControl;
  maxCommentLength = MAX_LENGTH_COMMENT;

  readonly dateIcon = dateIconSvg;

  @Input() candidateDetails: Observable<ISalaryReview>;
  @Output() updateCandidates = new EventEmitter<string>();

  public ngOnInit(): void {
    this.coordinatorCommentControl = new FormControl('', Validators.maxLength(this.maxCommentLength));

    this.review$ = this.candidateDetails
      .pipe(
        tap(
          (candidateDetails) => {
            const { coordinatorComment, id } = candidateDetails;

            this.coordinatorCommentControl.setValue(coordinatorComment || '');
            this.candidateId = id;
          }
        ),
      );
  }
}
