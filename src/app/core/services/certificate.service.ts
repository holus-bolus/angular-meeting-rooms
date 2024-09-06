import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICertificate, ICertificateData } from '@interfaces/certificates.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CertificateService {
  public isCertificateUpdated$ = new BehaviorSubject<boolean>(false);

  constructor(
    private httpClient: HttpClient
  ) { }

  public getEmployeeCertificates$(employeeId: string): Observable<ICertificateData> {
    return this.httpClient.get<ICertificateData>(`certificates/get/employee/${employeeId}`);
  }

  public updateCertificate(certificate: ICertificate): Observable<boolean> {
    return this.httpClient.put<boolean>('certificates/update-certificate', certificate);
  }

  public sendCertificateNotification({ id, employeeId }: ICertificate): Observable<boolean> {
    return this.httpClient.post<boolean>(`certificates/send-notification/${employeeId}`, { id });
  }

  public toggleCertificateUpdating(value: boolean): void {
    this.isCertificateUpdated$.next(value);
  }
}
