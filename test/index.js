const db = require('../database');

before(() => {
  db.drop();
});

describe('REST-API', () => {
  require('./get');
  require('./post');
  require('./get_by_id');
  require('./put');
  require('./delete');
});
