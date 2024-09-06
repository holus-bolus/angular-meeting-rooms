import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeIdService {

  constructor(private router: Router) { }

  public getEmployeeId(): string {
    return this.getIdFromParentRoute(this.router.routerState.snapshot.url);
  }

  private getIdFromParentRoute(router: string): string {
    const [, , idFromRouter] = router.split('/');

    return idFromRouter ? idFromRouter : '';
  }
}
