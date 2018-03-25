const Wine = require("./database");
var validator = require("./validator");

function WinesController() {
    var server = this;

    server.get = function(req, res, next) {
    	Wine.find().exec(function(err, wines) {
    	    res.send(200, wines);
    	    return next();
    	});
    };

    server.post = function(req, res, next) {
	var reason_validation_failed = validator.validate(req.body);
	if (reason_validation_failed) {
            res.send(400, { error: 'VALIDATION_ERROR',
			    validation: reason_validation_failed });
	    return next();
	}
	
	Wine.find({ id: parseInt(req.body.id) }, function(err, wines) {
	    if (err) {
		console.error(err);
		res.send(400, err);
		return next();
	    }
	    
	    if (!wines || wines.length === 0) {
		let newWine = new Wine(req.body);
		newWine.save(function(err) {
		    if (err) {
			console.error(err);
			res.send(400, err);
			return next();
		    }
		});
		res.send(200);
	    }
	    else
		res.send(400, { error: 'ID_NOT_UNIQUE' });

	    return next();
	});
    };

    // TODO: If ID x is provided and we provide in the JSON ID y, where
    // y already exists, then we get twice a wine with y in the DB!
    
    server.put = function(req, res, next) {
	Wine.findOneAndUpdate({ id: parseInt(req.params.id) },
			      req.body, { new: true }, function(err, wine) {
	    if (err) {
		console.error(err);
		res.send(400, err);
		return next();
	    }

	    if (wine) {
		var reason_validation_failed = validator.validate(req.body);
		if (reason_validation_failed) {
		    res.send(400, { error: 'VALIDATION_ERROR',
				    validation: reason_validation_failed });
		}
		else
		    res.send(200, wine);		    
	    }
	    else
		res.send(400, { error: 'UNKNOWN_OBJECT' });

	    return next();
	}); 
   };

    server.getById = function(req, res, next) {
	Wine.findOne({ id: parseInt(req.params.id) }, function(err, wine) {
	    if (err) {
		console.error(err);
		res.send(400, err);
		return next();
	    }

	    if (wine)
		res.send(200, wine);
	    else
		res.send(400, { error: 'UNKNOWN_OBJECT' });

	    return next();
	});
    };
    
    server.del = function(req, res, next) {
	Wine.findOneAndRemove({ id: parseInt(req.params.id) }, function(err, wine) {
	    if (err) {
		console.error(err);
		res.send(400, err);
		return next();
	    }

	    if (wine)
		res.send(200, { success: true });
	    else
		res.send(400, { error: 'UNKNOWN_OBJECT' });
		
	    return next();
	});
    };
}

module.exports = new WinesController();
