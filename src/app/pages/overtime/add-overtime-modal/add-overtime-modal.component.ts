import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  IAttachment,
  IOvertimeConfiguration,
  IOvertimeConfigurationResponse,
  IOvertimeControls,
  IOvertimeCurrency,
  IOvertimeFormErrors,
  IOvertimeModals,
  IOvertimeOptions,
  IOvertimePayload,
  IOvertimePopups,
} from '@interfaces/overtime.interface';
import { ICommonOption } from '@interfaces/filter';
import { keys } from 'lodash';
import { IProjectApprovers } from '@interfaces/project.interface';
import {
  CONFIRMATION_MODAL_MESSAGE,
  KEYBOARD_BUTTONS,
  VALIDATOR_LENGTH,
  TEXT_LENGTH,
  OVERTIME_ID_PLACEHOLDERS,
  OVERTIME_PLACEHOLDERS,
  OVERTIME_PM_BONUS_ID,
  OVERTIME_TYPES_IDS,
  OVERTIME_ANDERSEN_PROJECT_ID,
  OVERTIME_ID_FOR_PROJECTS,
  OVERTIME_PRESALE_ID,
  OVERTIME_PRESALE_TYPES_IDS,
} from '@constants/overtime.const';
import { OvertimeService } from '@services/portal/overtime.service';
import {
  debounceTime,
  map,
  shareReplay,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { UserService } from '@services/user.service';
import { SIZES } from '@constants/file.constants';
import { ProjectService } from '@services/project.service';
import { ERRORS_MESSAGES } from '@constants/forms/errors-messages.constants';
import {
  COMPONENT_TYPES,
  INPUT_TYPES,
} from '@constants/types/componentTypes.constants';
import { sizeValidator } from '@validators/size.validator';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { EmployeeService } from '@services/employee.service';
import { touchValidateDeep } from '@pages/assessment/coordinator-cabinet/coordinator-cabinet';
import { floatMaxLengthValidator } from '@validators/float-max-length.validator';
import { INITIAL_DELAY } from '@andkit/components/other/loader/loader';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import { TechnologyService } from '@services/technology.service';
import { STATUSES } from '@constants/forms/form.constants';
import { MENU_ACTIONS } from '@andkit/components/other/table/table.config';
import { LocationService } from '@services/location.service';
import { IOffice } from '@interfaces/event';

import fileInactiveSvg from '!!raw-loader!@assets/images/file-inactive.svg';
import closeSmallSvg from '!!raw-loader!@assets/images/closeSmall.svg';

const VALID_HOURS = new RegExp(/^\d{0,3}([.]\d{0,3})?$/);
const VALID_SUM = new RegExp(/\d+(\.\d{2})?/);
const NON_WHITESPACE = new RegExp('\\S');

@Component({
  selector: 'andteam-add-overtime-modal',
  templateUrl: './add-overtime-modal.component.html',
  styleUrls: ['./add-overtime-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddOvertimeModalComponent implements OnChanges, OnInit, OnDestroy {
  @Input() configuration: IOvertimeConfiguration;
  @Input() buttonName: string;
  @Input() isOnlyAndersen: boolean;
  @Input() isAdditionalApproverRequired: boolean;
  @Input() hintLink: string;

  @Output() closeModal = new EventEmitter<void>();
  @Output() submitOvertime = new EventEmitter<IOvertimePayload>();

  public locationsList$: Observable<ICommonOption[]>;
  public componentsType = COMPONENT_TYPES.OVERTIME;
  public textInput = INPUT_TYPES.TEXT;
  public buttonSecondary = BUTTON_TYPES.SECONDARY;
  public dropdownHeight = 277;
  public maxSumIntegerLength = VALIDATOR_LENGTH.SUM_INTEGER;
  public maxSumAfterDotLength = VALIDATOR_LENGTH.SUM_DECIMAL;
  public maxHoursIntegerLength = VALIDATOR_LENGTH.HOURS_INTEGER;
  public maxHoursAfterDotLength = VALIDATOR_LENGTH.HOURS_DECIMAL;
  public idOfPlaceholders = OVERTIME_ID_PLACEHOLDERS;
  public placeholders = OVERTIME_PLACEHOLDERS;
  public placeHolder = 'Enter last name*';
  public titleLength: number;
  public isPMListEmpty: boolean;
  public isEditMode: boolean;
  public isAttachmentRemoved = false;
  public isCurrencyBlockDisabled = false;
  public autocompleteProjectControl = new FormControl();
  public autocompleteEmployeeControl = new FormControl();
  public isCorrectInput$ = new BehaviorSubject<boolean>(false);
  public currencyDefault$: Observable<string>;
  public allCurrencies$: Observable<ICommonOption[]>;
  public isMultiCurrency: boolean;
  public options: IOvertimeOptions;
  public employeeId: string;
  public employeeName: string;
  public projectId: string;
  public projectName: string;
  public pmOversTypes: any;
  public pmTypes: ICommonOption[] = [];
  public isShowProjectForPmOvers: boolean;
  public isShowApproverForPmOvers: boolean;
  public approverId: string;
  public currentlySelectedPmType: ICommonOption;
  public sumHintMessage$ = new BehaviorSubject<string>('');
  public isIncorrectSum$ = new BehaviorSubject<boolean>(false);
  public isShowPmInfoHint = new BehaviorSubject<boolean>(false);
  public isShowProjectInfoHint = new BehaviorSubject<boolean>(false);
  public isShowAttachment$ = new BehaviorSubject<boolean>(true);
  public isShowHoursForPresale$ = new BehaviorSubject<boolean>(false);
  public isShowSumForPresale$ = new BehaviorSubject<boolean>(false);
  public isValueInvalid = false;
  public isShowInfoButtonForPMOvers = false;
  public errors: IOvertimeFormErrors<boolean>;
  public errorsMessages: IOvertimeFormErrors<string>;
  public typeControl = new FormControl('', Validators.required);
  public projectControl = new FormControl('', Validators.required);
  public approversControl = new FormControl('', Validators.required);
  public ratioControl = new FormControl(null, Validators.required);
  public jiraLinkControl = new FormControl(null, [
    Validators.required
  ]);
  public hoursControl = new FormControl(null, [
    Validators.required,
    floatMaxLengthValidator(
      VALIDATOR_LENGTH.HOURS_MAX_LENGTH,
      VALIDATOR_LENGTH.HOURS_DECIMAL
    ),
    Validators.pattern(VALID_HOURS),
    Validators.min(0.001),
  ]);
  public sumControl = new FormControl(null, [
    Validators.required,
    floatMaxLengthValidator(
      VALIDATOR_LENGTH.SUM_MAX_LENGTH,
      VALIDATOR_LENGTH.SUM_DECIMAL
    ),
    Validators.pattern(VALID_SUM),
    Validators.min(0.01),
  ]);
  public currencyControl = new FormControl('', Validators.required);
  public wardEmployeeControl = new FormControl('', Validators.required);
  public postControl = new FormControl('', Validators.required);
  public levelControl = new FormControl('', Validators.required);
  public attachmentControl = new FormControl([], sizeValidator(SIZES.FILE));
  public attachments: IAttachment[] = [];
  public commentControl = new FormControl('', [
    Validators.required,
    Validators.minLength(VALIDATOR_LENGTH.COMMENT_MIN_LENGTH),
    Validators.maxLength(VALIDATOR_LENGTH.COMMENT_MAX_LENGTH),
    Validators.pattern(NON_WHITESPACE),
  ]);
  public locationControl = new FormControl('', Validators.required);
  public currentForm = new FormGroup({});
  public overtimeForm: FormGroup;
  public selected: {
    type?: ICommonOption;
    approvers?: ICommonOption;
    position?: ICommonOption;
    level?: ICommonOption;
    currency?: ICommonOption;
    location?: ICommonOption;
  } = {};
  public popups: IOvertimePopups = {
    modals: { view: false, add: false, edit: false, confirmation: false },
    notification: false,
  };
  public maxCommentsAmount = 5;
  public linkPatternValidation = `
    The format of the field should be: XXX - it's issue number
  `;

  readonly MAX_STR_LENGTH = 14;
  readonly MAX_ATTACHMENTS_AMOUNT = 2;
  readonly maxLength = 500;
  readonly errorMaxChars = `Text exceeds ${this.maxLength} character limit`;
  readonly localMoscowId = 'be4fbf5b-aca7-11e6-8042-00155d9c500d';
  readonly fileInactiveIcon = fileInactiveSvg;
  readonly closeIcon = closeSmallSvg;

  private destroy = new Subject<void>();

  constructor(
    private overtimeService: OvertimeService,
    private employeeService: EmployeeService,
    private userService: UserService,
    private technologyService: TechnologyService,
    private projectService: ProjectService,
    private locationService: LocationService
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.overtimeForm) {
      this.initForm();
    }

    if (changes.configuration && changes.configuration.currentValue) {
      this.reCreateCurrentForm(this.configuration);
    }
  }

  public ngOnInit(): void {
    if (this.configuration.values.overType.id === OVERTIME_PM_BONUS_ID) {
      this.setupPMTypes();
    }

    if (!(this.configuration.required.additionalApproverRequired || this.isItPresaleOvers() || this.isItOversForPM())) {
      this.currentForm.removeControl('additionalApproverId');
    }

    if (this.configuration.values.overType.id === OVERTIME_PRESALE_ID) {
      this.setupPresaleTypes();
    }

    if (!this.configuration.values.comment) {
      this.commentControl.setValue('');
    }

    if (this.configuration.values.overType.id === this.idOfPlaceholders.ASSESSMENT) {
      this.placeHolder = this.placeholders.ASSESSMENT;
    }

    if (this.configuration.values.overType.id === this.idOfPlaceholders.REFERRAL_PROGRAM) {
      this.placeHolder = this.placeholders.REFERRAL_PROGRAM;
    }

    if (this.configuration.values.overType.id === OVERTIME_TYPES_IDS.aws
      || this.configuration.values.overType.id === OVERTIME_TYPES_IDS.clutch) {
      this.currentForm.removeControl('additionalApproverId');
    }

    if (this.isOnlyAndersen) {
      this.projectService
        .getProjectsForOvertimeType('', this.configuration.values.overType.id)
        .pipe(takeUntil(this.destroy))
        .subscribe((response: ICommonOption[]) => {
          this.onSelectProject(response[0]);
        });
    }

    if (this.isItOversForPM()) {
      this.projectService
        .getProjectsForOvertimeType('', OVERTIME_ID_FOR_PROJECTS)
        .pipe(takeUntil(this.destroy))
        .subscribe((response: ICommonOption[]) => {
          this.onSelectProject(response[0]);
        });
    }

    this.isShowAttachment$.next(this.isShowAttachmentField());

    if (this.configuration.values.overType.id === OVERTIME_PRESALE_TYPES_IDS.techAssigment) {
      this.attachmentControl.setValidators([
        Validators.required,
        sizeValidator(SIZES.FILE)
      ]);
    }

    if (this.configuration.values.overType.id === OVERTIME_PRESALE_TYPES_IDS.demo) {
      this.configuration.required.sum = false;
    }

    const employeeId$ = this.userService.getUserInfo$().pipe(
      map(({ externalId }) => externalId),
      shareReplay(1)
    );

    employeeId$
      .pipe(take(1), takeUntil(this.destroy))
      .subscribe((externalId: string) => (this.employeeId = externalId));
    this.isMultiCurrency = this.configuration.required.currency;

    if (this.isMultiCurrency) {
      if (this.configuration.required.currencyRestrictions) {
        this.allCurrencies$ = this.getCurrenciesList(
          this.configuration.required.currencyRestrictions
        );
      }
    } else if (this.configuration.values.currency) {
      this.currencyDefault$ = of(this.configuration.values.currency).pipe(
        tap((currencyDefault: string) => this.currencyControl.setValue(currencyDefault))
      );
    } else {
      this.currencyDefault$ = this.employeeService
        .getCurrency(this.employeeId)
        .pipe(
          tap((currencyDefault: string) =>
            this.currencyControl.setValue(currencyDefault)
          )
        );
    }

    if (this.configuration.required.locationSelectRequired) {
      this.locationsList$ = this.getLocationsList();
      if (this.configuration.required.location) {
        this.selected.location = {
          name: this.configuration.required.location.name,
          id: this.configuration.required.location.id,
        };
        this.locationControl.setValue(this.configuration.required.location);
        this.isCurrencyBlockDisabled = false;
      }
    }

    if (this.configuration.required.location) {
      this.locationControl.setValue(this.configuration.required.location.id);
    }

    this.isEditMode = this.buttonName === MENU_ACTIONS.EDIT;
    this.titleLength = TEXT_LENGTH.overtimeTitleLength;
    this.initOptions();
    this.initErrors();

    if (this.jiraLinkControl.value) {
      this.jiraLinkControl.setErrors(null);
      this.jiraLinkControl.clearValidators();

      if (this.configuration.values.overType.id === OVERTIME_PRESALE_TYPES_IDS.demo
        || this.configuration.values.overType.id === OVERTIME_PRESALE_TYPES_IDS.techRun) {
        this.jiraLinkControl.setValidators([
          Validators.required,
        ]);
      } else  {
        this.jiraLinkControl.setValidators([
          Validators.required,
        ]);
      }

      this.setupJiraLinkValidationText();
      this.jiraLinkValidate(this.jiraLinkControl);
    }
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public isShowComment(): boolean {
    for (let type in OVERTIME_PRESALE_TYPES_IDS) {
      if (this.configuration.values.overType.id === OVERTIME_PRESALE_TYPES_IDS[type]) {
        return true;
      }
    }
  }

  public valueReseted(): void {
    this.projectId = null;
    this.selected = { ...this.selected, approvers: null };
    this.approversControl.reset();
  }

  public setupJiraLinkValidationText(): void {
    if (this.typeControl.value === OVERTIME_PRESALE_TYPES_IDS.techRun
      || this.typeControl.value === OVERTIME_PRESALE_TYPES_IDS.demo
      || this.configuration.values.overType.id === OVERTIME_PRESALE_TYPES_IDS.demo
      || this.configuration.values.overType.id === OVERTIME_PRESALE_TYPES_IDS.techRun) {
      this.linkPatternValidation = 'The format of the field should be: XXX - it\'s issue number';
    } else {
      this.linkPatternValidation = 'The format of the field should be: XXX - it\'s issue number';
    }
  }

  public isShowAttachmentField(): boolean {
    return !(this.configuration.values.overType.id === OVERTIME_PRESALE_TYPES_IDS.demo
      || this.configuration.values.overType.id === OVERTIME_PRESALE_TYPES_IDS.techRun
      || this.configuration.values.overType.id === OVERTIME_PRESALE_TYPES_IDS.presentation
      || this.configuration.values.overType.id === OVERTIME_PRESALE_TYPES_IDS.evaluation
      || this.configuration.values.overType.id === OVERTIME_PRESALE_ID);
  }

  public setupPMTypes(): void {
    this.isShowProjectForPmOvers = false;
    this.isShowApproverForPmOvers = false;
    this.selected.type = null;

    this.currentForm.addControl('type', this.typeControl);

    this.overtimeService.getOvertimeConfiguration$(OVERTIME_PM_BONUS_ID)
      .pipe(takeUntil(this.destroy))
      .subscribe((types: IOvertimeConfigurationResponse) => {
        this.pmOversTypes = types.subtypes;

        for (const type of this.pmOversTypes) {
          this.pmTypes = [...this.pmTypes, { description: type.description, name: type.name, id: type.id }];
        }
      });
  }

  public setupPresaleTypes(): void {
    this.currentForm.addControl('type', this.typeControl);
    this.overtimeService.getOvertimeConfiguration$(OVERTIME_PRESALE_ID)
      .pipe(takeUntil(this.destroy))
      .subscribe((types: IOvertimeConfigurationResponse) => {
        this.pmOversTypes = types.subtypes;

        for (const type of this.pmOversTypes) {
          this.pmTypes = [...this.pmTypes, { description: type.description, name: type.name, id: type.id }];
        }
      });
  }

  public onSelectProject(project: ICommonOption): void {
    this.projectName = project.name;

    if (this.isOnlyAndersen && !this.isAdditionalApproverRequired) {
      this.approversControl.clearValidators();
      this.approversControl.updateValueAndValidity();
      this.approverId = null;
    } else {
      this.selected = {
        ...this.selected,
        approvers: { id: null, name: '' },
      };

      this.approversControl.reset();
      this.approversControl.setValue('');
      this.approversControl.setValidators(Validators.required);
      this.approversControl.updateValueAndValidity();
    }

    if (
      this.configuration.values.overType.id === OVERTIME_TYPES_IDS.upsale ||
      this.currentlySelectedPmType?.id === OVERTIME_TYPES_IDS.upsale
    ) {
      this.approversControl.reset();
      this.approversControl.setValidators(Validators.required);
      this.approversControl.updateValueAndValidity();
    }

    if (this.projectId !== project.id) {
      this.projectId = project.id;
      this.options = {
        ...this.options,
        approvers$: this.hintedApprovers$(),
      };
    }

    if (this.isItPresaleOvers() && this.projectId === OVERTIME_ANDERSEN_PROJECT_ID) {
      this.approversControl.clearValidators();
    }

    if (project.id === OVERTIME_ANDERSEN_PROJECT_ID) {
      this.approversControl.setValidators(Validators.required);
      this.approversControl.updateValueAndValidity();
    }

    this.projectControl.setValue(project.id);
  }

  public onSelectType($event: ICommonOption): void {
    this.selected.type = $event;
    this.isShowInfoButtonForPMOvers = true;
    this.isShowProjectForPmOvers = $event.id === OVERTIME_TYPES_IDS.upsale;
    this.isShowApproverForPmOvers = $event.id === OVERTIME_TYPES_IDS.upsale || $event.id === OVERTIME_TYPES_IDS.contract;
    this.currentlySelectedPmType = $event;
    this.isShowSumForPresale$.next($event.id === OVERTIME_PRESALE_TYPES_IDS.demo);

    if (this.isItPresaleOvers()) {
      this.isShowAttachment$.next($event.id === OVERTIME_PRESALE_TYPES_IDS.techAssigment);
      this.currentForm.addControl('comment', this.commentControl);

      if ($event.id !== OVERTIME_PRESALE_TYPES_IDS.techAssigment) {
        this.commentControl.clearValidators();
        this.commentControl.setValidators([
          Validators.minLength(VALIDATOR_LENGTH.COMMENT_MIN_LENGTH),
          Validators.maxLength(VALIDATOR_LENGTH.COMMENT_MAX_LENGTH),
          Validators.pattern(NON_WHITESPACE),
        ]);
        this.attachmentControl.clearValidators();
        this.attachmentControl.setValidators(sizeValidator(SIZES.FILE));
      } else {
        this.commentControl.setValidators(Validators.required);
        this.attachmentControl.setValidators([
          Validators.required,
          sizeValidator(SIZES.FILE)
        ]);
      }

      if ($event.id === OVERTIME_PRESALE_TYPES_IDS.demo) {
        this.sumControl.setValue('');
        this.sumControl.updateValueAndValidity();
      }

      if ($event.id === OVERTIME_PRESALE_TYPES_IDS.techRun) {
        this.hoursControl.setValue('');
        this.hoursControl.updateValueAndValidity();
      }

      this.jiraLinkControl.clearValidators();

      if ($event.id === OVERTIME_PRESALE_TYPES_IDS.demo || $event.id === OVERTIME_PRESALE_TYPES_IDS.techRun) {
        this.jiraLinkControl.setValidators([
          Validators.required,
        ]);
      } else  {
        this.jiraLinkControl.setValidators([
          Validators.required,
        ]);
      }

      this.setupJiraLinkValidationText();
    }

    if ($event.id === OVERTIME_PRESALE_TYPES_IDS.demo) {
      this.configuration.required.sum = false;
    } else this.configuration.required.sum = true;

    this.isShowHoursForPresale$.next(this.isItPresaleOvers() && !($event.id === OVERTIME_PRESALE_TYPES_IDS.techRun));

    if (this.isShowHoursForPresale$.value && this.hoursControl.valid) {
      this.sumControl.clearValidators();
      this.sumControl.setValue('');
    } else this.sumControl.setValidators([
      Validators.required,
      floatMaxLengthValidator(
        VALIDATOR_LENGTH.SUM_MAX_LENGTH,
        VALIDATOR_LENGTH.SUM_DECIMAL
      ),
      Validators.pattern(VALID_SUM),
      Validators.min(0.01),
    ]);

    if (this.isShowApproverForPmOvers) {
      this.selected.approvers = null;
      this.approverId = null;
      this.approversControl.setValue(null);
      this.approversControl.setErrors(null);
    }

    if (this.isItOversForPM()) {
      this.isShowApproverForPmOvers ? this.approversControl.setValidators(Validators.required) : this.approversControl.clearValidators();
      this.isShowProjectForPmOvers ? this.projectControl.setValue('') : this.projectControl.setValue(OVERTIME_ANDERSEN_PROJECT_ID);
      this.projectId = this.isShowProjectForPmOvers ? '' : OVERTIME_ANDERSEN_PROJECT_ID;
    }

    this.typeControl.setValue($event.id);

    if (this.isItOversForPM()) {
      this.options = {
        ...this.options,
        approvers$: this.hintedApprovers$(),
      };
    }
  }

  public onInfoButtonHover(): void {
    this.isShowPmInfoHint.next(!this.isShowPmInfoHint.value);
  }

  public onProjectInfoButtonHover(): void {
    this.isShowProjectInfoHint.next(!this.isShowProjectInfoHint.value);
  }

  public getLocationsList(): Observable<ICommonOption[]> {
    return this.locationService.getLocations().pipe(
      map((offices: IOffice[]) =>
        offices.map((office: IOffice) => ({
          name: office.name,
          id: office.id,
          disabled: office.id === this.localMoscowId,
        }))
      )
    );
  }

  public onSelectOffice({ id }: ICommonOption, overId: string): void {
    this.overtimeService
      .getOvertimeConfiguration$(overId, id)
      .pipe(takeUntil(this.destroy))
      .subscribe((request: IOvertimeConfigurationResponse) => {
        this.configuration.required.currencyRestrictions =
          request.currencyRestrictions;
        this.sumHintMessage$.next('');
        if (request.currencyRestrictions.length) {
          this.isCurrencyBlockDisabled = false;
          this.configuration.required.currencyRestrictions[0].description =
            request.currencyRestrictions[0].description;
          this.allCurrencies$ = this.getCurrenciesList(
            request.currencyRestrictions
          );
        } else {
          this.isCurrencyBlockDisabled = true;
        }
        this.currencyControl.setValue('');
        this.currencyControl.reset();
        this.selected.currency = null;
        this.sumControl.setValue('');
        this.sumControl.reset();
      });
  }

  public onSelectCurrency(currency: ICommonOption): void {
    this.selected.currency = currency;
    this.currencyControl.setValue(currency.name);
    this.getSumHintMessage(currency.name, this.sumControl.value);
  }

  public onSelectApprovers({ id }: ICommonOption): void {
    this.approversControl.setValue(id);
  }

  public onEmployeeSelect(employee: ICommonOption): void {
    this.employeeName = employee.name;
    this.wardEmployeeControl.setValue(employee.id);
  }

  public onPostSelect({ id }: ICommonOption): void {
    this.postControl.setValue(id);
  }

  public onLevelSelect({ id }: ICommonOption): void {
    this.levelControl.setValue(id);
  }

  public onFileSelect(files: File[]): void {
    if (!files.length) {
      this.attachmentControl.markAsUntouched();
      this.attachmentControl.setValue(null);
    } else if (files[0].size <= SIZES.FILE) {
      this.attachmentControl.markAsTouched();
      this.attachmentControl.setValue([
        ...this.attachmentControl.value,
        files[0],
      ]);
      this.attachments.push({ name: files[0].name, file: files[0] });
      this.isValueInvalid = false;
    } else {
      this.attachmentControl.markAsTouched();
      this.isValueInvalid = true;
    }
  }

  public onDeleteFile(index: number): void {
    if (this.attachments[index]) {
      if (this.attachments[index].id) {
        this.attachments[index].isRemoved = true;
      } else {
        this.attachments.splice(index, 1);
      }
    }

    if (this.configuration.values.overType.id === OVERTIME_PRESALE_TYPES_IDS.techAssigment
      || this.configuration.values.overType.id === OVERTIME_PRESALE_ID) {
      let isAllAttachmentsRemoved = true;

      for (const item of this.attachments) {
        if (!item.isRemoved) {
          isAllAttachmentsRemoved = false;
        }
      }

      if (isAllAttachmentsRemoved) {
        this.attachmentControl.setValue([]);
        this.attachmentControl.setValidators([
          Validators.required,
          sizeValidator(SIZES.FILE)
        ]);
        this.attachmentControl.updateValueAndValidity();
      }
    }
  }

  public get isAddAttachAvail(): boolean {
    return (
      this.attachments.filter((attach: IAttachment) => !attach.isRemoved).length <
      this.MAX_ATTACHMENTS_AMOUNT
    );
  }

  public setupCommentPlaceholder(): string {
    if (this.typeControl.value === OVERTIME_PRESALE_TYPES_IDS.techAssigment) {
      return 'Comment*';
    }

    return this.configuration.required.jiraLink ? 'Comment' : 'Comment*';
  }

  public isItOversForPM(): boolean {
    return this.configuration.values.overType.id === OVERTIME_PM_BONUS_ID;
  }

  public isItPresaleOvers(): boolean {
    return this.configuration.values.overType.id === OVERTIME_PRESALE_ID;
  }

  public onSubmit(): void {
    touchValidateDeep(this.currentForm, 'touched');
    this.commentControl.setValue(this.commentControl.value.trim());

    if (this.jiraLinkControl.value) {
      this.setupJiraLinkValidationText();
      this.jiraLinkValidate(this.jiraLinkControl);
    }

    if (this.configuration.values.overType.id === OVERTIME_PRESALE_TYPES_IDS.techAssigment && this.commentControl.value.length < 1) {
      this.errors.comment$ = of(true);
    }

    if (this.isItPresaleOvers()) {
      this.hoursControl.setValidators([
        Validators.required,
        floatMaxLengthValidator(
          VALIDATOR_LENGTH.HOURS_MAX_LENGTH,
          VALIDATOR_LENGTH.HOURS_DECIMAL
        ),
        Validators.pattern(VALID_HOURS),
        Validators.min(0.001),
      ]);
      this.hoursControl.markAsTouched();
      this.hoursControl.updateValueAndValidity();
    }

    if (this.hoursControl.value) {
      this.currentForm.removeControl('sum');
      this.currentForm.addControl('hours', this.hoursControl);
    } else {
      this.currentForm.removeControl('hours');
      this.currentForm.addControl('sum', this.sumControl);
    }

    if (this.currentForm.valid) {
      const overtimePayload: IOvertimePayload = {
        employeeId: this.employeeId,
        overTypeId: this.configuration.values.overType.id,
        currency: this.currencyControl.value,
        additionalApproverId: this.approversControl.value,
        ...(this.isEditMode && this.isAttachmentRemoved
          ? { removeAttachment: true }
          : {}),
        ...this.currentForm.value,
        attachments: this.attachments,
      };

      if (this.isItOversForPM() || this.isItPresaleOvers()) {
        overtimePayload.overTypeId = this.typeControl.value;

        if (this.isShowHoursForPresale$.value) {
          overtimePayload.hours = this.hoursControl.value;
        }

        if (this.sumControl.value) {
          delete overtimePayload.hours;
        }
      }

      if (this.commentControl.value.length > 0) {
        overtimePayload.comment = this.commentControl.value;
      }

      if (this.isEditMode && !this.sumControl.value && this.hoursControl.value) {
        overtimePayload.ratio = this.hoursControl.value;
      }

      if (this.locationControl.value) {
        overtimePayload.LocationId = this.locationControl.value.id;
      }

      this.submitOvertime.emit(overtimePayload);
    }
  }

  public isDisabled(): boolean {
    return !this.isPMListEmpty || !this.projectId;
  }

  public onlyDecimalNumberKey(event: KeyboardEvent): boolean {
    const charCode: number = event.which ? event.which : event.keyCode;

    return (
      (charCode >= KEYBOARD_BUTTONS.zero &&
        charCode <= KEYBOARD_BUTTONS.nine) ||
      charCode === KEYBOARD_BUTTONS.dot ||
      charCode === KEYBOARD_BUTTONS.comma
    );
  }

  public onInputSum(event: number): void {
    this.getSumHintMessage(this.currencyControl.value, event);
    if (!event) {
      this.sumControl.setValidators([
        Validators.required,
        Validators.min(0.01),
      ]);
    }
  }

  public inputValidate(
    control: FormControl,
    maxLengthBeforePoint: number,
    maxLengthAfterPoint: number
  ): void {
    let inputText = '';

    if (control.value) {
      inputText = control.value.replace(',', '.').replace(/[^\d.]/g, '');
    }

    if (inputText[0] === '.') {
      inputText = `0${inputText}`;
    }

    if (
      inputText.indexOf('.') === -1 &&
      inputText.length > maxLengthBeforePoint
    ) {
      inputText = inputText.substring(0, maxLengthBeforePoint);
    }

    if (
      inputText.indexOf('.') !== -1 &&
      inputText.length > inputText.indexOf('.') + maxLengthAfterPoint
    ) {
      inputText = inputText.substring(
        0,
        inputText.indexOf('.') + maxLengthAfterPoint + 1
      );
    }

    this.maxHoursIntegerLength === maxLengthBeforePoint
      ? this.isCorrectInput$.next(
          !VALIDATOR_LENGTH.HOURS_REGULAR.test(inputText)
        )
      : this.isCorrectInput$.next(
          !VALIDATOR_LENGTH.SUM_REGULAR.test(inputText)
        );

    control.setValue(inputText);
  }

  public jiraLinkValidate(control: FormControl): void {
    this.setupJiraLinkValidationText();

    if (this.typeControl.value === OVERTIME_PRESALE_TYPES_IDS.techRun
      || this.typeControl.value === OVERTIME_PRESALE_TYPES_IDS.demo
      || this.configuration.values.overType.id === OVERTIME_PRESALE_TYPES_IDS.demo
      || this.configuration.values.overType.id === OVERTIME_PRESALE_TYPES_IDS.techRun) {
      this.errors.jiraLink$ = control.value
        ? of(false)
        : of(true);
    } else {
      this.errors.jiraLink$ = control.value
        ? of(false)
        : of(true);
    }

    control.updateValueAndValidity();
  }

  public commentValidate(control: FormControl): void {
    this.errors.comment$ = of(control.value.length > 500);
    control.updateValueAndValidity();
  }

  public isSumControlInvalid$(): Observable<boolean> {
    return this.errors.sum$.pipe(
      map(
        (value: boolean) =>
          (value && !this.hoursControl.value) ||
          (this.isCorrectInput$.value && this.sumControl.value) ||
          this.isIncorrectSum$.value
      )
    );
  }

  public isHoursControlInvalid$(): Observable<boolean> {
    return this.errors.hours$.pipe(
      map(
        (value: boolean) =>
          (value && !this.sumControl.value) ||
          (this.isCorrectInput$.value && this.hoursControl.value)
      )
    );
  }

  public close(): void {
    this.manageModals('confirmation', true);
  }

  public manageModals(modalName: keyof IOvertimeModals, open: boolean): void {
    this.popups = {
      ...this.popups,
      modals: { ...this.popups.modals, [modalName]: open },
    };
  }

  public getCurrentFormControl(controlName: string): AbstractControl {
    return this.currentForm.get(controlName);
  }

  public confirmText(): string {
    return this.buttonName === MENU_ACTIONS.EDIT
      ? CONFIRMATION_MODAL_MESSAGE.OVERTIME_EDIT_CANCEL
      : CONFIRMATION_MODAL_MESSAGE.OVERTIME_ADD_CANCEL;
  }

  public confirmSubText(): string {
    return this.buttonName === MENU_ACTIONS.EDIT
      ? CONFIRMATION_MODAL_MESSAGE.OVERTIME_EDIT_CANCEL_SUBTEXT
      : CONFIRMATION_MODAL_MESSAGE.OVERTIME_ADD_CANCEL_SUBTEXT;
  }

  public CancelButtonText(): string {
    return this.buttonName === MENU_ACTIONS.EDIT ? 'No' : 'Cancel';
  }

  public buttonText(): string {
    return this.buttonName === MENU_ACTIONS.EDIT ? 'Yes' : 'Close';
  }

  private initForm(): void {
    const controls: IOvertimeControls = {
      projectId: this.projectControl,
      additionalApproverId: this.approversControl,
      ratio: this.ratioControl,
      hours: this.hoursControl,
      sum: this.sumControl,
      currency: this.currencyControl,
      wardEmployeeId: this.wardEmployeeControl,
      position: this.postControl,
      level: this.levelControl,
      comment: this.commentControl,
      attachments: this.attachmentControl,
      location: this.locationControl,
      jiraLink: this.jiraLinkControl,
    };

    this.overtimeForm = new FormGroup(controls);
  }

  private initOptions(): void {
    this.options = {
      project$: this.hintedProjects$(),
      approvers$: this.hintedApprovers$(),
      employee$: this.hintedEmployees$(),
      technology$: this.technologyService.getTechnologies().pipe(
        map((arr: ICommonOption[]) =>
          arr.map((item: ICommonOption) => {
            return {
              ...item,
              name: this.overtimeService.cutString(
                item.name,
                this.MAX_STR_LENGTH
              ),
            };
          })
        )
      ),
      level$: this.employeeService
        .getLevels()
        .pipe(
          map((roles: string[]) => roles.map((level: string) => ({ id: level, name: level })))
        ),
    };
  }

  private hintedProjects$(): Observable<ICommonOption[]> {
    const overTypeId = this.isItOversForPM() ? OVERTIME_ID_FOR_PROJECTS : this.configuration.values.overType.id;

    return this.autocompleteProjectControl.valueChanges.pipe(
      debounceTime(INITIAL_DELAY),
      tap((projectNameSample: string) => {
        console.log(projectNameSample)
        if (projectNameSample !== this.projectName) {
          this.projectControl.setValue('');
        }
      }),
      switchMap((projectNameSample: string) => {
        return projectNameSample.length >= 2
          ? this.projectService.getProjectsForOvertimeType(
              projectNameSample,
              overTypeId
            )
          : of(null);
      })
    );
  }

  private hintedEmployees$(): Observable<ICommonOption[]> {
    return this.autocompleteEmployeeControl.valueChanges.pipe(
      debounceTime(INITIAL_DELAY),
      tap((surnameSample: string) => {
        if (surnameSample !== this.employeeName) {
          this.wardEmployeeControl.setValue('');
        }
      }),
      switchMap((surnameSample: string) =>
        surnameSample.length >= 3
          ? this.employeeService.getFullEmployeeListByName$(surnameSample)
          : of(null)
      )
    );
  }

  private hintedApprovers$(): Observable<ICommonOption[]> {
    let overTypeId = this.isItOversForPM() ? OVERTIME_TYPES_IDS.upsale : this.configuration.values.overType.id;

    if (this.currentlySelectedPmType?.id === OVERTIME_TYPES_IDS.contract) {
      overTypeId = OVERTIME_TYPES_IDS.contract;
    }

    if (this.isItPresaleOvers()) {
      overTypeId = OVERTIME_PRESALE_TYPES_IDS.evaluation;
    }

    if (this.projectId) {
      return this.projectService
        .getProjectApprovers(
          this.projectId,
          overTypeId
        )
        .pipe(
          map((approver: IProjectApprovers) => approver.approvers),
          tap((array: ICommonOption[]) => (this.isPMListEmpty = !!array.length))
        );
    }
  }

  private initErrors(): void {
    const sumError$ = this.getControlsErrors(this.sumControl);
    const hoursError$ = this.getControlsErrors(this.hoursControl);
    const jiraLinkError$ = this.getControlsErrors(this.jiraLinkControl);

    this.errors = {
      type$: this.getControlsErrors(this.typeControl),
      project$: this.getControlsErrors(this.projectControl),
      approvers$: this.getControlsErrors(this.approversControl),
      ratio$: this.getControlsErrors(this.ratioControl),
      hours$: hoursError$,
      sum$: sumError$,
      wardEmployee$: this.getControlsErrors(this.wardEmployeeControl),
      position$: this.getControlsErrors(this.postControl),
      level$: this.getControlsErrors(this.levelControl),
      comment$: this.getControlsErrors(this.commentControl),
      attachment$: this.getControlsErrors(this.attachmentControl),
      currencyControl$: this.getControlsErrors(this.currencyControl),
      jiraLink$: jiraLinkError$,
    };

    this.errorsMessages = {
      type$: of(ERRORS_MESSAGES.REQUIRED),
      project$: of(ERRORS_MESSAGES.REQUIRED),
      approvers$: of(ERRORS_MESSAGES.REQUIRED),
      ratio$: of(ERRORS_MESSAGES.REQUIRED),
      hours$: hoursError$.pipe(
        map(() => this.getErrorMessage(this.hoursControl))
      ),
      sum$: sumError$.pipe(map(() => this.getErrorMessage(this.sumControl))),
      wardEmployee$: of(ERRORS_MESSAGES.REQUIRED),
      position$: of(ERRORS_MESSAGES.REQUIRED),
      level$: of(ERRORS_MESSAGES.REQUIRED),
      comment$: of(ERRORS_MESSAGES.INVALID),
      attachment$: of(ERRORS_MESSAGES.INVALID),
      currencyControl$: of(ERRORS_MESSAGES.REQUIRED),
      jiraLink$: jiraLinkError$.pipe(
        map(() => this.getJiraLinkErrorMessage(this.jiraLinkControl))
      ),
    };
  }

  private reCreateCurrentForm(configuration: IOvertimeConfiguration): void {
    const defaultControls: Partial<IOvertimeControls> = {
      projectId: this.projectControl,
      additionalApproverId: this.approversControl,
      attachments: this.attachmentControl,
    };
    const relevantControls = keys(configuration.required)
      .reduce<Partial<IOvertimeControls>>(
        (controls: Partial<IOvertimeControls>, controlName: string) => {
          const control = configuration.required[controlName] && this.overtimeForm.get(controlName);

          return control
            ? { ...controls, [controlName]: control }
            : controls;
        },
        defaultControls
      );

    this.currentForm = new FormGroup(relevantControls);

    if (this.configuration.required.sum && this.configuration.required.hours) {
      this.getCurrentFormControl('hours')
        .valueChanges.pipe(takeUntil(this.destroy))
        .subscribe((value: number) => {
          if (!!value) {
            this.currentForm.removeControl('sum');
            this.currencyControl.markAsUntouched();
            this.currentForm.removeControl('currency');
          } else {
            this.currentForm.addControl('sum', this.sumControl);
            this.currentForm.addControl('currency', this.currencyControl);
            this.currencyControl.markAsTouched();
          }
        });

      this.getCurrentFormControl('sum')
        .valueChanges.pipe(takeUntil(this.destroy))
        .subscribe((value: string) =>
          !!value
            ? this.currentForm.removeControl('hours')
            : this.currentForm.addControl('hours', this.hoursControl)
        );
    }

    if (configuration.required.locationSelectRequired) {
      this.currentForm.addControl('location', this.locationControl);
    }

    this.updateControls(configuration);
  }

  private updateControls({ required, values }: IOvertimeConfiguration): void {
    if (required.ratio) {
      this.ratioControl.setValue(values.ratio);
    }

    if (required.projectId && values.project) {
      this.projectControl.setValue(values.project.id);
      this.autocompleteProjectControl.setValue(values.project.name);
      this.projectId = values.project.id;
    }

    if (required.hours && values.hours) {
      this.hoursControl.setValue(values.hours);
    }

    if (required.sum && values.sum) {
      this.sumControl.setValue(values.sum);
    }

    if (required.wardEmployeeId && values.wardEmployee) {
      this.wardEmployeeControl.setValue(values.wardEmployee.id);
      this.autocompleteEmployeeControl.setValue(values.wardEmployee.name);
    }

    if (required.position && values.position) {
      this.postControl.setValue(values.position.id);
      this.selected = { ...this.selected, position: values.position };
    }

    if (required.level && values.level) {
      this.levelControl.setValue(values.level.name);
      this.selected = { ...this.selected, level: values.level };
    }

    if ((required.comment && values.comment) || this.isShowComment()) {
      this.commentControl.setValue(values.comment);
    }

    if (required.jiraLink && values.jiraLink) {
      this.jiraLinkControl.setValue(values.jiraLink);
    }

    if (values.attachments) {
      this.attachmentControl.setValue([
        ...this.attachmentControl.value,
        ...values.attachments,
      ]);
      this.attachments = values.attachments;
    }

    if (values.additionalApprover) {
      this.approversControl.setValue(values.additionalApprover.id);
      this.selected = {
        ...this.selected,
        approvers: values.additionalApprover,
      };
      this.approverId = values.additionalApprover.id;
    }

    if (values.currency) {
      this.selected = {
        ...this.selected,
        currency: { name: values.currency, id: '' },
      };
      this.currencyControl.setValue(this.selected.currency.name);
    }
  }

  private getControlsErrors(control: FormControl): Observable<boolean> {
    return control.statusChanges.pipe(
      map((status: string) => status === STATUSES.INVALID && control.touched),
      shareReplay(1)
    );
  }

  private getErrorMessage(control: FormControl): string {
    const { errors } = control;

    return errors && errors.required
      ? ERRORS_MESSAGES.REQUIRED
      : ERRORS_MESSAGES.INVALID;
  }

  private getJiraLinkErrorMessage(control: FormControl): string {
    const { errors } = control;

    return errors && errors.required
      ? ERRORS_MESSAGES.REQUIRED
      : this.linkPatternValidation;
  }

  private getSumHintMessage(currency: string, sum: number): void {
    if (this.configuration.required.currencyRestrictions[0].max) {
      this.configuration.required.currencyRestrictions.forEach(
        (value: IOvertimeCurrency) => {
          if (value.currency === currency) {
            const maxSum =
              value.max - Math.floor(value.max)
                ? +value.max.toFixed(1)
                : value.max;

            this.sumHintMessage$.next(`Max is ${maxSum} ${value.currency}`);
            if (sum > maxSum) {
              this.isIncorrectSum$.next(true);
              this.sumControl.setValidators([
                Validators.max(maxSum),
                Validators.min(0.01),
                Validators.minLength(1),
              ]);
            } else {
              this.isIncorrectSum$.next(false);
            }
          }
        }
      );
    }
  }

  private getCurrenciesList(value: IOvertimeCurrency[]): Observable<any> {
    return of(
      value.map((value: IOvertimeCurrency) => ({
        name: value.currency,
        id: '',
      }))
    ).pipe(
      tap((value: ICommonOption[]) => {
        if (value.length === 1) {
          this.currencyControl.setValue(value[0].name);
          this.selected.currency = {
            name: value[0].name,
            id: '',
          };
        }
      })
    );
  }
}
