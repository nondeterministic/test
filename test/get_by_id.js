const chai = require('chai');

const { expect } = chai;

const url = process.env.SERVER_URL;

describe('/GET(_BY_ID) wines', () => {
  it('assuming a wine with ID 1 exists, this call will return it.', (done) => {
    chai.request(url)
      .get('/wines/1')
      .end((error, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it('assuming no wine with ID 4711 exists, this call will yield error code 400 when trying to return it.', (done) => {
    chai.request(url)
      .get('/wines/4711')
      .end((error, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
});
