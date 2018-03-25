var restify = require("restify"),
    wines = require("./wines"),
    port = process.env.PORT || 3000;

const Wine = require("./database");

var server = restify.createServer({
    name: 'simple server'
});

server.use(function(req, res, next) {
    console.log(req.method, + ' ' + req.url);
    return next();
});

server.use(restify.plugins.bodyParser());

server.get("/wines", wines.get);
server.get("/wines/:id", wines.getById);
server.post("/wines", wines.post);
server.put("/wines/:id", wines.put);
server.del("/wines/:id", wines.del);

// https://medium.com/@nparsons08/in-depth-guide-on-building-a-rest-api-with-node-js-restify-mongodb-a8e92efbb50f
server.on('uncaughtException', (req, res, route, err) => {
    console.error(err.stack)
    res.send(err)
});

server.listen(port, function() {
    console.log('rest server up and running!')
});
