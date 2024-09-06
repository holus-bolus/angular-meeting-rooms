import { OrderStatusType } from '@pages/merch-page/my-orders/utils/order-status-type';

export interface Order {
  id: string;
  createDate: string;
  updateDate: string;
  status: OrderStatusType;
  itemId: string;
  name: string;
  price: number;
  parameters: string;
  url: string;
}
