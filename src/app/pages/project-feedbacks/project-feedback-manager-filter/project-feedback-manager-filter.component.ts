import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { IProjectWithFeedbacks } from '@interfaces/feedback.interface';
import { IManager } from '@interfaces/userInfo.interface';
import { cloneDeep, uniqBy } from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MANAGER_TYPES, MANAGER_TYPE } from '../project-feedbacks.const';
import { IManagerType, IProjectManagers } from './project-feedback-manager-filter.interface';

@Component({
  selector: 'andteam-project-feedback-manager-filter',
  templateUrl: './project-feedback-manager-filter.component.html',
  styleUrls: ['./project-feedback-manager-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFeedbackManagerFilterComponent
  implements OnInit, OnDestroy
{
  @Input() public selectedManagerType: MANAGER_TYPE;
  @Input() public selectedManager: string;
  @Input() public options: IProjectWithFeedbacks[];
  @Output() public managerSelect = new EventEmitter<string>();
  @Output() public typeSelect = new EventEmitter<MANAGER_TYPE>();

  public managers = {} as IProjectManagers;
  public managerList: IManagerType[];
  public managerListFiltered: IManagerType[];
  public searchControl: FormControl;
  public typeControl: FormControl;
  public managerTypes = MANAGER_TYPES;
  public managerType = MANAGER_TYPE;
  private destroy$ = new Subject<void>();

  public ngOnInit(): void {
    this.searchControl = new FormControl('');
    this.typeControl = new FormControl(this.selectedManagerType);
    this.managers.pc =
      this.extractManagerList(uniqBy(this.options.map(opt => opt.project.pc), 'id'), MANAGER_TYPE.pc);
    this.managers.projectManager =
      this.extractManagerList(uniqBy(this.options.map(opt => opt.project.projectManager), 'id'), MANAGER_TYPE.projectManager);
    this.managers.sdm =
      this.extractManagerList(uniqBy(this.options.map(opt => opt.project.sdm), 'id'), MANAGER_TYPE.sdm);
    this.managers.dd =
      this.extractManagerList(uniqBy(this.options.map(opt => opt.project.dd), 'id'), MANAGER_TYPE.dd);
    this.managers.adm =
      this.extractManagerList(uniqBy(this.options.map(opt => opt.project.adm), 'id'), MANAGER_TYPE.adm);
    this.managers.deliveryManager =
      this.extractManagerList(uniqBy(this.options.map(opt => opt.project.deliveryManager), 'id'), MANAGER_TYPE.deliveryManager);

    this.managerList = this.managers[this.selectedManagerType];
    this.managerListFiltered = cloneDeep(this.managerList);

    this.searchControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: string) => {
        const text = value.toLowerCase();
        if (!value) {
          this.managerListFiltered = cloneDeep(this.managerList);
        } else {
          this.managerListFiltered = cloneDeep(this.managerList).filter(m =>
           m.manager.name.toLowerCase().startsWith(text),
          );
        }
      });
  }

  extractManagerList(managers: IManager[], type: MANAGER_TYPE): IManagerType[] {
    return managers.map((manager: IManager) => ({ manager, type }));
  }

  public onManagerTypeSelect(option: { title:string, value: MANAGER_TYPE }): void {
    this.typeControl.setValue(option.value);
    this.managerList = this.managers[this.typeControl.value];
    this.managerListFiltered = cloneDeep(this.managerList);
    this.typeSelect.emit(option.value);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onCheck(manager: IManagerType): void {
    this.managerSelect.emit(manager.manager.id);
  }
}
