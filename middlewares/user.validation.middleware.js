const { user } = require('../models/user');
const userService = require('../services/userService');
const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during creation

  try {
    const { email, password, firstName, lastName, phoneNumber } = req.body;
    const msg = 'Invalid input';
    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      throw new Error(msg);
    }

    if (req.body?.id) throw new Error('Id present');

    Object.keys(req.body).forEach((item) => {
      if (!user.hasOwnProperty(item)) throw new Error('Redundant property');
    });

    const emailFormat = /^\w+([.-]?\w+)*@gmail.com/;
    const phoneFormat = /\+380[0-9]{9}$/;

    if (!email.match(emailFormat)) {
      throw new Error(msg);
    }
    if (password.length < 3) {
      throw new Error(msg);
    }
    if (!phoneNumber.match(phoneFormat)) {
      throw new Error(msg);
    }
  } catch (err) {
    res.error = true;
    res.is400 = true;
    res.message = err.message;
  }
  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update

  try {
    const body = req.body;
    if (!!body?.id) throw new Error('Id should not be here');

    const emailFormat = /^\w+([.-]?\w+)*@gmail.com/;
    const phoneFormat = /\+380[0-9]{9}$/;
    const msg = 'Invalid input';

    const userSchemaKeys = Object.keys(user);
    const bodyKeys = Object.keys(body);
    bodyKeys.forEach((key) => {
      if (!userSchemaKeys.includes(key)) throw new Error('Unexpected property');
      switch (key) {
        case 'email':
          if (!body.email.match(emailFormat)) throw new Error(msg);
          break;
        case 'phoneNumber':
          if (!body.phoneNumber.match(phoneFormat)) throw new Error(msg);
          break;
        case 'password':
          if (body.password.length < 3) throw new Error(msg);
          break;
        case 'firstName':
          if (!body.firstName) throw new Error(msg);
          break;
        case 'lastName':
          if (!body.lastName) throw new Error(msg);
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

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
