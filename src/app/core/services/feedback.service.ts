import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ActiveStatus,
  IExternalFeedbackPostData,
  IFeedbackData,
  IFeedbackInfo,
  IFeedbackPostData,
  IFeedbackRequestData,
  IFeedbackValueData,
  IProjectFeedbackData,
  IProjectFeedbackValueData,
  IProjectWithFeedbacks,
  IProjectWithFeedbacksFilter,
  IUniversalFeedbackData,
} from '@interfaces/feedback.interface';
import { Observable } from 'rxjs';
import { FEEDBACK_SKILLS, FEEDBACK_SKILLS_HR, FEEDBACK_SKILLS_RM, FEEDBACK_SKILLS_SRM, PROJECT_FEEDBACK_SKILLS } from '@pages/feedback/feedback-const';
import { ICommonOption } from '@interfaces/filter';
import { IPositionType } from '@pages/feedback/feedback.interface';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  public hasAccessToFop$: Observable<boolean>;
  public hasAccessToFopExtendedFilter$: Observable<boolean>;
  private readonly url = 'feedbacks';
  private readonly externalUrl = 'feedbackexternals';
  private readonly universalUrl = 'universalfeedback';
  private readonly projectUrl = 'projectfeedback';

  constructor(
    private httpClient: HttpClient,
  ) { }

  public createUniversalFeedback(feedbackPostData: IUniversalFeedbackData): Observable<string> {
    return this.httpClient.post<string>(`${this.universalUrl}/createFeedbackByUser`, feedbackPostData,
                                        { headers: { 'content-type': 'application/json-patch+json' } });
  }

  public saveUniversalFeedback(feedbackPostData: IUniversalFeedbackData): Observable<string> {
    return this.httpClient.post<string>(`${this.universalUrl}/saveFeedback`, feedbackPostData,
                                        { headers: { 'content-type': 'application/json-patch+json' } });
  }

  public getFeedbacksByUserId$(id: string): Observable<IFeedbackData> {
    return this.httpClient.get<IFeedbackData>(`${this.url}?employeeId=${id}`);
  }

  public getUniverslFeedbacksByUserId$(id: string): Observable<IUniversalFeedbackData[]> {
    return this.httpClient.get<IUniversalFeedbackData[]>(`${this.universalUrl}/getUserFeedbacks?id=${id}`);
  }

  public getProjectFeedbacksByUserId$(): Observable<IUniversalFeedbackData[]> {
    return this.httpClient.get<IUniversalFeedbackData[]>(`${this.projectUrl}/getUserProjectFeedbacks`);
  }

  public getProjectWithFeedbacks$(projectId?: string): Observable<IProjectWithFeedbacks[]> {
    let params = new HttpParams();
    if (typeof(projectId) !== 'undefined' && projectId !== null && projectId !== '') {
      params = params.set('projectId', projectId);
    }

    return this.httpClient.get<IProjectWithFeedbacks[]>(`${this.projectUrl}/getProjectWithFeedbacks`, { params })
      .pipe(map(p => p.map(project =>
        ({
          ...project,
          status: project.project.isActive ? ActiveStatus.active : ActiveStatus.closed,
          lastFeedbackDate: Date.parse(project.lastFeedback),
        }),
      )));
  }

  public getProjectFeedbacks$(projectId: string, filter?: IProjectWithFeedbacksFilter): Observable<IUniversalFeedbackData[]> {
    const params = this.getProjectFeedbackParams(filter);

    return this.httpClient.get<IUniversalFeedbackData[]>(
      `${this.projectUrl}/getProjectFeedbacks?projectid=${projectId}`,
      { params },
    );
  }

  public getExelReport$(projectIds: string[], filter?: IProjectWithFeedbacksFilter): Observable<string> {
    const projectIdsParam = projectIds.map(p => `projectIds=${p}`);
    const params = this.getProjectFeedbackParams(filter);

    return this.httpClient.get<Blob>(
      `${this.projectUrl}/getExelReport?${projectIdsParam.join('&')}`,
      { params, responseType: 'blob' as 'json' }).pipe(map(attachment => URL.createObjectURL(attachment)));
  }

  public postProjectFeedback$(feedbackPostData: IProjectFeedbackData): Observable<string> {
    return this.httpClient.post<string>(`${this.projectUrl}/create`, feedbackPostData,
                                        { headers: { 'content-type': 'application/json-patch+json' } });
  }

  public setProjectFeedbackValue$ (feedbackValueData: IProjectFeedbackValueData): Observable<string> {
    return this.httpClient.put<string>(`${this.projectUrl}/setValuable`, feedbackValueData);
  }

  public getInfo(id: string): Observable<IFeedbackInfo> {
    return this.httpClient.get<IFeedbackInfo>(`${this.url}/createinfo?employeeId=${id}`);
  }

  public postFeedback$(feedbackPostData: IFeedbackPostData): Observable<string> {
    return this.httpClient.post<string>(this.url, feedbackPostData,
                                        { headers: { 'content-type': 'application/json-patch+json' } });
  }

  public setFeedbackValue$(feedbackValueData: IFeedbackValueData): Observable<string> {
    return this.httpClient.post<string>(`${this.url}/feedbackvalue`, feedbackValueData);
  }

  public setExternalFeedbackValue$(feedbackValueData: IFeedbackValueData): Observable<string> {
    return this.httpClient.post<string>(`${this.externalUrl}/feedbackvalue`, feedbackValueData);
  }

  public getFeedbackSkillName(key: string, positionType?: string): string {
    let skills;
    switch (positionType) {
      case 'ResourсeManagement':
        skills = FEEDBACK_SKILLS_RM;
        break;
      case 'HumanResources':
        skills = FEEDBACK_SKILLS_HR;
        break;
      case 'RMsCoordinates':
        skills = FEEDBACK_SKILLS_SRM;
        break;
      case 'Project':
        skills = PROJECT_FEEDBACK_SKILLS;
        break;
      default:
        skills = FEEDBACK_SKILLS;
        break;
    }
    const feedBackSkill = skills.find(name => name.skill === key);

    return feedBackSkill ? feedBackSkill.name : '';
  }

  public sendFeedbackRequest(employeeId: string, receiverIds: string[]): Observable<IFeedbackRequestData> {
    return this.httpClient.post<IFeedbackRequestData>(
      `${this.url}/request`,
      { employeeId, receiverIds },
      { headers: { 'content-type': 'application/json-patch+json' } });
  }

  public getExternalFeedbackLink(externalFeedbackPostData: IExternalFeedbackPostData): Observable<string> {
    return this.httpClient.post<string>(`${this.externalUrl}/request`, externalFeedbackPostData);
  }

  public getExternalFeedbackUserData(externalId: string): Observable<IFeedbackInfo> {
    return this.httpClient.get<IFeedbackInfo>(`${this.externalUrl}/createinfo?requestId=${externalId}`);
  }

  public postExternalFeedback$(feedbackPostData: IFeedbackPostData): Observable<string> {
    return this.httpClient.post<string>(`${this.externalUrl}/createfeedback`, feedbackPostData,
                                        { headers: { 'content-type': 'application/json-patch+json' } });
  }

  public getFeedbacksProjects$(employeeId: string, isExternal: string): Observable<ICommonOption[]> {
    return this.httpClient.get<ICommonOption[]>(
      `projects/${employeeId}/getprojects`,
      {
        params: { external: isExternal },
      });
  }

  public getPositionTypes(employeeId: string): Observable<IPositionType[]> {
    return this.httpClient.get<IPositionType[]>(`${this.url}/positionTypes?employeeId=${employeeId}`);
  }

  public getUniversalFeedback(feedbackId: string): Observable<IUniversalFeedbackData> {
    return this.httpClient.get<any>(`${this.universalUrl}/getFeedbackById?id=${feedbackId}`);
  }

  public getRecomendedFeedbackType$(emId: string): Observable<string> {
    return this.httpClient.get<string>(`${this.universalUrl}/getRecommendedFeedbackType` +
      `?empId=${emId}`);
  }

  public checkAccessToFopPage$(): Observable<boolean> {
    if (!this.hasAccessToFop$) {
      this.hasAccessToFop$ = this.httpClient
        .get<boolean>(`${this.projectUrl}/haveAccessToFeedbackResultTab`)
        .pipe(
          shareReplay(1),
        );
    }

    return this.hasAccessToFop$;
  }

  public checkAccessToFopExtendedFilter$(): Observable<boolean> {
    if (!this.hasAccessToFopExtendedFilter$) {
      this.hasAccessToFopExtendedFilter$ = this.httpClient
        .get<boolean>(`${this.projectUrl}/haveAccessToFeedbackResultTabWithExtendedFilter`)
        .pipe(
          shareReplay(1),
        );
    }

    return this.hasAccessToFopExtendedFilter$;
  }

  private getProjectFeedbackParams(filter?: IProjectWithFeedbacksFilter): HttpParams {
    let params = new HttpParams();

    if (filter) {
      if (typeof(filter.sortByRate) !== 'undefined') {
        params = params.set('sortByRate', filter.sortByRate.toString());
      }
      if (typeof(filter.valuableFilter) !== 'undefined') {
        params = params.set('valuable', filter.valuableFilter.toString());
      }
      if (typeof(filter.isGood) !== 'undefined') {
        params = params.set('isGood', filter.isGood.toString());
      }
      if (typeof(filter.fromDate) !== 'undefined') {
        params = params.set('fromDate', filter.fromDate);
      }
      if (typeof(filter.toDate) !== 'undefined') {
        params = params.set('toDate', filter.toDate);
      }
    }

    return params;
  }
}
