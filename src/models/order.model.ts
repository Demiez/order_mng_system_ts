import { OrderStatusesEnum } from '../enums/orderStatuses.enum';

export default interface Order {
  id: string;
  userId: number;
  quantity: number;
  shipDate: Date;
  status: OrderStatusesEnum;
  isComplete: boolean;
}
