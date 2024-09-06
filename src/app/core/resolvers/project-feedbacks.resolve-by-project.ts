import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { IProjectWithFeedbacks, IProjectWithFeedbacksFilter, IUniversalFeedbackData } from '@interfaces/feedback.interface';
import { FeedbackService } from '@services/feedback.service';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectFeedbacksByProjectResolve implements Resolve<{feedbacks:IUniversalFeedbackData[], hasAccessToExtendedFilter:boolean}>  {
  constructor(
    private feedbackService: FeedbackService,
  ) { }
  public resolve(route: ActivatedRouteSnapshot): Observable<{feedbacks:IUniversalFeedbackData[], hasAccessToExtendedFilter:boolean}> {
    const projectId = route.paramMap.get('projectId');

    return forkJoin({
      feedbacks: this.feedbackService.getProjectFeedbacks$(projectId),
      hasAccessToExtendedFilter: this.feedbackService.checkAccessToFopExtendedFilter$(),
      project: this.feedbackService.getProjectWithFeedbacks$(projectId),
    });
  }
}
