import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { FeedbackService } from '@services/feedback.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjectFeedbackGuard implements CanActivate {
  constructor(
    private router: Router,
    private feedbackService: FeedbackService) {
  }

  canActivate(): Observable<boolean> {
    return this.feedbackService.checkAccessToFopPage$().pipe(
        tap((isAllowed) => {
          if (!isAllowed) {
            this.router.navigateByUrl('/403');
          }
        }),
    );
  }
}
