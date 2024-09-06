import { OvertimeConfiguration } from './../../../pages/overtime/models/overtime-configuration';
import { Injectable } from '@angular/core';
import {
  IOvertimeResponse,
  IOvertimeConfiguration,
  IOvertimeConfigurationResponse,
  IOvertimePayload, IOvertime, IOvertimeForEditing
} from '@interfaces/overtime.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOverviewShort } from '@interfaces/overview.interface';
import { ICommonOption } from '@interfaces/filter';
import { entries } from 'lodash';
import { map } from 'rxjs/operators';
import { OVERTIME_DETAIL } from '@constants/overtime.const';
import { OvertimeForEditing } from '@pages/overtime/models/overtime-for-editing';
import { CompanyService } from '@services/company.service';

@Injectable({
  providedIn: 'root'
})
export class OvertimeService {
  constructor(
    private httpClient: HttpClient,
    private companyService: CompanyService) {
  }

  public cutString(text: string, maxStrLength: number): string {
    return text.substring(0, maxStrLength) + (text.length > maxStrLength ? '...' : '');
  }

  public getOvertimes$(): Observable<IOverviewShort[]> {
    return this.httpClient.get<IOverviewShort[]>(`overs`);
  }

  public getOvertime$(overtimeId: string): Observable<IOvertime> {
    return this.httpClient.get<IOvertimeResponse>(`overs/${overtimeId}`)
      .pipe(
        map((overtime: IOvertimeResponse) => ({
          ...overtime,
          overType: new OvertimeConfiguration(overtime.overType)
        })),
      );
  }

  public getOvertimeForEditing$(overtimeId: string): Observable<IOvertimeForEditing> {
    return this.httpClient.get<IOvertimeResponse>(`overs/${overtimeId}`).pipe(
      map(overtime => new OvertimeForEditing(overtime))
    );
  }

  public getAttachmentAsUrl$(overAttachmentId: string): Observable<string> {
    return this.getAttachment$(overAttachmentId).pipe(map(attachment => URL.createObjectURL(attachment)));
  }

  public getAttachment$(overAttachmentId: string): Observable<Blob> {
    return this.httpClient.get<Blob>(`overs/attachment?overAttachmentId=${overAttachmentId}`, { responseType: 'blob' as 'json' });
  }

  public getOvertimeTypes$(): Observable<ICommonOption[]> {
    return this.httpClient.get<ICommonOption[]>('overtypes');
  }

  public getOvertimeConfiguration$(typeId: string, locationId?: string): Observable<IOvertimeConfigurationResponse> {
    const location = locationId
      ? `?locationId=${locationId}`
      : '';

    return this.httpClient.get<IOvertimeConfigurationResponse>(`overtypes/${typeId}${location}`);
  }

  public getParsedOvertimeConfiguration$(typeId: string, locationId?: string): Observable<IOvertimeConfiguration> {
    return this.getOvertimeConfiguration$(typeId, locationId).pipe(
      map((configuration: IOvertimeConfigurationResponse) => new OvertimeConfiguration(configuration))
    );
  }

  public addOvertime$(overtimePayload: IOvertimePayload): Observable<void> {
    const formData = new FormData();

    entries(overtimePayload).forEach(([payloadFieldName, payloadValue]) => {
      if (payloadFieldName === 'attachments' && payloadValue.length) {
        for (let i = 0; i < payloadValue.length; i++) {
          formData.append(`attachments`, payloadValue[i].file);
        }
      } else {
        formData.append(payloadFieldName, payloadValue);
      }
    });

    return this.httpClient.post<void>('overs', formData);
  }

  public editOvertime$(overtimeId: string, overtimePayload: IOvertimePayload): Observable<void> {
    const formData = new FormData();

    overtimePayload.attachments.forEach((attach) => {
      if (attach.isRemoved) {
        formData.append('deleteAttachments', attach.id);
      } else if (!attach.id) {
        formData.append('attachments', attach.file);
      }
    });
    delete overtimePayload.attachments;

    entries(overtimePayload).forEach(([payloadFieldName, payloadValue]) => {
      if (payloadValue) {
        formData.append(payloadFieldName, payloadValue);
      }
    });

    return this.httpClient.put<void>(`overs/${overtimeId}`, formData);
  }

  public deleteOvertime$(overtimeId: string): Observable<void> {
    return this.httpClient.delete<void>(`overs/${overtimeId}`);
  }

  public getDateHintMessage$(): Observable<string> {
    return this.httpClient.get<string>('periods/current');
  }

  public isAdditionalApproverRequired(overtime: IOvertimeConfiguration): boolean {
    return overtime.required.additionalApproverRequired;
  }

  public isAndersenProject(overtime: IOvertimeConfiguration): boolean {
    return !(overtime.required.projectAndersen && !overtime.required.projectsOther);
  }

  public getHintLink(overtime: IOvertimeConfiguration): string {
    let str = '';
    if (overtime.values.overType.id === OVERTIME_DETAIL.REF_PROGRAM_ID) {
      str = `https://wiki.${this.companyService.companyUrl}${OVERTIME_DETAIL.REF_PROGRAM_HINT_LINK}`;
    } else if (overtime.required.hintLink !== undefined) {
      str = overtime.required.hintLink;
    } else {
      str = '';
    }

    return str;
  }
}
