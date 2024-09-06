import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {

  constructor(private httpClient: HttpClient) { }

  sendMatrixToInterviewer(assessmentId: string): Observable<void> {
    return this.httpClient.post<void>(`assessments/${assessmentId}/enableInterviewerMatrix`, assessmentId);
  }

  checkMatrix(matrixId: string): Observable<void> {
    return this.httpClient.post<void>(`matrix/${matrixId}/complete`, {});
  }
}
