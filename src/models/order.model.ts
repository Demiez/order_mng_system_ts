import { OrderStatusesEnum } from '../enums/orderStatuses.enum';

export interface Order {
  id: string;
  userId: number;
  quantity: number;
  shipDate: Date;
  status: OrderStatusesEnum;
  isCompleted: boolean;
}
