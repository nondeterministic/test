const chai = require('chai');

const should = chai.should();

const url = process.env.SERVER_URL;

describe('/POST wines', () => {
  const wine = {
    id: 1,
    name: 'Cabernet sauvignon',
    year: 2013,
    country: 'France',
    type: 'red',
    description: 'Similar to merlot',
  };

  it('is able to create a wine with ID 1 in the empty database', (done) => {
    chai.request(url)
      .post('/wines')
      .send(wine)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('...but not a second time! (cannot commit twice the same ID)', (done) => {
    chai.request(url)
      .post('/wines')
      .send(wine)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('...and not a wine WITHOUT ID', (done) => {
    const wineWithoutId = {
      name: 'House white',
      year: 1965,
      country: 'Brasil',
      type: 'white',
      description: 'Similar to merlot',
    };

    chai.request(url)
      .post('/wines')
      .send(wineWithoutId)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('...and not a wine with WRONG type', (done) => {
    const wineWithoutId = {
      id: 4711,
      name: 'House white',
      year: 1965,
      country: 'Brasil',
      type: 'radler',
      description: 'Similar to merlot',
    };

    chai.request(url)
      .post('/wines')
      .send(wineWithoutId)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('is able to add another wine with ID 2 to database.', (done) => {
    wine.id = 2;
    chai.request(url)
      .post('/wines')
      .send(wine)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('is able to add another wine with ID 3 to database - that has NO description.', (done) => {
    const wineWithoutDescription = {
      id: 3,
      name: 'House white',
      year: 1965,
      country: 'Brasil',
      type: 'white',
    };

    chai.request(url)
      .post('/wines')
      .send(wineWithoutDescription)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
