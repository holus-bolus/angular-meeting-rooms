import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICommonOption } from '@interfaces/filter';
import { ILanguagePost, ILanguages, ILanguagesLevels, IPutLanguage } from '@interfaces/languages';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly url = 'LanguageAssessment';

  constructor(private httpClient: HttpClient) { }

  public createLanguageAssessmentId$(salaryReviewId: ILanguagePost): Observable<string> {

    return this.httpClient.post<string>(this.url, salaryReviewId);
  }

  public updateLanguage$(event: ICommonOption, language: IPutLanguage): Observable<IPutLanguage> {
    const body = {
      languageId: event.id,
      level: language.level,
      comment: language.comment
    };

    return this.httpClient.put<any>(`${this.url}?id=${language.id}`, body);
  }

  public updateLanguageLevel$(event: ICommonOption, language: IPutLanguage): Observable<IPutLanguage> {
    const body = {
      languageId: language.languageId,
      level: event.name,
      comment: language.comment
    };

    return this.httpClient.put<any>(`${this.url}?id=${language.id}`, body);
  }

  public updateLanguageComment$(event: string, language: IPutLanguage): Observable<IPutLanguage> {
    const body = {
      languageId: language.languageId,
      level: language.level,
      comment: event
    };

    return this.httpClient.put<any>(`${this.url}?id=${language.id}`, body);
  }

  public deleteLanguage$(idLanguage: string): Observable<void> {
    return this.httpClient.delete<void>(this.url, {
      params: new HttpParams().set('id', idLanguage)
    });
  }

  public getLanguagesList$(): Observable<ILanguages[]> {
    return this.httpClient.get<ILanguages[]>(`${this.url}/api/languages`);
  }

  public getLanguagesLevelsList$(): Observable<ILanguagesLevels[]> {
    return this.httpClient.get<string[]>(`${this.url}/api/languageLevels`)
      .pipe(
        map((levelList: string[]) => levelList.map((level: string) => ({ name: level })))
      );
  }
}
