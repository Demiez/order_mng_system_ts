import * as chai from 'chai';
import 'chai/register-should';
import chaiHttp = require('chai-http');
import 'mocha';
import { v4 } from 'uuid';
import app from '../../src/app';
import { User } from '../../src/models';

const user01: User = {
  id: v4(),
  username: 'Bob',
  firstName: 'Bob',
  lastName: 'TestUser',
  email: 'bob@email.com',
  password: 'password',
  phone: '1111-222-333',
  userStatus: 1,
};

const validateUser = (user: User) => {
  user.should.have.property('id');
  user.id.should.be.a('String');

  user.should.have.property('username');
  user.username.should.be.a('String');

  user.should.have.property('firstName');
  user.firstName.should.be.a('String');

  user.should.have.property('lastName');
  user.lastName.should.be.a('String');

  user.should.have.property('email');
  user.email.should.be.a('String');

  user.should.have.property('password');
  user.password.should.be.a('String');

  user.should.have.property('phone');
  user.phone.should.be.a('String');

  user.should.have.property('userStatus');
  user.phone.should.be.a('Number');
};

const sendRequestGetUserById = async (userId: string) =>
  chai
    .request(app)
    .get(`/users/${userId}`)
    .catch((err) => {
      if (err.response) {
        return err.response as Response;
      } else {
        throw err;
      }
    });

describe(':: userRoute', () => {
  it('should respond with HTTP 404 status because there is no user', async () => {
    const res = await sendRequestGetUserById(user01.id);

    res.should.be.equal(404);
  });

  it('should create a new user and retrieve it back', async () => {
    const res = await chai
      .request(app)
      .post('/users/')
      .send(user01)
      .catch((err) => {
        if (err.response) {
          return err.response as Response;
        } else {
          throw err;
        }
      });

    res.status.should.be.equal(201);
    res.body.should.be.an('object');
    validateUser(res.body);
    res.body.username.should.be.equal(user01.username);
  });

  it('should return previously created user', async () => {
    const res = await sendRequestGetUserById(user01.id);

    res.status.should.be.equal(200);
    res.body.should.be.an('object');
    validateUser(res.body);
    res.body.id.should.be.equal(user01.id);
  });

  it('should updated mocked user01', async () => {
    user01.username = 'Bob Updated';
    user01.firstName = 'Bob Updated';
    user01.lastName = 'TestUser Updated';
    user01.email = 'bob_updated@email.com';
    user01.password = 'password_updated';
    user01.phone = '4444-000-000';
    user01.userStatus = 12;

    const res = await chai
      .request(app)
      .patch(`/users/${user01.id}`)
      .send(user01)
      .catch((err) => {
        if (err.response) {
          return err.response as Response;
        } else {
          throw err;
        }
      });

    res.status.should.be.equal(204);
    res.body.should.be.an('object');
    validateUser(res.body);
  });
});
