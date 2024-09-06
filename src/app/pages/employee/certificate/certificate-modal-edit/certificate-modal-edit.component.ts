import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COMPONENT_TYPES } from '@constants/types/componentTypes.constants';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import exclamationMarkSvg from '!!raw-loader!@assets/images/exclamation-mark.svg';
import closeSvg from '!!raw-loader!@assets/images/close.svg';
import addSvg from '!!raw-loader!@assets/images/add.svg';
import trashSvg from '!!raw-loader!@assets/images/trash.svg';
import iconUnitedKingdomSvg from '!!raw-loader!@assets/images/icon-united-kingdom.svg';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ICertificate, ICertificateObjective } from '@interfaces/certificates.interface';
import {
  CERTIFICATE_ENGLISH_LEVEL,
  CONFIRM_MODAL_CLOSE_PARAMS,
  CONFIRM_MODAL_DELETE_PARAMS,
  CONFIRM_MODAL_WIDTH,
  INITIAL_UUID_VALUE
} from '../certificate.const';
import { ICommonOption } from '@interfaces/filter';
import { ConfirmModalComponent } from '@andkit/components/modals/confirm-modal/confirm-modal.component';
import { CertificateService } from '@services/certificate.service';
import { DatePipe } from '@angular/common';
import { ITechnologyLevel } from '@interfaces/technology-levels';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'andteam-certificate-modal-edit',
  templateUrl: './certificate-modal-edit.component.html',
  styleUrls: ['./certificate-modal-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CertificateModalEditComponent implements OnInit, OnDestroy {
  @Output() closeModal = new EventEmitter<null>();
  @Output() confirmModal = new EventEmitter<null>();

  public componentType = COMPONENT_TYPES.OVERTIME;
  public cancelButtonType = BUTTON_TYPES.PREVIOUS;
  public saveButtonType = BUTTON_TYPES.PRIMARY;
  public engLevels = CERTIFICATE_ENGLISH_LEVEL;
  public techLevels: ICommonOption[];
  public filtredTechList: ICommonOption[];
  public currentEngLvl: ICommonOption;
  public currentTechLevel: ICommonOption;
  public infoIcon = exclamationMarkSvg;
  public closeIcon = closeSvg;
  public addIcon = addSvg;
  public trashIcon = trashSvg;
  public unitedKingdomIcon = iconUnitedKingdomSvg;
  public formData: ICertificate;
  public currentForm: FormGroup;
  public isShowHint = false;
  public defaultObjectives: ICertificateObjective[] = [];
  public isCanAddGoal = true;
  public isShowSearchIcon = true;
  public editorPanelClass = 'editor-panel-class';
  public errorMessage = 'Required field';

  private destroy$ = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      certificate: ICertificate,
      techLevelList: ITechnologyLevel[],
      technologies: ICommonOption[],
      isFromView: boolean
    },

    private modalWindow: MatDialog,
    private matDialogRef: MatDialogRef<CertificateModalEditComponent>,
    private certificateService: CertificateService,
    private datePipe: DatePipe,
    private ref: ChangeDetectorRef,
  ) {
    this.formData = data.certificate;
    this.defaultObjectives = [...this.formData.objectives];
    this.techLevels = this.data.techLevelList.map(({ fullName }: ITechnologyLevel) => ({ id: fullName, name: fullName }));
  }

  public isGoalInvalid(index: number): boolean {
    return this.currentForm.controls[index].invalid && this.currentForm.controls[index].touched;
  }

  public getGoalErrorMessage(index: number): string {
    const control = this.currentForm.controls[index];

    return control.errors?.required
      ? `Please fill in this field or delete it`
      : `${control.value.length} characters (max 150)`;
  }

  public ngOnInit(): void {
    this.setupSelects();
    this.initForm();
    this.getTechnologiesList();

    if (this.formData.objectives.length > 7) {
      this.isCanAddGoal = false;
    }

    this.matDialogRef.backdropClick()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.onClose();
      });
  }

  public onKeyUpTechnology(): void {
    this.getTechnologiesList();
  }

  public initForm(): void {
    this.currentForm = new FormGroup({
      employeeNameControl: new FormControl(this.formData.employeeName, Validators.required),
      dateControl: new FormControl(this.formData.createDate, Validators.required),
      technologyControl: new FormControl(this.formData.mainTechnology, Validators.required),
      levelControl: new FormControl(this.formData.afterTechnologyLevel, Validators.required),
      engLevelControl: new FormControl(this.formData.englishLevel, Validators.required)
    });

    this.updateObjectiveControls();
  }

  public setupSelects(): void {
    this.currentEngLvl = this.engLevels.find(level => level.name === this.formData.englishLevel);
    this.currentTechLevel = this.techLevels.find(level => level.name === this.formData.afterTechnologyLevel);
  }

  public onGoalDelete(id: string): void {
    const confirmDialog = this.openConfirmModal(CONFIRM_MODAL_DELETE_PARAMS);

    confirmDialog.componentInstance.cancelEvent
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => confirmDialog.close());

    confirmDialog.componentInstance.confirmEvent
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isCanAddGoal = true;
        this.removeObjective(id);
        confirmDialog.close();
        this.ref.markForCheck();
      });
  }

  public onClose(): void {
    const confirmDialog = this.openConfirmModal(CONFIRM_MODAL_CLOSE_PARAMS);

    confirmDialog.componentInstance.cancelEvent
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => confirmDialog.close());

    confirmDialog.componentInstance.confirmEvent
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.formData.objectives = [...this.defaultObjectives];
        this.updateObjectiveControls();
        confirmDialog.close();
        this.closeModal.emit();
      });
  }

  public onSave(): void {
    if (this.currentForm.invalid) {
      this.currentForm.markAllAsTouched();

      return;
    }

    this.certificateService.updateCertificate(this.setUpdatedCertificate())
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.confirmModal.emit();
        this.certificateService.toggleCertificateUpdating(true);
      });
  }

  public onAddGoal(): void {
    if (this.formData.objectives.length >= 7) {
      this.isCanAddGoal = false;
    }

    this.formData.objectives.push({
      id: this.generateUUID(),
      name: ''
    });

    this.updateObjectiveControls();
  }

  public openConfirmModal(data: object): any {
    return this.modalWindow.open(ConfirmModalComponent, {
      data,
      width: CONFIRM_MODAL_WIDTH
    });
  }

  public toggleHintVisabiblity(): void {
    this.isShowHint = !this.isShowHint;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getTechnologiesList(): void {
    this.filtredTechList = this.data.technologies.filter((tech) => {
      return tech.name.toLowerCase().includes(this.currentForm.controls.technologyControl.value.toLowerCase());
    });
  }

  private setUpdatedCertificate(): ICertificate {
    const updatedCertificate = {
      id: this.formData.id,
      employeeName: this.currentForm.controls.employeeNameControl.value,
      currentReviewDate: this.datePipe.transform(this.currentForm.controls.dateControl.value, 'yyyy-MM-dd'),
      mainTechnology: this.currentForm.controls.technologyControl.value,
      afterTechnologyLevel: this.currentForm.controls.levelControl.value.name || this.currentForm.controls.levelControl.value,
      englishLevel: this.currentForm.controls.engLevelControl.value.name || this.currentForm.controls.engLevelControl.value,
      objectives: this.formData.objectives.map((objective: ICertificateObjective) => {
        objective.name = this.currentForm.controls[objective.id].value;

        return objective;
      })
    };

    return updatedCertificate;
  }

  private generateUUID(): string {
    return INITIAL_UUID_VALUE.replace(/[xy]/g, (c: string) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);

      return v.toString(16);
    });
  }

  private removeObjective(id: string): void {
    this.formData.objectives = this.formData.objectives.filter(objective => objective.id !== id);
    this.currentForm.removeControl(id);
    this.updateObjectiveControls();
  }

  private updateObjectiveControls(): void {
    for (const objective of this.formData.objectives) {
      this.currentForm.addControl(objective.id, new FormControl(objective.name, [Validators.maxLength(150), Validators.required]));
    }
  }
}
