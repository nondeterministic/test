const db = require('./database');

const WineModel = db.WineModel;
const validator = require('./validator');

function WinesController() {
  const server = this;

  server.get = (req, res, next) => {
    WineModel.find().exec((err, wines) => {
      res.send(200, wines);
      return next();
    });
    return next();
  };

  server.post = (req, res, next) => {
    const reasonValidationFailed = validator.validate(req.body);
    if (reasonValidationFailed) {
      res.send(400, { error: 'VALIDATION_ERROR', validation: reasonValidationFailed });
      return next();
    }

    WineModel.find({ id: parseInt(req.body.id) }, (err, wines) => {
      if (err) {
        console.error(err);
        res.send(400, err);
        return next();
      }

      if (!wines || wines.length === 0) {
        const newWine = new WineModel(req.body);
        newWine.save((error) => {
          if (error) {
            console.error(error);
            res.send(400, error);
            return next();
          }
          return next();
        });
        res.send(200);
      } else {
        res.send(400, { error: 'ID_NOT_UNIQUE' });
      }

      return next();
    });

    return next();
  };

  // TODO: If ID x is provided and we provide in the JSON ID y, where
  // y already exists, then we get twice a wine with y in the DB!

  server.put = (req, res, next) => {
    WineModel.findOneAndUpdate({ id: parseInt(req.params.id) }, req.body, { new: true }, (err, wine) => {
      if (err) {
        console.error(err);
        res.send(400, err);
        return next();
      }

      if (wine) {
        const reasonValidationFailed = validator.validate(req.body);
        if (reasonValidationFailed) {
          res.send(400, { error: 'VALIDATION_ERROR', validation: reasonValidationFailed });
        } else {
          res.send(200, wine);
        }
      } else {
        res.send(400, { error: 'UNKNOWN_OBJECT' });
      }

      return next();
    });
  };

  server.getById = (req, res, next) => {
    WineModel.findOne({ id: parseInt(req.params.id) }, (err, wine) => {
      if (err) {
        console.error(err);
        res.send(400, err);
        return next();
      }

      if (wine) {
        res.send(200, wine);
      } else {
        res.send(400, { error: 'UNKNOWN_OBJECT' });
      }

      return next();
    });
  };

  server.del = (req, res, next) => {
    WineModel.findOneAndRemove({ id: parseInt(req.params.id) }, (err, wine) => {
      if (err) {
        console.error(err);
        res.send(400, err);
        return next();
      }

      if (wine) {
        res.send(200, { success: true });
      } else {
        res.send(400, { error: 'UNKNOWN_OBJECT' });
      }

      return next();
    });
  };
}

module.exports = new WinesController();
