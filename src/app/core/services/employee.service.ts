import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import {
  IRequestEmployeeParams,
  IEmployeesResponse,
  IEmployeeResponse,
  ISocialNetworks,
  IEmployeeRow,
  IEmployeesRows,
  ITabsPermissions,
  IEmployeePhoto,
  IUserRole,
  IEmployee,
  IDisplayedTabs,
  IEmployeeTeammates,
  IDefaultTabPermissions,
} from '@interfaces/employee';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { ERROR_CODES } from '@constants/errors';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';
import { ICommonOption } from '@interfaces/filter';
import { IUserInfo } from '@interfaces/userInfo.interface';
import { IQuestion, IQuestionnaireResults, ISurveyButton, ISurveyResults } from '@interfaces/survey';
import { ICelebrationsButtonsRequest } from '@interfaces/send-card';
import { entries } from 'lodash';
import { employeeMock } from 'src/app/mock/employeeMock';

// TAB_KEY === url
export enum TAB_KEYS {
  PERSONAL_INFO = 'personal-info',
  OBJECTIVES = 'objectives',
  SALARY_REVIEW = 'salary-review',
  INTERVIEW = 'interview',
  FEEDBACK = 'feedback-view',
  ONE_TO_ONE = 'one-to-one',
  COORDINATES = 'coordinates',
  VACATION = 'planned-vacations',
  CERTIFICATE = 'certificates',
  FEEDBACK_ON_PROJECT = 'feedback-on-project-view'
}

// NAV title === displayed name
export const NAVS = [
  { title: 'Personal Info', active: true, key: TAB_KEYS.PERSONAL_INFO },
  { title: 'Objectives', active: false, key: TAB_KEYS.OBJECTIVES },
  { title: 'Assessment', active: false, key: TAB_KEYS.SALARY_REVIEW },
  { title: 'Interview', active: false, key: TAB_KEYS.INTERVIEW },
  { title: 'Feedback', active: false, key: TAB_KEYS.FEEDBACK },
  { title: 'One to one', active: false, key: TAB_KEYS.ONE_TO_ONE },
  { title: 'Coordinates', active: false, key: TAB_KEYS.COORDINATES },
  { title: 'Vacation', active: false, key: TAB_KEYS.VACATION },
  { title: 'Certificates', active: false, key: TAB_KEYS.CERTIFICATE },
  { title: 'Feedback on projects', active: false, key: TAB_KEYS.FEEDBACK_ON_PROJECT },
];

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  get getDefaultTabsPermission(): IDefaultTabPermissions {
    return this.DEFAULT_TABS_PERMISSIONS;
  }

  get isShowSalaryTab$(): BehaviorSubject<boolean> {
    return this.showSalaryReviewTab$;
  }

  get isShowOneToOneTab$(): BehaviorSubject<boolean> {
    return this.showOneToOneTab$;
  }

  get isShowCoordinatesTab$(): BehaviorSubject<boolean> {
    return this.showCoordinatesTab$;
  }

  get isShowVacationTab$(): BehaviorSubject<boolean> {
    return this.showVacationTab$;
  }

  get isShowCertificateTab$(): BehaviorSubject<boolean> {
    return this.showCertificateTab$;
  }

  get isShowFeedbackOnProjectTab$(): BehaviorSubject<boolean> {
    return this.showFeedbackOnProjectTab$;
  }

  private showSalaryReviewTab$ = new BehaviorSubject<boolean>(null);
  private showOneToOneTab$ = new BehaviorSubject<boolean>(null);
  private showCoordinatesTab$ = new BehaviorSubject<boolean>(null);
  private showVacationTab$ = new BehaviorSubject<boolean>(null);
  private showCertificateTab$ = new BehaviorSubject<boolean>(null);
  private showFeedbackOnProjectTab$ = new BehaviorSubject<boolean>(null);
  private tabsPermissions$: Observable<ITabsPermissions> = null;
  private displayedTabs$: Observable<IDisplayedTabs> = null;

  private DEFAULT_TABS_PERMISSIONS = {
    hasAssessments: false,
    hasFeedback: false,
    hasObjectives: false,
    hasReviews: false,
    hasOneToOne: false,
    hasCoordinate: false,
    hasVacationPlan: false,
    hasCertificates: false,
    hasFeedbackOnProject: false,
  };

  private employeeId: string;

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService,
    private router: Router
  ) { }

  public getAll(params: IRequestEmployeeParams): Observable<IEmployeesRows> {
    return this.httpClient.get<IEmployeesResponse>(`employee`, { params })
      .pipe(
        map(employeesResponse => ({
          ...employeesResponse,
          employees: employeesResponse.employees.map(this.parseEmployeeRow)
        }))
      );
  }

  public getUserInfo$(employeeId: string): Observable<IUserInfo> {
    return this.httpClient.get<IUserInfo>(`employee/${employeeId}/card`);
    // return of(employeeMock);
  }

  public getPhoto(employeeId: string): Observable<Blob> {
    return this.httpClient.get<Blob>(`employee/photothumbnail/${employeeId}`, { responseType: 'blob' as 'json' });
  }

  public saveEmployee(socialNetworks: ISocialNetworks): Observable<IEmployeeResponse> {
    return this.httpClient.put<IEmployeeResponse>(`employee`, socialNetworks);
  }

  public getEmployeeFullNames(employeeName: string): Observable<ICommonOption[]> {
    return this.httpClient.get<ICommonOption[]>(`filter/employees`, { params: { startsWith: employeeName } });
  }

  public getFullEmployeeListByName$(employeeName: string): Observable<ICommonOption[]> {
    return this.httpClient.get<ICommonOption[]>(`employee/wards`, { params: { startsWith: employeeName } });
  }

  public getEmployeeInfo(employeeName: string): Observable<IEmployeePhoto[]> {
    return this.httpClient.get<IEmployeePhoto[]>(`filter/employeepreviews`, { params: { startsWith: employeeName } });
  }

  public getRoles(): Observable<string[]> {
    return this.httpClient.get<string[]>(`filter/roles`);
  }

  public getLevels(): Observable<string[]> {
    return this.httpClient.get<string[]>(`filter/levels`);
  }

  public getCurrency(employeeId: string): Observable<string> {
    return this.httpClient.get<string>(`employee/${employeeId}/currency`);
  }

  public getTabsDataPermission$(employeeId: string): Observable<ITabsPermissions> {
    this.setEmployeeId(employeeId);

    if (this.tabsPermissions$ === null) {
      this.tabsPermissions$ = this.httpClient.get<ITabsPermissions>(`employees/${employeeId}/reviewOptions`)
        .pipe(
          catchError((error) => {
            const { code, message } = error;

            if (code === ERROR_CODES.VALIDATION_FAILED || code === ERROR_CODES.NOT_FOUND) {
              this.router.navigate(['/404']);
            } else if (code === ERROR_CODES.ACCESS_DENIED) {
              return throwError(error);
            } else {
              this.errorService.triggerError([message]);
            }

            return throwError(null);
          }),
          shareReplay(1)
        );
    }

    return this.tabsPermissions$;
  }

  public getTabData$(employeeId: string): Observable<IDisplayedTabs> {
    this.setEmployeeId(employeeId);

    if (this.displayedTabs$ === null) {
      this.displayedTabs$ = this.httpClient.get<IDisplayedTabs>(`employee/${employeeId}/showtab?employeeId=${employeeId}`)
        .pipe(
          shareReplay(1)
        );
    }

    return this.displayedTabs$;
  }

  public getUserRoles$(): Observable<IUserRole[]> {
    return this.httpClient.get<IUserRole[]>(`userroles`);
  }

  public addUserRoles$(externalId: string, userRoles: string): Observable<number> {
    return this.httpClient.post<number>('account/role', { userId: externalId, role: userRoles });
  }

  public deleteUserRoles$(externalId: string, userRoles: string): Observable<number> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        userId: externalId,
        role: userRoles
      }
    };

    return this.httpClient.delete<number>('account/role', options);
  }

  public getBackground(externalId: string): Observable<Blob> {
    return this.httpClient.get<Blob>(`backgroundimage/getbackgroundimage/${externalId}`, { responseType: 'blob' as 'json' });
  }

  public putBackground<T>(payload: FormData): Observable<T> {
    return this.httpClient.put<T>(`backgroundimage/updatebackgroundimage`, payload);
  }

  public updatePhoto(newPhoto: FormData): Observable<Blob> {
    return this.httpClient.put<Blob>(`employee/updatephoto`, newPhoto, { responseType: 'blob' as 'json' });
  }

  public changeExtraMile(employeeId: string, extramile: string): Observable<string> {
    return this.httpClient.patch<string>(`employee/${employeeId}/extramile?extramile=${extramile}`, { responseType: 'text' });
  }

  public parseEmployeeRow(
    { id, level, isWork, location, name, resourceManager, roles, userRoles, technology }: IEmployee
  ): IEmployeeRow {
    return <IEmployeeRow>{
      isWork,
      technology,
      externalId: id,
      fullNameRu: name || '',
      locationName: location || '',
      roles: roles || [],
      level: level || '',
      resourceManager: resourceManager || {},
      userRoles: userRoles || []
    };
  }

  public getTeammatesAndEmployees(id: string, value: string, searchForTeammates: boolean): Observable<IEmployeeTeammates[]> {
    return this.httpClient
      .get<IEmployeeTeammates[]>(`employee/${id}/teammatesandemployees`, {
        params: { searchForTeammates: searchForTeammates.toString(), startWith: value }
      });
  }

  public sendPostCard(cardData: { celebrationId: string, recipientIds: string[], image: File }): Observable<string> {
    const formData = new FormData();

    entries(cardData).forEach(([cardDataFieldName, cardDataValue]) => {
      if (cardDataValue instanceof Array) {
        for (let i = 0; i < cardDataValue.length; i++) {
          formData.append(cardDataFieldName, cardDataValue[i]);
        }
      } else {
        formData.append(cardDataFieldName, cardDataValue);
      }
    });

    return this.httpClient.post<string>(`celebrations/sendpostcard`, formData);
  }

  public getCelebrationsButtons$(employeeId: string): Observable<ICelebrationsButtonsRequest[]> {
    return this.httpClient.get<ICelebrationsButtonsRequest[]>(`celebrations/check/${employeeId}`);
  }

  public getCelebrationsCards$(celebrationId: string): Observable<string[]> {
    return this.httpClient.get<string[]>(`celebrations/${celebrationId}/postcards`);
  }

  public getSurveyButton(id: string): Observable<ISurveyButton[]> {
    return this.httpClient.get<ISurveyButton[]>(`questionnaires/${id}/check`);
  }

  public getSurveyQuestions(id: string): Observable<IQuestion[]> {
    return this.httpClient.get<IQuestion[]>(`questionnaires/${id}/questions`);
  }

  public sendSurvey(surveyData: ISurveyResults): Observable<any> {
    return this.httpClient.post<ISurveyResults>(`questionnaires/send`, surveyData);
  }

  public getSurveyResults(questionnaireId: string): Observable<IQuestionnaireResults> {
    return this.httpClient.get<IQuestionnaireResults>(`questionnaires/${questionnaireId}`);
  }

  private resetTabsDataPermission(): void {
    this.tabsPermissions$ = null;
  }

  private resetTabsData(): void {
    this.displayedTabs$ = null;
  }

  private setEmployeeId(id: string): void {
    if (!this.employeeId || this.employeeId !== id) {
      this.employeeId = id;
      this.resetTabsData();
      this.resetTabsDataPermission();
    }
  }
}
