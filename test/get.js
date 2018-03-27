const chai = require('chai');

const chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);

const url = process.env.SERVER_URL;

describe('/GET wines', () => {
  it('always returns status 200 and the body is an array', (done) => {
    chai.request(url)
      .get('/wines')
      .end((error, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.should.be.a('array'));
        done();
      });
  });
});
