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
  FEEDBACK_NOTICE_MODAL_WINDOW_WIDTH,
  FEEDBACK_NOTICE_MODAL_WINDOW_HEIGHT,
  FEEDBACK_AVAILABILITY_TYPE,
  FEEDBACK_SKILLS,
  FEEDBACK_AVAILABILITY_TYPE_ANONYMOUS,
  FEEDBACK_AVAILABILITY_TYPE_DEFAULT,
  FEEDBACK_AVAILABILITY_TYPE_SECRET,
  FEEDBACK_ROCK_STAR_MODAL_WIDTH,
  HIGH_RATING_MARK,
  FEEDBACK_TYPES,
  POSITION_TYPE,
  FEEDBACK_OPTIONS,
  FEEDBACK_SKILLS_HR,
  FEEDBACK_SKILLS_RM,
  FEEDBACK_SKILLS_SRM,
} from '@pages/feedback/feedback-const';
import { IFeedbackInfo, IFeedbackSkill, IFeedbackRadioOptions, IUniversalFeedbackData } from '@interfaces/feedback.interface';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import { DataToAnotherComponentService } from '@services/dataToAnotherComponent.service';
import { FeedbackService } from '@services/feedback.service';
import { BehaviorSubject, Observable, of, Subject, ReplaySubject, combineLatest, Subscription } from 'rxjs';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { IUserDetails } from '@interfaces/authentication';
import { catchError, delay, map, mergeMap, take, takeUntil, tap, share, shareReplay } from 'rxjs/operators';
import { UserService } from '@services/user.service';
import { CompanyService } from '@services/company.service';
import { EMPLOYEE_ROUTE_NAME, EMPLOYEE_FEEDBACK_VIEW, EMPLOYEE_PERSONAL_INFO } from '@constants/routes-name';
import { PortalBackwardLinkComponent } from '@andkit/components/buttons/portal-backward-link/portal-backward-link.component';
import { AuthenticationService } from '@services/authentication.service';
import { ICommonOption } from '@interfaces/filter';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IFeedbackType, IPositionType } from './feedback.interface';
import { FeedbackModalComponent } from './feedback-modal/feedback-modal.component';

import infoHeaderSvg from '!!raw-loader!@assets/images/info-header.svg';
import hintHoverSvg from '!!raw-loader!@assets/images/hint-hover.svg';
import validationSvg from '!!raw-loader!@assets/images/validation.svg';

@Component({
  selector: 'andteam-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackComponent implements OnInit, OnDestroy {
  @ViewChild('projectBlock', { static: false }) projectBlock: ElementRef;
  @ViewChild(PortalBackwardLinkComponent, { static: true }) backwardLinkComponent: PortalBackwardLinkComponent;

  public titleForOtherUsers = 'Back to profile page';
  public titleForMainUser = 'Back to feedback tab';
  public notificationText = 'The feedback has been successfully sent';
  public projectSelectPlaceholder = 'Select common project';
  public typeSelectPlaceholder = 'Select feedback type';
  public availabilityTypeSelectPlaceholder = 'Select feedback availability type';

  public btnCancel = BUTTON_TYPES.PREVIOUS;
  public btnNext = BUTTON_TYPES.SUBMIT;
  public feedbackSkills: IFeedbackSkill[];
  public feedbackUserId: string;
  public feedbackId: string;
  public universalFeedback: IUniversalFeedbackData;

  public feedbackTitle: string;
  public feedbackSubTitle: string;
  public employee: string;
  public employeeSubText: string;
  public isChangeTitleOfLink: boolean;
  public titleForLink: string;
  public userInfo$: Observable<IFeedbackInfo>;
  public isShowCancelModal = false;
  public isToastNotification: boolean;
  public pathToCancelFeedback: string;
  public isShowLoader = false;
  public formGroup: FormGroup;
  public projects$: Observable<({ name: string; id: string } | ICommonOption)[]>;
  public projectsRS = new ReplaySubject<({ name: string; id: string } | ICommonOption)[]>(1);
  public positionTypesRS = new ReplaySubject<IFeedbackType[]>(1);
  public positionTypes$: Observable<IFeedbackType[]>;
  public positionTypes: IPositionType[];
  public commonProjects: ICommonOption[];
  public selectedPositionType: IFeedbackType;
  public showDescription = false;
  public routeData$: Observable<Data>;
  public skill$: Subscription;
  public recomendedFeedbackType: string;
  public feedback$: Observable<any>;
  public isSelectionDisabledBS = new BehaviorSubject<boolean>(false);
  public availabilityTypeoptions: IFeedbackRadioOptions[] = [];

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
    private transmitData: DataToAnotherComponentService,
    private feedbackService: FeedbackService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private companyService: CompanyService,
  ) {
    this.feedbackUserId = this.activatedRoute.snapshot.params.id;
    this.feedbackId = this.activatedRoute.snapshot.params.feedbackId;
    this.projects$ = this.feedbackService.getFeedbacksProjects$(this.feedbackUserId, 'false').pipe(share());
    this.userInfo$ = this.feedbackService.getInfo(this.feedbackUserId)
      .pipe(
        share(),
        tap((showInfo: IFeedbackInfo) => {
          if (showInfo.showTip) {
            this.authService.readManual(showInfo.selfFeedback)
              .pipe(take(1))
              .subscribe();

            this.showInstructionModal(showInfo.selfFeedback);
          }
        },
      ),
    );
    this.positionTypes$ = this.positionTypesRS.asObservable();
    this.routeData$ = this.route.data.pipe(
      shareReplay(1),
    );
  }

  get isUniversalType(): boolean {
    return ['ResourсeManagement', 'HumanResources', 'RMsCoordinates'].some(t => t === this.formGroup.controls.typeControl.value.value);
  }

  get getAverageMark(): number {
    const skillGroup = this.formGroup.controls.skillGroup as FormGroup;
    let values = 0;
    for (const skill in skillGroup.controls) {
      values += skillGroup.controls[skill].value as number;
    }

    return values / Object.keys(skillGroup.controls).length;
  }

  public generateSkillFormGroups(type: number): void {
    let feedbackSkills: IFeedbackSkill[];
    this.feedbackSkills = [];
    const skillGroup = this.formGroup.controls.skillGroup as FormGroup;
    const projectControl = this.formGroup.controls.projectControl as FormControl;
    for (const skill in skillGroup.controls) {
      skillGroup.removeControl(skill);
    }
    this.cdr.detectChanges();

    switch (type) {
      case POSITION_TYPE.RMsCoordinates: {
        projectControl.clearValidators();
        this.showDescription = false;
        this.updateProjects(false, true);
        this.formGroup.controls.skillGroup = this.formBuilder.group({
          question1: [null, Validators.required],
          question2: [null, Validators.required],
          question3: [null, Validators.required],
          question4: [null, Validators.required],
          question5: [null, Validators.required],
          question6: [null, Validators.required],
        });
        feedbackSkills = FEEDBACK_SKILLS_SRM;
        break;
      }

      case POSITION_TYPE.ResourсeManagement: {
        projectControl.clearValidators();
        this.showDescription = false;
        this.updateProjects(false, true);
        this.formGroup.controls.skillGroup = this.formBuilder.group({
          question1: [null, Validators.required],
          question2: [null, Validators.required],
          question3: [null, Validators.required],
          question4: [null, Validators.required],
          question5: [null, Validators.required],
          question6: [null, Validators.required],
          question7: [null, Validators.required],
        });
        feedbackSkills = FEEDBACK_SKILLS_RM;
        break;
      }

      case POSITION_TYPE.HumanResources: {
        projectControl.clearValidators();
        this.showDescription = false;
        this.updateProjects(false, true);
        this.formGroup.controls.skillGroup = this.formBuilder.group({
          question1: [null, Validators.required],
          question2: [null, Validators.required],
          question3: [null, Validators.required],
          question4: [null, Validators.required],
          question5: [null, Validators.required],
          question6: [null, Validators.required],
        });
        feedbackSkills = FEEDBACK_SKILLS_HR;
        break;
      }

      default: {
        projectControl.setValidators(Validators.required);
        this.showDescription = true;
        this.formGroup.controls.skillGroup = this.formBuilder.group({
          communicationSkills: [null, Validators.required],
          overallPerformance: [null, Validators.required],
          problemSolvingSkills: [null, Validators.required],
          professionalSkills: [null, Validators.required],
          qualityOfWork: [null, Validators.required],
          reliability: [null, Validators.required],
        });
        feedbackSkills = FEEDBACK_SKILLS;
        break;
      }
    }
    projectControl.updateValueAndValidity();
    this.updateSkillSubscription();
    this.feedbackSkills = feedbackSkills;
  }

  public ngOnInit(): void {
    this.availabilityTypeoptions = FEEDBACK_OPTIONS;
    this.isChangeTitleOfLink = this.transmitData.isChangeTitleOfLinks;
    this.formGroup = this.formBuilder.group({
      availabilityTypeControl: [this.availabilityTypeoptions[0], Validators.required],
      projectControl: [null, Validators.required],
      typeControl: [null, Validators.required],
      skillGroup: this.formBuilder.group({}),
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

    this.formGroup.updateValueAndValidity();
    this.updateSkillSubscription();
    combineLatest([
      this.projects$,
      this.userInfo$,
      this.routeData$,
      this.feedbackService.getRecomendedFeedbackType$(this.feedbackUserId),
    ])
    .pipe(takeUntil(this.destroy$))
    .subscribe(([projects, showInfo, data, recomendedFeedbackType]) => {
      this.recomendedFeedbackType = recomendedFeedbackType;
      const isUniversalType = ['ResourсeManagement', 'HumanResources', 'RMsCoordinates'].some(t => t === recomendedFeedbackType);
      const posTypes = data.data.positionTypes.map(rd => rd.positionType);
      const mappedPosTypes = FEEDBACK_TYPES.filter(ft => posTypes.includes(POSITION_TYPE[ft.id]));
      this.positionTypesRS.next(mappedPosTypes);
      this.positionTypes = data.data.positionTypes;
      this.commonProjects = projects;
      if (showInfo.selfFeedback) {
        this.formGroup.controls.projectControl.setValue(projects[0]);
        this.formGroup.controls.projectControl.updateValueAndValidity;
      }
      if (this.feedbackId || isUniversalType) {
        if (this.feedbackId) {
          this.universalFeedback = data.data.feedback;
          const type = (this.universalFeedback.positionType).toString();
          this.universalFeedback.positionType = FEEDBACK_TYPES.find(t => t.value === type).id;
        } else if (isUniversalType) {
          this.universalFeedback = {
            positionType: FEEDBACK_TYPES.find(t => t.value === recomendedFeedbackType).id,
          } as IUniversalFeedbackData;
        }

        this.generateSkillFormGroups(this.universalFeedback.positionType);
        this.formGroup.controls.typeControl.setValue(FEEDBACK_TYPES
          .find(type => type.id === this.universalFeedback.positionType));
        this.formGroup.controls.skillGroup.updateValueAndValidity();
        this.updateProjects(false, true);
      } else {
        this.formGroup.controls.typeControl.setValue(mappedPosTypes[0]);
        this.formGroup.controls.typeControl.updateValueAndValidity();
        this.generateSkillFormGroups(null);
        this.formGroup.controls.skillGroup.updateValueAndValidity();
        this.updateProjects(true);
      }

      this.changeTitles();
    });

    this.userService.getUserInfo$().pipe(
      map((value: IUserDetails) => value.externalId === this.feedbackUserId),
      tap((value: boolean) => {
        this.pathToCancelFeedback = value
        ? `${ EMPLOYEE_ROUTE_NAME }/${ this.feedbackUserId }/${ EMPLOYEE_FEEDBACK_VIEW }`
        : `${ EMPLOYEE_ROUTE_NAME }/${ this.feedbackUserId }/${ EMPLOYEE_PERSONAL_INFO }`;

        return this.pathToCancelFeedback;
      }),
    ).subscribe();

    if (!this.isChangeTitleOfLink) {
      this.titleForLink = this.titleForOtherUsers;
    } else {
      this.titleForLink = this.titleForMainUser;
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSelectType(): void {
    switch (Number(this.formGroup.controls.typeControl.value.id)) {
      case POSITION_TYPE.Management:
        this.updateProjects();
        break;

      case POSITION_TYPE.TechRuns:
        this.updateProjects();
        break;

      case POSITION_TYPE.TechSupport:
        this.updateProjects();
        break;

      case POSITION_TYPE.Trainee: {
        this.updateProjects();
        this.formGroup.controls.availabilityTypeControl.setValue(this.availabilityTypeoptions[2]);
        this.formGroup.controls.availabilityTypeControl.updateValueAndValidity();
        this.isSelectionDisabledBS.next(true);
        this.openTraineeNotice();
        break;
      }

      default: {
        this.updateProjects(true);
        this.isSelectionDisabledBS.next(false);
        break;
      }
    }
    this.formGroup.controls.projectControl.setValue(null);
    this.generateSkillFormGroups(Number(this.formGroup.controls.typeControl.value.id));
    this.changeTitles();
  }

  public showInstructionModal(isView: boolean): void {
    this.modalWindow.open(FeedbackInstructionModalComponent, {
      maxWidth: FEEDBACK_MODAL_WINDOW_WIDTH,
      data: { isMyFeedbackInstruction: isView },
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
        title: 'Wow, the person is like a rock star!',
        subTitle: 'Dear colleague,',
        message: 'You have left a high rating in your feedback. Please add a detailed comment on why the person is so cool.',
      },
    });
  }

  public openTraineeNotice(): void {
    this.modalWindow.open(FeedbackModalComponent, {
      width: FEEDBACK_NOTICE_MODAL_WINDOW_WIDTH,
      height: FEEDBACK_NOTICE_MODAL_WINDOW_HEIGHT,
      data: {
        title: 'Secret feedback',
        message: 'Availability for this type of feedback (trainee) can be only secret',
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

  public switchRequirement($event: boolean, feedbackSkill: IFeedbackSkill): void {
    const skill = this.formGroup.controls.skillGroup.get(feedbackSkill.skill);
    if ($event) {
      skill.setValue(null);
      skill.clearValidators();
    } else {
      skill.setValidators(Validators.required);
    }
    skill.updateValueAndValidity();
    this.formGroup.updateValueAndValidity();
  }

  public onSubmit(): void {
    this.isShowLoader = true;
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

    if (this.feedbackId || this.isUniversalType) {
      this.sendUniversalFeedback(accessRule);
    } else {
      this.sendFeedback(accessRule);
    }
  }

  public sendFeedback(accessRule: string): void {
    const data = {
      accessRule,
      communicationSkills: this.formGroup.controls.skillGroup.get('communicationSkills').value,
      overallPerformance: this.formGroup.controls.skillGroup.get('overallPerformance').value,
      problemSolvingSkills: this.formGroup.controls.skillGroup.get('problemSolvingSkills').value,
      professionalSkills: this.formGroup.controls.skillGroup.get('professionalSkills').value,
      qualityOfWork: this.formGroup.controls.skillGroup.get('qualityOfWork').value,
      reliability: this.formGroup.controls.skillGroup.get('reliability').value,
      personsStrengths: this.formGroup.controls.opinionStrengthsControl.value,
      whatToImprove: this.formGroup.controls.opinionImproveControl.value,
      projectId: this.formGroup.controls.projectControl.value.id,
      positionType: this.formGroup.controls.typeControl.value.id,
      employeeId: this.feedbackUserId,
    };
    this.feedbackService.postFeedback$(data)
        .pipe(
          mergeMap(() => this.toast()),
          catchError(() => {
            this.isShowLoader = false;

            return of(null);
          }),
      )
      .subscribe(() => {
        this.isShowLoader = false;
        this.formGroup.controls.opinionStrengthsControl.value
          ? this.router.navigate([`${ EMPLOYEE_ROUTE_NAME }/${ this.feedbackUserId }${ EMPLOYEE_PERSONAL_INFO }`])
          : this.router.navigate([`${ EMPLOYEE_ROUTE_NAME }/${ this.feedbackUserId }${ EMPLOYEE_FEEDBACK_VIEW }`]);
      });
  }

  public sendUniversalFeedback(accessRule: string): void  {
    const data = {
      feedbackAccessRule: accessRule,
      employeeId: this.feedbackUserId,
      positionType: this.formGroup.controls.typeControl.value.id,
      textQuestion1: this.formGroup.controls.opinionStrengthsControl.value,
      textQuestion2: this.formGroup.controls.opinionImproveControl.value,
      question1: this.formGroup.controls.skillGroup.get('question1').value,
      question2: this.formGroup.controls.skillGroup.get('question2').value,
      question3: this.formGroup.controls.skillGroup.get('question3').value,
      question4: this.formGroup.controls.skillGroup.get('question4').value,
      question5: this.formGroup.controls.skillGroup.get('question5').value,
      question6: this.formGroup.controls.skillGroup.get('question6').value,
      question7: null,
    } as IUniversalFeedbackData;

    if (this.formGroup.controls.skillGroup.get('question7')) {
      data.question7 = this.formGroup.controls.skillGroup.get('question7').value;
    }

    let query;
    if (data.feedbackId !== undefined) {
      query = this.feedbackService.saveUniversalFeedback(data);
    } else {
      query = this.feedbackService.createUniversalFeedback(data);
    }

    query.pipe(
      mergeMap(() => this.toast()),
      catchError(() => {
        this.isShowLoader = false;

        return of(null);
      })).subscribe(() => {
        this.isShowLoader = false;
        this.formGroup.controls.opinionStrengthsControl.value
          ? this.router.navigate([`${ EMPLOYEE_ROUTE_NAME }/${ this.feedbackUserId }${ EMPLOYEE_PERSONAL_INFO }`])
          : this.router.navigate([`${ EMPLOYEE_ROUTE_NAME }/${ this.feedbackUserId }${ EMPLOYEE_FEEDBACK_VIEW }`]);
      });
  }

  public updateSkillSubscription(): void {
    this.skill$ = this.formGroup.get('skillGroup').valueChanges
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

  private toast(): Observable<any> {
    const obs : Observable<any> = of(true);

    return obs.pipe(
      map(() => { this.isToastNotification = true; this.cdr.detectChanges(); }),
      delay(2000),
    );
  }

  private updateProjects(hasAllProjects: boolean = false, hasNoCommonProjects?: boolean): void {
    if (hasAllProjects) {
      this.projectsRS.next([...this.commonProjects]);
    } else {
      if (hasNoCommonProjects) {
        this.projectsRS.next([this.commonProjects[0]]);

        return;
      }

      const typeProjects = this.positionTypes.find(pt => pt.positionType === this.formGroup.controls.typeControl.value.value)
        .commonProjects;
      this.projectsRS.next([...typeProjects]);
    }
  }

  private changeTitles(): void {
    switch (this.formGroup.controls.typeControl.value.id) {
      case POSITION_TYPE.HumanResources: {
        this.feedbackTitle = 'Feedback on HR';
        this.feedbackSubTitle = 'Please leave your unbiased opinion on HR';
        this.employee = 'your HR';
        this.employeeSubText = 'of HR';
        break;
      }
      case POSITION_TYPE.ResourсeManagement: {
        this.feedbackTitle = 'Feedback on RM from Coordinates';
        this.feedbackSubTitle = 'Please leave your objective opinion on RM';
        this.employee = 'the RM';
        this.employeeSubText = 'of RM';
        break;
      }
      case POSITION_TYPE.RMsCoordinates: {
        this.feedbackTitle = 'Feedback on RM from senior RM';
        this.feedbackSubTitle = 'Please leave your objective opinion on RM';
        this.employee = 'the RM';
        this.employeeSubText = 'of RM';
        break;
      }
      default:
        this.employee = 'the employee';
        this.employeeSubText = 'and development of the employee';
        break;
    }
  }
}
