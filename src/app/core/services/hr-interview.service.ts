import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHrInterviewList } from '@interfaces/hr-interview.interface';
import { Observable } from 'rxjs';

@Injectable()
export class HrInterviewService {
  constructor(private httpClient: HttpClient) { }

  public getHrInterviewList$(questionnaireId: string): Observable<IHrInterviewList[]> {
    return this.httpClient.get<IHrInterviewList[]>(`questionnaires/${questionnaireId}/questions`);
  }

  public sendHrInterviewAnswers(formFile: File, questionnaireId: string): Observable<void> {
    const formData = new FormData();

    formData.append('QuestionnaireId', questionnaireId);
    formData.append('formFile', formFile);

    return this.httpClient.post<void>('questionnaires/send', formData);
  }
}
