import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveStatus, IProjectWithFeedbacks } from '@interfaces/feedback.interface';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { cloneDeep, sortBy, uniqBy } from 'lodash';
import { first, switchMap, takeUntil } from 'rxjs/operators';
import { FeedbackService } from '@services/feedback.service';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { SORT_OPTIONS, FILTERS, MANAGER_TYPE, MANAGER_TYPES } from './project-feedbacks.const';

import noDataSvg from '!!raw-loader!@assets/images/no-data.svg';
import arrowDownSvg from '!!raw-loader!@assets/images/arrow-down.svg';
import selectArrowSvg from '!!raw-loader!@assets/images/select-arrow.svg';
import downloadSmallSvg from '!!raw-loader!@assets/images/download-small.svg';
import closeSvg from '!!raw-loader!@assets/images/close.svg';

@Component({
  selector: 'andteam-project-feedbacks',
  templateUrl: './project-feedbacks.component.html',
  styleUrls: ['./project-feedbacks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFeedbacksComponent implements OnInit, OnDestroy {
  @ViewChild('projectFilter') projectFilter: ElementRef;
  @ViewChild('managerFilter') managerFilter: ElementRef;
  @ViewChild('statusFilter') statusFilter: ElementRef;
  @ViewChild('projectFilterTemplate') projectFilterTemplate: CdkPortal;
  @ViewChild('managerFilterTemplate') managerFilterTemplate: CdkPortal;
  @ViewChild('statusFilterTemplate') statusFilterTemplate: CdkPortal;

  public displayedColumns: string[] = [
    'active',
    'project',
    'manager',
    'lastFeedback',
    'amountOfFeedback',
    'rating',
    'status',
  ];
  public oppenedFilterRef: OverlayRef;
  public sortOptions = SORT_OPTIONS;
  public filters = FILTERS;
  public baseProjectFeedbackList$ = new ReplaySubject<IProjectWithFeedbacks[]>(1);
  public projectFeedbackList$ = new ReplaySubject<IProjectWithFeedbacks[]>(1);
  public filteredProjectList: IProjectWithFeedbacks[];
  public isLoader = new BehaviorSubject<boolean>(false);
  public refreshDataS = new Subject<void>();
  public destroy$ = new Subject<void>();
  public allChecked = false;
  public atLeastOneChecked = false;
  public feedbackAmount: number;
  public projectAmount: number;
  public selectedManagerType = MANAGER_TYPE.projectManager;
  public selectedManagerTypeTitle = 'PM';

  public sortIcon: string = arrowDownSvg;
  public filterIcon: string = selectArrowSvg;
  public downloadIcon: string = downloadSmallSvg;
  public noDataIcon: string = noDataSvg;
  public closeGreyIcon: string = closeSvg;

  constructor(
    private activatedRoute: ActivatedRoute,
    private feedbackService: FeedbackService,
    public overlay: Overlay,
  ) {}

  public ngOnInit(): void {
    const projectFeedbacks = this.activatedRoute.snapshot.data.projectFeedbacks;
    const projects = cloneDeep(projectFeedbacks);
    this.baseProjectFeedbackList$.next(projectFeedbacks);
    this.refreshDataS.pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      const filteredFeedbackList = this.applyFiltersAndOrdering(projects);
      this.checkAllChecked(filteredFeedbackList);
      this.filteredProjectList = filteredFeedbackList;
      this.feedbackAmount = filteredFeedbackList.reduce((acc, project) => {
        acc += project.amountOfFeedback;

        return acc;
      },                                                0);
      this.projectAmount = filteredFeedbackList.length;
      this.projectFeedbackList$.next(filteredFeedbackList);
    });
    this.refreshDataS.next();
  }

  public applyFiltersAndOrdering(projectFeedbacks: IProjectWithFeedbacks[]): IProjectWithFeedbacks[] {
    let filteredProjects = projectFeedbacks;
    if (this.filters.project.isActive) {
      filteredProjects = filteredProjects.filter(fp => fp.project.id === this.filters.project.value);
    }

    if (this.filters.manager.isActive) {
      const pc = filteredProjects.filter(opt => opt.project.pc?.id === this.filters.manager.value);
      const pm = filteredProjects.filter(opt => opt.project.projectManager?.id === this.filters.manager.value);
      const sdm = filteredProjects.filter(opt => opt.project.dd?.id === this.filters.manager.value);
      const dm = filteredProjects.filter(opt => opt.project.deliveryManager?.id === this.filters.manager.value);
      const adm = filteredProjects.filter(opt => opt.project.adm?.id === this.filters.manager.value);
      const dd = filteredProjects.filter(opt => opt.project.dd?.id === this.filters.manager.value);

      filteredProjects = uniqBy([...pc, ...pm, ...sdm, ...dm, ...adm, ...dd], 'id');
    }

    if (!this.filters.status.value.active) {
      filteredProjects = filteredProjects.filter(p => p.status !== ActiveStatus.active);
    }

    if (!this.filters.status.value.closed) {
      filteredProjects = filteredProjects.filter(p => p.status !== ActiveStatus.closed);
    }

    if (this.filters.onlySelected.isActive) {
      filteredProjects = filteredProjects.filter(p => p.checked);
    }

    if (this.sortOptions.amountOfFeedback.isActive) {
      filteredProjects = this.sortOptions.amountOfFeedback.isDesc ?
      sortBy(filteredProjects, 'amountOfFeedback').reverse() :
      sortBy(filteredProjects, 'amountOfFeedback');
    }

    if (this.sortOptions.rating.isActive) {
      filteredProjects = this.sortOptions.rating.isDesc ?
        sortBy(filteredProjects, 'rating').reverse() :
        sortBy(filteredProjects, 'rating');
    }

    if (this.sortOptions.lastFeedback.isActive) {
      filteredProjects = this.sortOptions.lastFeedback.isDesc ?
        sortBy(filteredProjects, 'lastFeedbackDate').reverse() :
        sortBy(filteredProjects, 'lastFeedbackDate');
    }

    return filteredProjects;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSortChange(columnName: string): void {
    if (this.sortOptions[columnName].isActive) {
      if (this.sortOptions[columnName].isDesc) {
        this.sortOptions[columnName].isDesc = false;
      } else {
        this.sortOptions[columnName].isDesc = true;
        this.sortOptions[columnName].isActive = false;
      }
    } else {
      for (const sort in this.sortOptions) {
        this.sortOptions[sort].isActive = false;
        this.sortOptions[sort].isDesc = true;
      }

      this.sortOptions[columnName].isDesc = true;
      this.sortOptions[columnName].isActive = true;
    }

    this.refreshDataS.next();
  }

  checkAll(): void {
    this.projectFeedbackList$
      .pipe(first())
      .subscribe((projectFeedbackList) => {
        for (const project of projectFeedbackList) {
          project.checked = this.allChecked ? false : true;
        }

        this.checkAllChecked(projectFeedbackList);

        if (this.showOnlySelected) {
          this.refreshDataS.next();
        }
      });
  }

  check(project: IProjectWithFeedbacks): void {
    project.checked = !project.checked;
    if (this.showOnlySelected && !project.checked) {
      this.refreshDataS.next();
    }

    this.projectFeedbackList$
      .pipe(first())
      .subscribe(projectFeedbackList => this.checkAllChecked(projectFeedbackList));
  }

  openFilterWindow(filterName: string): void {
    let template: CdkPortal;
    let elementRef: ElementRef;
    switch (filterName) {
      case 'projectFilterTemplate': {
        template = this.projectFilterTemplate;
        elementRef = this.projectFilter;
      }
        break;
      case 'managerFilterTemplate': {
        template = this.managerFilterTemplate;
        elementRef = this.managerFilter;
      }
        break;
      case 'statusFilterTemplate': {
        template = this.statusFilterTemplate;
        elementRef = this.statusFilter;
      }
        break;
      default:
        throw(new Error('Wrong name of Filter'));
    }
    const config = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.overlay.position()
        .flexibleConnectedTo(elementRef)
        .withPositions([{
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        }]),
    });

    this.oppenedFilterRef = this.overlay.create(config);
    this.oppenedFilterRef.attach(template);
    this.oppenedFilterRef.backdropClick()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.oppenedFilterRef.detach();
      });
  }

  onProjectOptionChecked(projectId: string): void {
    this.oppenedFilterRef.detach();
    this.filters.project.value = projectId;
    this.filters.project.isActive = true;
    this.refreshDataS.next();
  }

  onManagerSelected(managerId: string): void {
    this.oppenedFilterRef.detach();
    this.filters.manager.value = managerId;
    this.filters.manager.isActive = true;
    this.refreshDataS.next();
  }

  onManagerTypeSelected(type: MANAGER_TYPE): void {
    this.filters.manager.isActive = false;
    this.filters.manager.value = null;
    this.selectedManagerType = type;
    this.selectedManagerTypeTitle = MANAGER_TYPES.find(mType => mType.value === this.selectedManagerType).title;
    this.refreshDataS.next();
  }

  onStatusOptionChecked(statuses: {active:boolean, closed:boolean}): void {
    if (statuses.active && statuses.closed) {
      this.filters.status.isActive = false;
    } else {
      this.filters.status.isActive = true;
    }

    this.filters.status.value.active = statuses.active;
    this.filters.status.value.closed = statuses.closed;
    this.refreshDataS.next();
  }

  public clearFilters(fieldName: string): void {
    this.filters[fieldName].isActive = false;
    if (fieldName === 'status') {
      this.filters[fieldName].value.active = true;
      this.filters[fieldName].value.closed = true;
    } else {
      this.filters[fieldName].value = null;
    }
    this.refreshDataS.next();
  }

  public downloadExcel(): void {
    if (!this.atLeastOneChecked) {
      return;
    }

    this.isLoader.next(true);
    this.projectFeedbackList$
      .pipe(
        first(),
        switchMap((projectFeedbackList: IProjectWithFeedbacks[]) => {
          const idList = projectFeedbackList.filter(p => p.checked).map(p => p.id);
          this.isLoader.next(false);

          return this.feedbackService.getExelReport$(idList);
        }))
      .subscribe((res) => {
        this.isLoader.next(false);
        const date = new Date().toLocaleDateString();
        const a = document.createElement('a');
        a.download = `${date}-projects-feedbacks.xlsx`;
        a.setAttribute('style', 'display:none;');
        a.href = res;
        a.click();
      });
  }

  public showOnlySelected(): void {
    if (!this.atLeastOneChecked && !this.filters.onlySelected.isActive) {
      return;
    }

    this.filters.onlySelected.isActive = !this.filters.onlySelected.isActive;
    this.filters.onlySelected.value = !this.filters.onlySelected.value;
    this.refreshDataS.next();
  }

  private checkAllChecked(projectFeedbackList: IProjectWithFeedbacks[]): void {
    this.allChecked = projectFeedbackList.every(p => p.checked) && projectFeedbackList.length > 0;
    this.atLeastOneChecked = projectFeedbackList.some(p => p.checked);
  }
}
