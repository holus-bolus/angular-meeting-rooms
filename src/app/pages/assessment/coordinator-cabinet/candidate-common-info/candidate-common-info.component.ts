import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { IConfirmationManager, IEmployeeCandidate, ISalaryReview } from '@interfaces/candidate';
import { CandidatesService } from '@services/assessments/candidates.service';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { COMPONENT_TYPES } from '@constants/types/componentTypes.constants';
import { ASSESSMENT_PAGES } from '@pages/assessment/coordinator-cabinet/coordinator-cabinet';

import locationSvg from '!!raw-loader!./icons/location.svg';
import projectSvg from '!!raw-loader!./icons/project.svg';

@Component({
  selector: 'andteam-candidate-common-info',
  templateUrl: './candidate-common-info.component.html',
  styleUrls: ['./candidate-common-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateCommonInfoComponent implements OnInit, OnDestroy {
  public resourceManagerTooltip = 'Resource manager';
  public managerTooltip = 'Manager who approved review';
  public projectTooltip = 'Projects';
  public locationTooltip = 'Location';
  public isOpenCancelModal = false;
  public employee: IEmployeeCandidate;
  public candidateId: string;
  public confirmationManager: IConfirmationManager;
  public componentType = COMPONENT_TYPES.ASSESSMENT;

  readonly locationIcon = locationSvg;
  readonly projectIcon = projectSvg;

  @Input() activeTab: ASSESSMENT_PAGES;
  @Input() candidateDetails: Observable<ISalaryReview>;

  @Output() updateCandidates = new EventEmitter<void>();
  @Output() addToConsideration = new EventEmitter<void>();
  private destroy = new Subject<void>();

  constructor(private candidatesService: CandidatesService,
              private changeDetectorRef: ChangeDetectorRef) { }

  public ngOnInit():void {
    this.candidateDetails
      .pipe(
        filter(candidateDetails => !!candidateDetails),
        takeUntil(this.destroy)
      )
      .subscribe(
        (candidateDetails) => {
          const { employee, id, confirmationManager } = candidateDetails;

          this.confirmationManager = confirmationManager;
          this.employee = employee;
          this.candidateId = id;
          this.changeDetectorRef.markForCheck();
        }
      );
  }

  public ngOnDestroy():void {
    this.destroy.next();
    this.destroy.complete();
  }

  public onOpenModal():void {
    this.isOpenCancelModal = true;
  }

  public onCloseModal():void {
    this.isOpenCancelModal = false;
  }

  public onOpenCancelModal():void {
    this.isOpenCancelModal = false;
  }

  public onUpdateCandidates():void {
    this.isOpenCancelModal = false;
    this.updateCandidates.emit();
  }

  public onAddToConsideration():void {
    this.addToConsideration.emit();
  }
}
