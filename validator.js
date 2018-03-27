module.exports.validate = (body) => {
  let notValid = false;
  const validation = {};
  const validTypes = ['red', 'rose', 'white'];

  if (!body.id) {
    validation.id = 'MISSING';
    notValid = true;
  }

  if (!body.name) {
    validation.name = 'MISSING';
    notValid = true;
  }

  if (!body.year) {
    validation.year = 'MISSING';
    notValid = true;
  } else if (Number.isNaN(body.year)) {
    validation.year = 'INVALID';
    notValid = true;
  }

  if (!body.country) {
    validation.country = 'MISSING';
    notValid = true;
  }

  if (!body.type) {
    validation.type = 'MISSING';
    notValid = true;
  } else if (!validTypes.includes(body.type)) {
    validation.type = 'INVALID';
    notValid = true;
  }

  if (notValid) {
    return validation;
  }

  return null;
};
