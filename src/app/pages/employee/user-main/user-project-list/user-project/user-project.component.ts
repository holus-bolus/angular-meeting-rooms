import { Component, ChangeDetectionStrategy, Input, OnDestroy, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { IAllocation, IEmployee } from '@interfaces/userInfo.interface';
import { MatDialog } from '@angular/material/dialog';
import { ProjectEmployeeListModalComponent } from '@pages/employee/project-employee-list-modal/project-employee-list-modal.component';
import { BehaviorSubject, forkJoin, Observable, Subject } from 'rxjs';
import { ScrollService } from '@services/scroll.service';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EMPLOYEE_ROUTE_NAME, LEAVE_FEEDBACK_ON_PROJECT_NAME } from '@constants/routes-name';
import { IUserDetails } from '@interfaces/authentication';

import noAvatarSvg from '!!raw-loader!@assets/images/no-avatar.svg';
import menuSvg from '!!raw-loader!@assets/images/kebab-menu.svg';


@Component({
  selector: 'andteam-user-project',
  templateUrl: './user-project.component.html',
  styleUrls: ['./user-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProjectComponent implements OnInit, OnDestroy  {
  @Input() allocation: IAllocation;
  @Input() userId: string;

  readonly TITLE_POSITION_OF_MANAGER = {
    DeliveryDirector: 'DD',
    DeliveryManager: 'DM',
    ProjectManager: 'PM',
  };
  readonly title = 'Team';
  readonly defaultAvatar = noAvatarSvg;
  readonly menuIcon = menuSvg;

  public isCurrentUser: boolean;
  public isMenuActive$ = new BehaviorSubject(false);
  public destroy$ = new Subject();

  constructor(
    private modalWindow: MatDialog,
    private scrollService: ScrollService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) {}

  public ngOnInit(): void {
    this.activatedRoute.parent.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((parentData) => {
        this.isCurrentUser = parentData.id === this.activatedRoute.parent.snapshot.data.employee.externalId;
      });
      
    this.scrollService.triggerScroll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isMenuActive$.next(false);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public toSeeEmployeeList(employeeList: IEmployee[]): void {
    this.modalWindow.open(ProjectEmployeeListModalComponent, {
      data: { employeeList, title: this.title },
    });
  }

  public onMenuIconClick(): void {
    this.isMenuActive$.next(!this.isMenuActive$.value);
  }

  public onOuterClick(isOpen: boolean): void {
    if (!isOpen && this.isMenuActive$.value) {
      this.isMenuActive$.next(false);
    }
  }

  public leaveFeedack(): void {
    this.router.navigate(
      [`${EMPLOYEE_ROUTE_NAME}/${this.userId}${LEAVE_FEEDBACK_ON_PROJECT_NAME}/${this.allocation.project.id}`],
      { state: {
        previousPath: 'personal-tab',
      }});
  }
  
  public askFeedback(): void {
    console.log('askFeedback');
  }
}
