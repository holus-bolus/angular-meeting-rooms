import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICommonOption } from '@interfaces/filter';
import { map } from 'rxjs/operators';
import { IProjectApprovers, IProjectResponseDetails, IProjectRowDetails } from '@interfaces/project.interface';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private httpClient: HttpClient, private employeeService: EmployeeService) {
  }

  getProjects(projectName: string): Observable<ICommonOption[]> {
    return this.httpClient.get<ICommonOption[]>(`filter/projects`, { params: { startsWith: projectName } });
  }

  getProjectsNames(projectName: string): Observable<string[]> {
    return this.httpClient.get<ICommonOption[]>(`filter/projects`, { params: { startsWith: projectName } })
      .pipe(
        map((projects: ICommonOption[]) => projects.map(({ name }) => name))
      );
  }

  getProject(projectId: string): Observable<IProjectRowDetails> {
    return this.httpClient.get<IProjectResponseDetails>(`projects/${projectId}`)
      .pipe(
        map((response: IProjectResponseDetails) => {
          return {
            ...response,
            employees: response.employees?.map(this.employeeService.parseEmployeeRow) || [],
          };
        }),
      );
  }

  getProjectsForOvertimeType(projectName: string, overTypeId: string): Observable<ICommonOption[]> {
    return this.httpClient.get<ICommonOption[]>(`projects`, { params: { overTypeId, startsWith: projectName } });
  }

  getProjectApprovers(projectId: string, overTypeId: string): Observable<IProjectApprovers> {
    return this.httpClient.get<IProjectApprovers>(`employee/approvers`, { params: { projectId, overTypeId } });
  }
}
