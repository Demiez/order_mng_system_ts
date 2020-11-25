import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import { v4 } from 'uuid';
import app from '../../src/app';
import { User } from '../../src/models';

const user: User = {
  id: v4(),
  username: 'Bob',
  firstName: 'Bob',
  lastName: 'TestUser',
  email: 'bob@email.com',
  password: 'password',
  phone: '1111-222-333',
  userStatus: 1,
};
