import { Injectable } from '@angular/core';
import { IActivitiesStorage } from '@interfaces/expert-activities.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  getItem(key: string): IActivitiesStorage | null {
    return JSON.parse(sessionStorage.getItem(key));
  }

  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }
}
