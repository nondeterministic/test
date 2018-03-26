const chai = require('chai');

const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

const url = process.env.SERVER_URL;

describe('/DELETE wines', () => {
  it('will yield error code 400, when attempting to delete a non-existing book.', (done) => {
    chai.request(url)
      .delete('/wines/4711')
      .end((error, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('will delete an existing wine with ID 3 and yield 200 as a return code.', (done) => {
    chai.request(url)
      .delete('/wines/3')
      .end((error, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});
