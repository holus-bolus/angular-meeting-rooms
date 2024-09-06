import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Observable, Subject, of, merge } from 'rxjs';
import { switchMap, tap, takeUntil, filter, delay, share } from 'rxjs/operators';
import { Router, ActivatedRoute, Scroll } from '@angular/router';
import { finalize } from 'rxjs/internal/operators';
import { IEmployeeFilter, IEmployeeRow, IEmployeesRows } from '@interfaces/employee';
import { RolesService } from '@services/roles.service';
import { INITIAL_DELAY } from '@andkit/components/other/loader/loader';
import { AuthenticationService } from '@services/authentication.service';
import { EmployeeService } from '@services/employee.service';

import dotSvg from '!!raw-loader!../../event/event/images/dot.svg';

const HEADER_HEIGHT = 83;

@Component({
  selector: 'andteam-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesListComponent implements OnInit, OnDestroy {
  employees: IEmployeeRow[];
  page = 1;
  pageSize = 20;
  totalItemsCount: number;
  totalPages: number;
  paginationConfig = {};
  params: IEmployeeFilter = {};
  destroy$ = new Subject();
  paginationHeight: number;
  isSpinnerShown = false;
  isLoading = false;
  dot = dotSvg;
  isAdmin$: Observable<boolean>;

  @ViewChild('totalEmployeesBlock') totalEmployeesBlock: ElementRef;

  constructor(
    private authenticationService: AuthenticationService,
    private employeeService: EmployeeService,
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private rolesService: RolesService) {
  }

  public ngOnInit(): void {
    this.route.queryParams.pipe(
      tap((params) => {
        this.params = params;
        this.isLoading = true;
      }),
      switchMap(() => this.getEmployees()),
      takeUntil(this.destroy$),
    )
      .subscribe((response: IEmployeesRows) => {
        this.isSpinnerShown = !response;

        if (response) {
          const { employees, totalItems, page, pageSize, totalPages } = response;

          this.employees = employees;
          this.totalItemsCount = totalItems;
          this.totalPages = totalPages;
          this.paginationConfig = { totalItems, itemsPerPage: pageSize, currentPage: page };
        }

        this.changeDetector.markForCheck();
      });

    this.router.events.pipe(
      filter(event => event instanceof Scroll),
      takeUntil(this.destroy$),
    ).subscribe(() => {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: this.paginationHeight, behavior: 'smooth' });
      });

    });
    this.isAdmin$ = this.rolesService.isAdmin$();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSendPageNumber(page: number): void {
    this.paginationHeight = this.totalEmployeesBlock.nativeElement.offsetTop - HEADER_HEIGHT;
    this.setupUrl(page);
  }

  public onSendFilters(filters: IEmployeeFilter): void {
    this.params = filters;
    this.paginationHeight = 0;
    this.setupUrl(1);
  }

  private setupUrl(page: number): void {
    this.page = page;
    const urlParams = { ...this.params, page };

    this.router.navigate([`/employee-list`], { queryParams: urlParams, replaceUrl: true });
  }

  private getEmployees(): Observable<IEmployeesRows> {
    const employees$ = this.employeeService.getAll({
      page: String(this.page),
      pageSize: String(this.pageSize),
      ...this.params,
    }).pipe(
      share(),
    );
    const delay$ = of(null).pipe(
      delay(INITIAL_DELAY),
      takeUntil(employees$),
    );

    return merge(employees$, delay$).pipe(
      finalize(() => {
        this.isLoading = false;
        this.isSpinnerShown = false;
        this.changeDetector.markForCheck();
      })
    );
  }
}
