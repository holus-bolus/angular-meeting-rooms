import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { IPositionType } from '@pages/feedback/feedback.interface';
import { FeedbackService } from '@services/feedback.service';
import { forkJoin, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbackResolve implements Resolve<{positionTypes:IPositionType[], feedback:any}> {
  constructor(
    private feedbackService: FeedbackService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<{positionTypes:IPositionType[], feedback:any}> {
    const employeeId = route.paramMap.get('id');
    let feedback$ = of({});
    if (route.paramMap.get('feedbackId')) {
      const feedbackId = route.paramMap.get('feedbackId');
      feedback$ = this.feedbackService.getUniversalFeedback(feedbackId);
    }

    return forkJoin({ 
      positionTypes: this.feedbackService.getPositionTypes(employeeId), 
      feedback: feedback$,
    });
  }
}
