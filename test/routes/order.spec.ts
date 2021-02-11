import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import 'chai/register-should';
import app from '../../src/app';
import { Order } from '../../src/models';
import { OrderStatusesEnum } from '../../src/enums/orderStatuses.enum';
import { v4 } from 'uuid';

chai.use(chaiHttp);

const order: Order = {
  id: v4(),
  userId: 20,
  quantity: 1,
  shipDate: new Date(),
  status: OrderStatusesEnum.Placed,
  isCompleted: false,
};

const validateOrder = (orderData: Order) => {
  orderData.should.have.property('id');
  orderData.id.should.be.a('string');

  orderData.should.have.property('userId');
  orderData.userId.should.be.a('number');

  orderData.should.have.property('quantity');
  orderData.quantity.should.be.a('number');

  orderData.should.have.property('shipDate');
  orderData.shipDate.should.be.a('date');

  orderData.should.have.property('status');
  orderData.status.should.be.a('string');
  orderData.status.should.be.oneOf(Object.values(OrderStatusesEnum));

  orderData.should.have.property('isCompleted');
  orderData.isCompleted.should.be.a('boolean');
};

const sendRequestGetOrderById = (orderId: string) =>
  chai
    .request(app)
    .get(`/store/orders/${orderId}`)
    .catch((err) => {
      if (err.response) {
        return err.response as Response;
      } else {
        throw err;
      }
    });

const sendRequestDeleteOrderById = (orderId: string) =>
  chai
    .request(app)
    .del(`/store/orders/${orderId}`)
    .catch((err) => {
      if (err.response) {
        return err.response as Response;
      } else {
        throw err;
      }
    });

describe(':: orderRoute', () => {
  it('should respond with status 404 if there is no order', async () => {
    const res = await sendRequestGetOrderById(order.id);

    res.should.be.an('object');
    res.status.should.be.equal(404);
  });

  it('should create new order and get it back', async () => {
    const res = await chai
      .request(app)
      .post('/store/orders')
      .send(order)
      .catch((err) => {
        if (err.response) {
          return err.response as Response;
        } else {
          throw err;
        }
      });

    res.should.be.an('object');
    res.status.should.be.equal(201);
    validateOrder(res.body);
    res.body.userId.should.be.equal(order.userId);
    res.body.isCompleted.should.be.equal(false);
    order.id = res.body.id;
  });

  it('should return the order created on the previous step', async () => {
    const res = await sendRequestGetOrderById(order.id);

    res.status.should.be.equal(200);
    validateOrder(res.body);
    res.body.id.should.be.equal(order.id);
    res.body.status.should.be.equal(order.status);
  });

  it('should return the inventory for all users', async () => {
    const res = await chai
      .request(app)
      .get('/store/inventory')
      .catch((err) => {
        if (err.response) {
          return err.response as Response;
        } else {
          throw err;
        }
      });

    res.status.should.be.equal(200);
    res.body.should.be.an('array');
    res.body[20].length.should.be.equal(1);
  });

  it('should remove an existing order', async () => {
    const res = await sendRequestDeleteOrderById(order.id);

    res.status.should.be.equal(204);
  });

  it('should return 404 when trying to remove non-existing order', async () => {
    const res = await sendRequestDeleteOrderById(order.id);

    res.status.should.be.equal(404);
  });
});
