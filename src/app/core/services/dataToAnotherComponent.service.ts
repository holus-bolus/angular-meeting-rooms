import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataToAnotherComponentService {
  private isBackgroundSource = new BehaviorSubject<boolean>(false);
  private employeeSourceId = new BehaviorSubject<string>('');
  private mainUserId = new BehaviorSubject<string>('');
  private isChangeTitleOfLink = new BehaviorSubject<boolean>(false);

  public get employeerSourceId(): string {
    return this.employeeSourceId.value;
  }

  public get mainExtendUserId(): string {
    return this.mainUserId.value;
  }

  public get isChangeTitleOfLinks(): boolean {
    return this.isChangeTitleOfLink.value;
  }

  public get isChangeStatusOfState(): boolean {
    return this.isBackgroundSource.value;
  }

  public set isChangeStatusOfState(state: boolean) {
    this.isBackgroundSource.next(state);
  }

  public set employeerSourceId(employeeId: string) {
    this.employeeSourceId.next(employeeId);
  }

  public set mainExtendUserId(mainId: string) {
    this.mainUserId.next(mainId);
  }

  public set isChangeTitle(flag: boolean) {
    this.isChangeTitleOfLink.next(flag);
  }
}
