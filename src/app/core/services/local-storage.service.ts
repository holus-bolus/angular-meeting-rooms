import { Injectable } from '@angular/core';
import { IActivitiesStorage } from '@interfaces/expert-activities.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  getItem(key: string): IActivitiesStorage | null {
    return JSON.parse(localStorage.getItem(key));
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
