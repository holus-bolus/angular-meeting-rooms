import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FeedbackInstructionModalComponent } from '@pages/feedback/feedback-instruction-modal/feedback-instruction-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  FEEDBACK_MODAL_WINDOW_WIDTH,
  FEEDBACK_NOTICE_MODAL_WINDOW_HEIGHT,
  FEEDBACK_ROCK_STAR_MODAL_WIDTH,
  PROJECT_FEEDBACK_SKILLS,
  HIGH_RATING_MARK,
} from '@pages/feedback/feedback-const';
import { IFeedbackSkill, IUniversalFeedbackData, IProjectFeedbackData } from '@interfaces/feedback.interface';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import { FeedbackService } from '@services/feedback.service';
import { Observable, of, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, delay, map, mergeMap, takeUntil } from 'rxjs/operators';
import { EMPLOYEE_ROUTE_NAME, EMPLOYEE_FEEDBACK_ON_PROJECT_VIEW } from '@constants/routes-name';
import { PortalBackwardLinkComponent } from '@andkit/components/buttons/portal-backward-link/portal-backward-link.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackModalComponent } from '@pages/feedback/feedback-modal/feedback-modal.component';
import { IProjectRowDetails } from '@interfaces/project.interface';
import { CompanyService } from '@services/company.service';

import infoHeaderSvg from '!!raw-loader!@assets/images/info-header.svg';
import hintHoverSvg from '!!raw-loader!@assets/images/hint-hover.svg';
import validationSvg from '!!raw-loader!@assets/images/validation.svg';


@Component({
  selector: 'andteam-feedback-on-project',
  templateUrl: './feedback-on-project.component.html',
  styleUrls: ['./feedback-on-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackOnProjectComponent implements OnInit, OnDestroy {
  @ViewChild('projectBlock', { static: false }) projectBlock: ElementRef;
  @ViewChild(PortalBackwardLinkComponent, { static: true }) backwardLinkComponent: PortalBackwardLinkComponent;

  public notificationText = 'The feedback has been successfully sent';
  public backLinkTitle: string;
  public returnPath: string;
  public btnCancel = BUTTON_TYPES.PREVIOUS;
  public btnNext = BUTTON_TYPES.SUBMIT;
  public feedbackSkills: IFeedbackSkill[];
  public universalFeedback: IUniversalFeedbackData;
  public isShowCancelModal = false;
  public isToastNotification: boolean;
  public isShowLoader = false;
  public formGroup: FormGroup;
  public project: IProjectRowDetails;

  public readonly strengthsMinLength = 100;
  public readonly improveMinLength = 1;
  public readonly maxLength = 1500;
  public readonly englishOnlyRegex = `^[A-Za-z0-9\\s!@#№$%^&*"()_+=\`~\\\\\\]\\[{}|';:/.,?><-]*$`;
  public readonly validationIcon = validationSvg as string;
  public readonly hintIcon = hintHoverSvg as string;
  public readonly infoIcon = infoHeaderSvg as string;

  private firstShow = true;
  private destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private modalWindow: MatDialog,
    private feedbackService: FeedbackService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private companyService: CompanyService,
  ) {
    const feedbackUserId = this.activatedRoute.snapshot.params.id;
    this.project = this.activatedRoute.snapshot.data.project;
    this.returnPath = `${ EMPLOYEE_ROUTE_NAME }/${ feedbackUserId }${ EMPLOYEE_FEEDBACK_ON_PROJECT_VIEW }`;
    this.backLinkTitle = 'Back to feedback on project page';
  }

  get getAverageMark(): number {
    const skillGroup = this.formGroup.controls.skillGroup as FormGroup;
    let values = 0;
    for (const skill in skillGroup.controls) {
      values += skillGroup.controls[skill].value as number;
    }

    return values / Object.keys(skillGroup.controls).length;
  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      skillGroup: this.formBuilder.group({
        question1: [null, Validators.required],
        question2: [null, Validators.required],
        question3: [null, Validators.required],
        question4: [null, Validators.required],
        question5: [null, Validators.required],
        question6: [null, Validators.required],
      }),
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
        Validators.required,
        Validators.maxLength(this.maxLength),
        Validators.pattern(this.englishOnlyRegex),
      ]);
      this.formGroup.controls.opinionImproveControl.setValidators([
        Validators.minLength(this.improveMinLength),
        Validators.required,
        Validators.maxLength(this.maxLength),
        Validators.pattern(this.englishOnlyRegex),
      ]);
    }

    this.feedbackSkills = PROJECT_FEEDBACK_SKILLS;
    this.formGroup.get('skillGroup').valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.firstShow
          && this.formGroup.controls.skillGroup.valid
          && this.getAverageMark >= HIGH_RATING_MARK) {
          this.firstShow = false;
          this.openRockStarModal();
        }
        this.formGroup.updateValueAndValidity();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public showInstructionModal(): void {
    this.modalWindow.open(FeedbackInstructionModalComponent, {
      maxWidth: FEEDBACK_MODAL_WINDOW_WIDTH,
      data: { isProject: true },
    });
  }

  public onFadeOut(): void {
    this.isToastNotification = false;
  }

  public openRockStarModal(): MatDialogRef<FeedbackModalComponent> {
    return this.modalWindow.open(FeedbackModalComponent, {
      width: FEEDBACK_ROCK_STAR_MODAL_WIDTH ,
      height: FEEDBACK_NOTICE_MODAL_WINDOW_HEIGHT,
      data: {
        title: 'Wow, the project is like a rock star!',
        subTitle: 'Dear colleague,',
        message: 'You have left a high rating in your feedback. Please add a detailed comment on why the project is so cool.',
      },
    });
  }

  public goBack(): void {
    this.isShowCancelModal = false;
    this.backwardLinkComponent.goToPage();
  }

  public close(): void {
    this.isShowCancelModal = false;
  }

  public onSubmit(): void {
    this.isShowLoader = true;
    const data = {
      question1: this.formGroup.controls.skillGroup.get('question1').value,
      question2: this.formGroup.controls.skillGroup.get('question2').value,
      question3: this.formGroup.controls.skillGroup.get('question3').value,
      question4: this.formGroup.controls.skillGroup.get('question4').value,
      question5: this.formGroup.controls.skillGroup.get('question5').value,
      question6: this.formGroup.controls.skillGroup.get('question6').value,
      textQuestion1: this.formGroup.controls.opinionStrengthsControl.value,
      textQuestion2: this.formGroup.controls.opinionImproveControl.value,
      projectId: this.project.id,
    } as IProjectFeedbackData;
    this.feedbackService.postProjectFeedback$(data)
        .pipe(
          mergeMap(() => this.toast()),
          catchError(() => {
            this.isShowLoader = false;

            return of(null);
          }),
      )
      .subscribe(() => {
        this.isShowLoader = false;
        this.router.navigate([this.returnPath]);
      });
  }

  private toast(): Observable<any> {
    const obs : Observable<any> = of(true);

    return obs.pipe(
      map(() => { this.isToastNotification = true; this.cdr.detectChanges(); }),
      delay(2000),
    );
  }
}
