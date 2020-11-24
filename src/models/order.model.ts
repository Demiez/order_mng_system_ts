import { OrderStatusesEnum } from '../enums/orderStatuses.enum';

export default interface Order {
  id: String;
  userId: Number;
  quantity: Number;
  shipDate: Date;
  status: OrderStatusesEnum;
  isComplete: Boolean;
}
