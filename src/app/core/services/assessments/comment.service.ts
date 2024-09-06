import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalaryService } from './salary.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient,
              private salaryService: SalaryService) { }

  setComment(id: string, comment: string, type: 'coordinator' | 'salary'): Observable<void> {
    switch (type) {
      case 'salary':
        const salaryComment = comment;

        return this.salaryService.updateSalary(id, { salaryComment });
      case 'coordinator':
      default:
        return this.httpClient.post<void>(`reviews/${id}/updateComment`, { coordinatorComment: comment });
    }
  }
}
