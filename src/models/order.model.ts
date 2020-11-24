import { OrderStatusesEnum } from '../enums/orderStatuses.enum';

export default interface IOrder {
  id: Number;
  userId: Number;
  quantity: Number;
  shipDate: Date;
  status: OrderStatusesEnum;
  isComplete: Boolean;
}
