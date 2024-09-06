import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { IProjectWithFeedbacks } from '@interfaces/feedback.interface';
import { FeedbackService } from '@services/feedback.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectFeedbacksResolve implements Resolve<IProjectWithFeedbacks[]> {
  constructor(
    private feedbackService: FeedbackService,
  ) { }

  public resolve(): Observable<IProjectWithFeedbacks[]> {
    return this.feedbackService.getProjectWithFeedbacks$();
  }
}
