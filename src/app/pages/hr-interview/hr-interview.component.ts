import { Component, OnDestroy, OnInit } from '@angular/core';
import { IHrInterviewList } from '@interfaces/hr-interview.interface';
import { IUserInfo } from '@interfaces/userInfo.interface';
import { EmployeeService } from '@services/employee.service';
import { HrInterviewService } from '@services/hr-interview.service';
import { UserService } from '@services/user.service';
import { CompanyService } from '@services/company.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  HR_INTERVIEW_HEADER,
} from '@pages/hr-interview/hr-interview.const';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'andteam-hr-interview',
  templateUrl: './hr-interview.component.html',
  styleUrls: ['./hr-interview.component.scss'],
})
export class HrInterviewComponent implements OnInit, OnDestroy {
  public isView = false;
  public avatar: string;
  public username: string;
  public hrInterviewList$: Observable<IHrInterviewList[]>;
  public hrInterviewAnswersList: IHrInterviewList[];
  public hrInterviewListId: string;
  public isEngVersion: boolean;
  public headerText = HR_INTERVIEW_HEADER;
  public title: string;
  public mainText: string;
  public requiredText: string;

  private destroy$ = new Subject();

  constructor(
    private userService: UserService,
    private hrInterviewService: HrInterviewService,
    private employeeService: EmployeeService,
    private companyService: CompanyService,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.userService.getUserInfo$()
      .pipe(
        switchMap(({ externalId, photo }) => {
          this.avatar = `data:image/jpeg;base64,${photo}`;

          return this.employeeService.getUserInfo$(externalId);
        }),
      )
      .subscribe((userInfo: IUserInfo) => {
        this.username = userInfo.fullNameEn || userInfo.fullNameRu;
        this.hrInterviewListId = this.route.snapshot.params.id;

        switch (this.companyService.mainLanguage) {
          case 'En':
            this.isEngVersion = true;
            this.title = this.headerText.english.title;
            this.mainText = this.headerText.english.text;
            this.requiredText = this.headerText.english.mandatory;
            break;
          case 'Ru':
            this.isEngVersion = false;
            this.title = this.headerText.russian.title;
            this.mainText = this.headerText.russian.text;
            this.requiredText = this.headerText.russian.mandatory;
            break;
          default:
            throw Error('Unknow Questionnaire Page Language!');
        }
        this.hrInterviewList$ = this.hrInterviewService.getHrInterviewList$(this.hrInterviewListId);
      });
  }

  public onSendForm(hrInterviewAnswersList: IHrInterviewList[]): void {
    this.hrInterviewAnswersList = hrInterviewAnswersList;
    this.isView = true;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
