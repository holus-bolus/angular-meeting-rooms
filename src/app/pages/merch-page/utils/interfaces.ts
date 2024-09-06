import { ICommonOption } from '@interfaces/filter';

export interface IBuyMerchItemPayload {
  id: number;
  itemName: string;
  price: number;
}

export interface CartForm {
  products: CartFormProduct[];
}

export interface CartFormProduct {
  productId: string;
  quantity: number;
  parameters: { [key: string]: ICommonOption };
  cartId: string;
  price: number;
}
