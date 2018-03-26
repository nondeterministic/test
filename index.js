const restify = require('restify');
const wines = require('./wines');

const port = process.env.PORT || 3000;

const server = restify.createServer({
  name: 'simple server',
});

server.use((req, res, next) => {
  console.log(`${req.method}  ${req.url}`);
  return next();
});

server.use(restify.plugins.bodyParser());

server.get('/wines', wines.get);
server.get('/wines/:id', wines.getById);
server.post('/wines', wines.post);
server.put('/wines/:id', wines.put);
server.del('/wines/:id', wines.del);

// TODO: React to unhandled errors!
server.on('uncaughtException', (req, res, route, err) => {
  console.error(err.stack);
  res.send(err);
});

server.listen(port, () => {
  console.log('rest server up and running!');
});
