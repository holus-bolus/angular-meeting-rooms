import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { IProjectRowDetails } from '@interfaces/project.interface';
import { ProjectService } from '@services/project.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectFeedbackResolve implements Resolve<IProjectRowDetails> {
  constructor(
    private projectService: ProjectService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<IProjectRowDetails> {
    const projectId = route.paramMap.get('projectId');

    return this.projectService.getProject(projectId);
  }
}
