import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { INewsRow } from '@interfaces/news';
import { NewsService } from '@services/portal/news.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsResolve implements Resolve<INewsRow> {

  constructor(private router: Router,
              private newsService: NewsService) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<INewsRow> {
    const id = route.paramMap.get('id');

    if (id) {
      return this.newsService.get<INewsRow>(id)
        .pipe(
          catchError(() => {
            this.router.navigate(['/404']);

            return of(null);
          })
        );
    }
  }
}
