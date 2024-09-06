import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { IExtraMile } from '@interfaces/userInfo.interface';
import { EmployeeService } from '@services/employee.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'andteam-user-extra-mile',
  templateUrl: './user-extra-mile.component.html',
  styleUrls: ['./user-extra-mile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserExtraMileComponent implements OnInit, OnDestroy {
  @Input() extraMiles: IExtraMile;
  @Input() userId: string;

  public destroy$ = new Subject();

  public isShowModal = false;

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
  }

  public onClickExtraMile(): void {
    this.isShowModal = true;
  }

  public onChangeExtraMile(comment?: string): void {
    this.employeeService.changeExtraMile(this.userId, comment).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.extraMiles.isExtraMile = !this.extraMiles.isExtraMile;
      this.extraMiles.comment = comment;
      this.cdr.detectChanges();
    });
    this.isShowModal = false;
  }

  public onCloseModal(): void {
    this.isShowModal = false;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
