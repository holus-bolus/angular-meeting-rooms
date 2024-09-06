import { Injectable } from '@angular/core';
import { IOvertimePostData, Overtime, OverTypeGroup } from '@pages/overs-test/overs';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { entries } from 'lodash';

@Injectable()
export class OversService {

  constructor(private httpClient: HttpClient) {
  }

  public getOverTypes(): Observable<OverTypeGroup[]> {
    return this.httpClient.get<OverTypeGroup[]>('newovertype/get-all-over-types');
  }

  public getSelectedOver(overId: string): Observable<Overtime> {
    return this.httpClient.get<Overtime>(`newovertype/get-over-type-by-id?id=${overId}`);
  }

  public getApproverDmByProject(overId: string, projectId: string): Observable<any> {
    return this.httpClient.get<Overtime>(`newovertype/get-over-approver-dm-by-project-id?overId=${overId}&projectId=${projectId}`);
  }

  public createOver(over: IOvertimePostData): Observable<any> {
    const formData = new FormData();

    entries(over).forEach(([payloadFieldName, payloadValue]) => {
      if (payloadFieldName === 'overFiledAttachments' && payloadValue.length) {
        for (let i = 0; i < payloadValue.length; i++) {
          formData.append(`overFiledAttachments`, payloadValue[i]);
        }
      } else {
        formData.append(payloadFieldName, payloadValue);
      }
    });

    return this.httpClient.post('overfiled/send-new-over', formData);
  }

  public getSubmittedOvers(): Observable<any> {
    return this.httpClient.get('overfiled/get-my-overtime');
  }
}
