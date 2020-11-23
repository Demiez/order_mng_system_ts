import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import app from '../../src/app';

chai.use(chaiHttp);

const expect = chai.expect;
chai.should();

describe('baseRoute', () => {
  it('should respond with HTTP 200 status', async () => {
    const res = await chai.request(app).get('/index');

    expect(res.status).to.be.equal(200);
  });

  it('should respond with success message', async () => {
    const res = await chai.request(app).get('/index');

    res.body.should.be.an('object');
    expect(res.body.status).to.be.equal('success');
  });
});
