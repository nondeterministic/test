exports.validate = function(body) {
    var not_valid = false;
    var validation = {};
    var valid_types = [ "red", "rose", "white" ];

    if (!body.id) {
	validation.id = "MISSING";
	not_valid = true;
    }
    
    if (!body.name) {
        validation.name = "MISSING";
        not_valid = true;
    }

    if (!body.year) {
        validation.year = "MISSING";
        not_valid = true;
    }
    else if (isNaN(body.year)) {
        validation.year = "INVALID";
        not_valid = true;
    }

    if (!body.country) {
        validation.country = "MISSING";
        not_valid = true;
    }

    if (!body.type) {
        validation.type = "MISSING";
        not_valid = true;
    }
    else if (!valid_types.includes(body.type)) {
        validation.type = "INVALID";
        not_valid = true;
    }

    if (not_valid)
        return validation;
};
