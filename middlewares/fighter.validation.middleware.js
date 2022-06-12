const { fighter } = require('../models/fighter');

const createFighterValid = (req, res, next) => {
  try {
    const msg = 'Invalid input';
    const { power, defense, name } = req.body;

    if (!power || !defense || !name) throw new Error(msg);

    if (req.body?.id) throw new Error('Id present');

    Object.keys(req.body).forEach((item) => {
      if (!fighter.hasOwnProperty(item)) throw new Error('Redundant property');
    });

    if (power < 1 || power > 100) throw new Error(msg);
    if (defense < 1 || defense > 10) throw new Error(msg);
    if (!req.body.health) req.body.health = 100;
    if (req.body.health < 80 || req.body.health > 120) throw new Error(msg);
  } catch (err) {
    res.error = true;
    res.is400 = true;
    res.message = err.message;
  }
  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during update
  try {
    const body = req.body;
    const msg = 'Invalid input';
    if (!!body?.id) throw new Error('Id should not be here');
    const fighterSchema = Object.keys(fighter);
    const bodyKeys = Object.keys(body);
    bodyKeys.forEach((key) => {
      if (!fighterSchema.includes(key)) throw new Error('Unexpected property');
      switch (key) {
        case 'health':
          if (body.health < 80 || body.health > 120) throw new Error(msg);
          break;
        case 'power':
          if (body.power < 1 || body.power > 100) throw new Error(msg);
          break;
        case 'defense':
          if (body.defense < 1 || body.defense > 10) throw new Error(msg);
          break;
      }
    });
  } catch (err) {
    res.error = true;
    res.is400 = true;
    res.message = err.message;
  }

  next();
};

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
