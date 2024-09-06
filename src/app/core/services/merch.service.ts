import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBuyMerchItemPayload } from '@pages/merch-page/utils/interfaces';
import { IMerchProduct } from '@interfaces/merch-item.interface';
import { OrderProduct } from '@interfaces/add-to-cart-request';
import { Order } from '@pages/merch-page/my-orders/utils/order';

@Injectable({
  providedIn: 'root',
})
export class MerchService {

  constructor(private httpClient: HttpClient) {
  }

  public getUserPoints(): Observable<{ points: number, userId: string; }> {
    return this.httpClient.get<{ points: number, userId: string; }>('userpoints');
  }

  public getProducts(): Observable<IMerchProduct[]> {
    return this.httpClient.get<IMerchProduct[]>('merch/item');
  }

  public getProduct(id: string): Observable<IMerchProduct> {
    return this.httpClient.get<IMerchProduct>(
      'merch/item/get-item-by-id',
      {
        params: {
          id,
        },
      },
    );
  }

  public getOrder(id: string): Observable<IMerchProduct> {
    return this.httpClient.get<IMerchProduct>(
      'merch/order/get-by-id',
      {
        params: {
          id,
        },
      },
    );
  }

  public addToCart(request: OrderProduct): Observable<void> {
    return this.httpClient.post<void>('merch/order/add-to-cart', request);
  }

  public getMyOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>('merch/order/get-my-orders');
  }

  public getMyCart(): Observable<IMerchProduct[]> {
    return this.httpClient.get<IMerchProduct[]>('merch/order/get-my-cart');
  }

  public applyOrder(request: OrderProduct[]): Observable<void> {
    return this.httpClient.post<void>('merch/order/apply-orders', request);
  }

  public changeOrder(request: OrderProduct[]): Observable<void> {
    return this.httpClient.put<void>('merch/order', request);
  }

  public deleteProduct(orderId: string): Observable<void> {
    const queryParams = `?orderId=${orderId}`;

    return this.httpClient.post<void>(`merch/order/delete-order${queryParams}`, null);
  }
}
