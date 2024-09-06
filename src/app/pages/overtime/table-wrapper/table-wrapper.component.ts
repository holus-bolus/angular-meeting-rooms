import { OvertimeConfiguration } from './../models/overtime-configuration';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { ICommonOption } from '@interfaces/filter';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { OvertimeService } from '@services/portal/overtime.service';
import { Observable, Subject } from 'rxjs';
import {
  IOvertimeConfiguration, IOvertimeConfigurationResponse
} from '@interfaces/overtime.interface';
import { FormControl, Validators } from '@angular/forms';
import portalArrowSvg from '!!raw-loader!@assets/images/portal-arrow.svg';
import { IOvertype } from '@interfaces/overtype.interface';
import { CompanyService } from '@services/company.service';

@Component({
  selector: 'andteam-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableWrapperComponent implements OnInit, OnDestroy {
  public types$: Observable<IOvertype[]>;
  public hintMessage$: Observable<string>;
  public typeControl = new FormControl('', Validators.required);
  public defaultPlaceholder = 'Overtime type*';
  public option: ICommonOption<any> = { id: '', name: this.defaultPlaceholder };
  public portalArrowSvg: string = portalArrowSvg;
  public overtimeConfiguration: IOvertimeConfiguration;
  public isOnlyAndersen = false;
  public isAdditionalApproverRequired = false;
  public hintLink = '';
  public noDataMessage = 'Your overtimes list is empty';
  public linkOnWiki: string;
  public titleOfWiki = 'on wiki';
  public titleOfLink = 'Read how to submit overtimes ';

  @Input() isNullData: boolean;
  @Input() tableTitle: string;
  @Input() isPaginationConfig: boolean;
  @Input() data: any[];
  @Input() buttonName: string;

  @Output() buttonAction = new EventEmitter<void>();
  @Output() selectOvertimeType = new EventEmitter<string>();
  @Output() overtimeConfigurationEmit = new EventEmitter<IOvertimeConfiguration>();
  @Output() isOnlyAndersenEmit = new EventEmitter<boolean>();
  @Output() isAdditionalApproverRequiredEmit = new EventEmitter<boolean>();
  @Output() hintLinkEmit = new EventEmitter<string>();

  private destroy$ = new Subject<void>();

  constructor(
    private overtimeService: OvertimeService,
    private cd: ChangeDetectorRef,
    private companyService: CompanyService,
  ) { }

  public ngOnInit(): void {
    this.linkOnWiki = this.companyService.companyResourcesUrls.OverWiki;
    this.types$ = this.overtimeService.getOvertimeTypes$();
    this.hintMessage$ = this.overtimeService.getDateHintMessage$().pipe(
      map((dates: string) => this.formatDate(dates))
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onClickButton(): void {
    this.getOvertime$(this.option.id)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((configuration: IOvertimeConfiguration) => {
        this.overtimeConfiguration = configuration;
        this.overtimeConfigurationEmit.emit(this.overtimeConfiguration);
        this.isOnlyAndersenEmit.emit(this.isOnlyAndersen);
        this.isAdditionalApproverRequiredEmit.emit(this.isAdditionalApproverRequired);
        this.hintLinkEmit.emit(this.hintLink);
        this.cd.markForCheck();
        this.buttonAction.emit();
        this.typeControl.reset();
      });
  }

  public onSelectType({ id, name }: ICommonOption): void {
    this.option = { id, name };
    this.selectOvertimeType.emit(id);
  }

  public onKeyEnterUp(event: Event): void {
    this.types$
      .pipe(
        map((array: ICommonOption[]) =>
          array.map(({ id, name }: ICommonOption) => {
            if (name === (event.target as HTMLInputElement).textContent) {
              this.option = { id, name };
              this.selectOvertimeType.emit(id);
            }
          })
        ),
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private getOvertime$(id: string): Observable<IOvertimeConfiguration> {
    if (!id) {
      return null;
    }

    return this.overtimeService.getOvertimeConfiguration$(id).pipe(
      map(configuration => this.parseOvertimeConfiguration(configuration)),
      tap((response: IOvertimeConfiguration) => {
        if (response?.required) {
          this.isOnlyAndersen = this.overtimeService.isAndersenProject(response);
          this.isAdditionalApproverRequired = this.overtimeService.isAdditionalApproverRequired(response);
          this.hintLink = this.overtimeService.getHintLink(response);
        }
      })
    );
  }

  private changeFormatDate(dateLikeString: string, returnMonth?: boolean): string {
    if (returnMonth) {
      return new Date(dateLikeString).toLocaleString('en', { month: 'long' });
    }

    const date = new Date(dateLikeString);
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();

    day = Number(day) < 10 ? `0${day}` : day;
    month = Number(month) < 10 ? `0${month}` : month;

    return `${day}.${month}`;
  }

  private formatDate(dates: string): string {
    const keys = Object.keys(dates);
    const dateFor = this.changeFormatDate(dates[keys[2]], true);
    const dateFrom = this.changeFormatDate(dates[keys[0]]);
    const dateTo = this.changeFormatDate(dates[keys[1]]);

    return `Overtimes for ${dateFor}. Submit from ${dateFrom} to ${dateTo}`;
  }

  private parseOvertimeConfiguration(
    overtimeConfiguration: IOvertimeConfigurationResponse
  ): IOvertimeConfiguration {
    return {
      values: {
        ratio: overtimeConfiguration.ratioDefault,
        currency: overtimeConfiguration.defaultCurrency,
        overType: {
          name: overtimeConfiguration.name,
          id: overtimeConfiguration.id,
        },
      },
      required: {
        overTypeId: true,
        projectId: true,
        additionalApproverId: true,
        ratio: overtimeConfiguration.ratioRequired,
        hours: overtimeConfiguration.hoursRequired,
        sum: overtimeConfiguration.sumRequired,
        currency: overtimeConfiguration.currencyRequired,
        wardEmployeeId: overtimeConfiguration.wardEmployeeRequired,
        position: overtimeConfiguration.positionRequired,
        level: overtimeConfiguration.levelRequired,
        comment: overtimeConfiguration.commentRequired,
        attachment: true,
        projectAndersen: overtimeConfiguration.projectAndersen,
        projectsOther: overtimeConfiguration.projectsOther,
        hintLink: overtimeConfiguration.hintLink,
        additionalApproverRequired:
          overtimeConfiguration.additionalApproverRequired,
        currencyRestrictions: overtimeConfiguration.currencyRestrictions,
        locationSelectRequired: overtimeConfiguration.locationSelectRequired,
        location: overtimeConfiguration.location,
        jiraLink: overtimeConfiguration.jiraLink,
      },
    };
  }
}
