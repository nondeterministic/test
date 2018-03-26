const chai = require('chai');

const should = chai.should();

const url = process.env.SERVER_URL;

describe('/PUT wines', () => {
  const wine = {
    id: 1,
    name: 'Cabernet sauvignon',
    year: 2013,
    country: 'France',
    type: 'red',
    description: 'Similar to merlot (AFTER PUT!)',
  };

  it('overwrites description of wine with ID 1.', (done) => {
    chai.request(url)
      .put('/wines/1')
      .send(wine)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('it wont let you change an ID to one that already exists in the database.', (done) => {
    // We change the ID of wine #1 to 2!  This is naughty!
    wine.id = 2;
    chai.request(url)
      .put('/wines/1')
      .send(wine)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it doesnt let you update a non-existing wine.', (done) => {
    chai.request(url)
      .put('/wines/4711')
      .send(wine)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
