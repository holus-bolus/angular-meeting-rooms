import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TEAM_API, PORTAL_API, ASSESSMENT_API } from '../../../../appConfigs/config';
import { ENTITY_NAMES } from '../../../../appConfigs/entities';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const host = this.getUrl(request.url);
    const url = `${host}/${request.url}`;

    request = request.clone({ url });

    return next.handle(request);
  }

  private getUrl(url: string): string {
    const entityName = url.split('/')[0].split('?')[0];
    const standName = Object
      .keys(ENTITY_NAMES)
      .find(entity => ENTITY_NAMES[entity].includes(entityName));

    switch (standName) {
      case 'Team':
        return TEAM_API;
      case 'Portal':
        return PORTAL_API;
      case 'Assessment':
        return ASSESSMENT_API;
    }
  }
}
