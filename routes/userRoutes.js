const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.get(
  '/',
  (req, res, next) => {
    const users = UserService.getAll();
    res.data = users;
    next();
  },
  responseMiddleware
);

router.get(
  '/:id',
  (req, res, next) => {
    try {
      const user = UserService.getById(req.params.id);
      res.data = user;
    } catch (err) {
      res.is404 = true;
      res.message = err.message;
    }
    next();
  },
  responseMiddleware
);

router.put(
  '/:id',
  updateUserValid,
  (req, res, next) => {
    try {
      if (!res?.is400) {
        const user = UserService.update(req.params.id, req.body);
        res.data = user;
      }
    } catch (err) {
      res.is404 = true;
      res.message = err.message;
    }
    next();
  },
  responseMiddleware
);

router.post(
  '/',
  createUserValid,
  (req, res, next) => {
    if (!res?.is400) {
      try {
        const user = UserService.create(req.body);
        res.data = user;
      } catch (err) {
        res.is404 = true;
        res.message = err.message;
      }
    }
    next();
  },
  responseMiddleware
);

router.delete(
  '/:id',
  (req, res, next) => {
    try {
      const user = UserService.delete(req.params.id);
      res.data = user;
    } catch (err) {
      res.is400 = true;
      res.message = err.message;
    }
    next();
  },
  responseMiddleware
);

module.exports = router;
