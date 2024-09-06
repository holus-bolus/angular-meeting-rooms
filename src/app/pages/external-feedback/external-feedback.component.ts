import { WindowService } from '@services/window.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IFeedbackInfo, IFeedbackRadioOptions, IFeedbackSkill } from '@interfaces/feedback.interface';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject, throwError } from 'rxjs';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FeedbackService } from '@services/feedback.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import {
  EXTERNAL_FEEDBACK_OPTIONS,
  FEEDBACK_AVAILABILITY_TYPE,
  FEEDBACK_AVAILABILITY_TYPE_DEFAULT,
  FEEDBACK_AVAILABILITY_TYPE_ANONYMOUS,
  FEEDBACK_AVAILABILITY_TYPE_SECRET,
  FEEDBACK_MODAL_WINDOW_WIDTH,
  FEEDBACK_ROCK_STAR_MODAL_WIDTH,
  FEEDBACK_SKILLS,
  MOBILE_SCREEN_WIDTH,
  HIGH_RATING_MARK,
} from '@pages/feedback/feedback-const';
import { FeedbackInstructionModalComponent } from '@pages/feedback/feedback-instruction-modal/feedback-instruction-modal.component';
import { catchError, takeUntil } from 'rxjs/operators';
import { FeedbackModalComponent } from '@pages/feedback/feedback-modal/feedback-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICommonOption } from '@interfaces/filter';
import { IFeedbackType, IPositionType } from '@pages/feedback/feedback.interface';
import { CompanyService } from '@services/company.service';
import { ExternalFeedbackInfoModalComponent } from './external-feedback-info-modal/external-feedback-info-modal.component';

import feedbackSentBgSvg from '!!raw-loader!@assets/images/feedback-sent-bg.svg';
import infoHeaderSvg from '!!raw-loader!@assets/images/info-header.svg';
import hintHoverSvg from '!!raw-loader!@assets/images/hint-hover.svg';
import validationSvg from '!!raw-loader!@assets/images/validation.svg';

@Component({
  selector: 'andteam-external-feedback',
  templateUrl: './external-feedback.component.html',
  styleUrls: ['./external-feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExternalFeedbackComponent implements OnInit, OnDestroy {
  public get isMobile(): boolean {
    return this.windowService.windowRef.innerWidth <= MOBILE_SCREEN_WIDTH;
  }

  public get getAverageMark(): number {
    return  (this.formGroup.controls.communicationSkills.value +
              this.formGroup.controls.overallPerformance.value +
              this.formGroup.controls.problemSolvingSkills.value +
              this.formGroup.controls.professionalSkills.value +
              this.formGroup.controls.qualityOfWork.value +
              this.formGroup.controls.reliability.value) / 6;
  }

  public availabilityTypeSelectPlaceholder = 'Select feedback availability type';
  public feedbackSkills: IFeedbackSkill[];
  public feedbackUserId: string;
  public userInfo$: Observable<IFeedbackInfo>;
  public btnPrevious = BUTTON_TYPES.PREVIOUS;
  public btnNext = BUTTON_TYPES.SUBMIT;
  public isShowCancelModal = false;
  public isFeedbackHasBeenSent$ = new BehaviorSubject<boolean>(true);
  public externalFeedbackId$ = new BehaviorSubject<string>(null);
  public dateNow = new Date();
  public isShowLoader = false;
  public formGroup: FormGroup;
  public selectedProject: ICommonOption;
  public projectsBS = new ReplaySubject<({ name: string; id: string } | ICommonOption)[]>(1);
  public projects$: Observable<({ name: string; id: string } | ICommonOption)[]>;
  public commonProjects: ICommonOption[];
  public selectedPositionType: IFeedbackType;
  public positionTypes: IPositionType[];
  public positionTypes$: Observable<IFeedbackType[]>;
  public isSelectionDisabledBS = new BehaviorSubject<boolean>(false);
  public availabilityTypeoptions: IFeedbackRadioOptions[] = [];
  public companyUrl = '#';

  public readonly strengthsMinLength = 100;
  public readonly improveMinLength = 1;
  public readonly maxLength = 1500;
  public readonly englishOnlyRegex = `^[A-Za-z0-9\\s!@#№$%^&*"()_+=\`~\\\\\\]\\[{}|';:/.,?><-]*$`;

  public readonly feedbackSentBgIcon = feedbackSentBgSvg as string;
  public readonly validationIcon = validationSvg as string;
  public readonly hintIcon = hintHoverSvg as string;
  public readonly infoIcon = infoHeaderSvg as string;

  private firstShow = true;
  private destroy$ = new Subject();

  constructor(
    private modalWindow: MatDialog,
    private feedbackService: FeedbackService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router,
    private windowService: WindowService,
    private formBuilder: FormBuilder,
    public companyService: CompanyService,
  ) {
    this.companyUrl = `https://${this.companyService.companyUrl}/our-projects`;
  }

  public ngOnInit(): void {
    this.availabilityTypeoptions = EXTERNAL_FEEDBACK_OPTIONS;
    this.formGroup = this.formBuilder.group({
      availabilityTypeControl: [this.availabilityTypeoptions[0], Validators.required],
      communicationSkills: [null, Validators.required],
      overallPerformance: [null, Validators.required],
      problemSolvingSkills: [null, Validators.required],
      professionalSkills: [null, Validators.required],
      qualityOfWork: [null, Validators.required],
      reliability: [null, Validators.required],
      opinionStrengthsControl: ['', [
        Validators.minLength(this.strengthsMinLength),
        Validators.required,
        Validators.maxLength(this.maxLength),
      ]],
      opinionImproveControl: ['', [
        Validators.minLength(this.improveMinLength),
        Validators.required,
        Validators.maxLength(this.maxLength),
      ]],
    });

    if (this.companyService.mainLanguage === 'En') {
      this.formGroup.controls.opinionStrengthsControl.setValidators([
        Validators.minLength(this.strengthsMinLength),
        Validators.pattern(this.englishOnlyRegex),
        Validators.required,
        Validators.maxLength(this.maxLength),
      ]);
      this.formGroup.controls.opinionImproveControl.setValidators([
        Validators.minLength(this.improveMinLength),
        Validators.pattern(this.englishOnlyRegex),
        Validators.required,
        Validators.maxLength(this.maxLength),
      ]);
    }

    this.formGroup.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.formGroup.controls.communicationSkills &&
          this.formGroup.controls.overallPerformance &&
          this.formGroup.controls.problemSolvingSkills &&
          this.formGroup.controls.professionalSkills &&
          this.formGroup.controls.qualityOfWork &&
          this.formGroup.controls.reliability &&
          this.getAverageMark >= HIGH_RATING_MARK &&
          this.firstShow) {
          this.firstShow = false;
          this.openRockStarModal();
        }
      });

    this.feedbackSkills = FEEDBACK_SKILLS;
    const externalFeedbackId = this.getExternalFeedbackId();
    this.externalFeedbackId$.next(externalFeedbackId);
    this.feedbackUserId = this.activatedRoute.snapshot.params.id;
    this.userInfo$ = this.feedbackService.getExternalFeedbackUserData(externalFeedbackId)
      .pipe(
        catchError((error) => {
          if (error.code === 'VALIDATION_FAILED' || error.code === 'NOT_FOUND') {
            this.router.navigate(['/404']);
          }

          if (error.code === 'BAD_REQUEST' || error.code === 'ACCESS_DENIED') {
            this.router.navigate(['/403']);
          }

          return throwError(error);
        }),
      );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getExternalFeedbackId(): string {
    return this.getIdFromParentRoute(this.route.snapshot);
  }

  public showModal(): void {
    this.openInstructionModal();
  }

  public openRockStarModal(): MatDialogRef<FeedbackModalComponent> {
    return this.modalWindow.open(FeedbackModalComponent, {
      width: FEEDBACK_ROCK_STAR_MODAL_WIDTH,
      data: {
        title: 'Wow, the person is like a rock star!',
        subTitle: 'Dear colleague,',
        message: 'You have left a high rating in your feedback. Please add a detailed comment on why the person is so cool.',
      },
    });
  }

  public onSubmit(): void {
    let accessRule;

    switch (Number(this.formGroup.controls.availabilityTypeControl.value.id)) {
      case FEEDBACK_AVAILABILITY_TYPE.Default:
        accessRule = FEEDBACK_AVAILABILITY_TYPE_DEFAULT.id;
        break;
      case FEEDBACK_AVAILABILITY_TYPE.Anonymous:
        accessRule = FEEDBACK_AVAILABILITY_TYPE_ANONYMOUS.id;
        break;
      case FEEDBACK_AVAILABILITY_TYPE.Secret:
        accessRule = FEEDBACK_AVAILABILITY_TYPE_SECRET.id;
        break;
      default:
        accessRule = FEEDBACK_AVAILABILITY_TYPE_DEFAULT.id;
        break;
    }

    this.isShowLoader = true;
    this.feedbackService.postExternalFeedback$({
      accessRule,
      communicationSkills: this.formGroup.controls.communicationSkills.value,
      overallPerformance: this.formGroup.controls.overallPerformance.value,
      problemSolvingSkills: this.formGroup.controls.problemSolvingSkills.value,
      professionalSkills: this.formGroup.controls.professionalSkills.value,
      qualityOfWork: this.formGroup.controls.qualityOfWork.value,
      reliability: this.formGroup.controls.reliability.value,
      personsStrengths: this.formGroup.controls.opinionStrengthsControl.value,
      whatToImprove: this.formGroup.controls.opinionImproveControl.value,
      date: this.dateNow,
      externalFeedbackRequestId: this.externalFeedbackId$.value,
    })
      .pipe(
        catchError(() => {
          this.isShowLoader = false;

          return of(null);
        }),
    )
    .subscribe(() => {
      this.isShowLoader = true;
      this.isFeedbackHasBeenSent$.next(false);
    });
  }

  public close(): void {
    this.isShowCancelModal = false;
  }

  public openInfoModal(skill: IFeedbackSkill): void {
    this.modalWindow.open(ExternalFeedbackInfoModalComponent, {
      maxWidth: FEEDBACK_MODAL_WINDOW_WIDTH,
      data: { skill },
    });
  }

  private getIdFromParentRoute(route: ActivatedRouteSnapshot): string {
    const idFromRoute = route.paramMap.get('id');

    if (idFromRoute) {
      return idFromRoute;
    }

    return route.parent ? this.getIdFromParentRoute(route.parent) : '';
  }

  private openInstructionModal(): void {
    this.modalWindow.open(FeedbackInstructionModalComponent, {
      maxWidth: FEEDBACK_MODAL_WINDOW_WIDTH,
      data: { isExternal: true },
    });
  }


}
