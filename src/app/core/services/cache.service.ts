import { Injectable } from '@angular/core';

export interface ICacheValue {
  image: string | ArrayBuffer;
  lastRead: number;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, ICacheValue>();

  public get(id: string): ICacheValue {
    return this.cache.get(id);
  }

  public set(id: string, value: ICacheValue): void {
    this.cache.set(id, value);
  }
}


