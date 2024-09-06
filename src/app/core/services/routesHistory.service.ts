import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutesHistoryService {
  private paths = new ReplaySubject<string>(2);

  public addPath(route: string): void {
    this.paths.next(route);
  }

  public getPaths(): Observable<string> {
    return this.paths.asObservable();
  }

  public getPath(urlSegments: string[]): string {
    const path = urlSegments[urlSegments.length - 1];
    const pathSegments = path.split('?');
    const isMatrixExist = pathSegments.length === 2;

    return isMatrixExist
      ? pathSegments[0]
      : path;
  }
}
