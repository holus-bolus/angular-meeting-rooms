export interface OrderProduct {
  id?: string; // item ID in cart
  itemId: string;
  countItems: number;
  parametersId: AddToCartParameter[];
}

export interface AddToCartParameter {
  id: string;
  parameterValueId: string;
}
