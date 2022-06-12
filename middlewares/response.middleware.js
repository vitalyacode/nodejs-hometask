const responseMiddleware = (req, res, next) => {
  if (res?.is404) {
    res.status(404).json({ error: true, message: res.message });
  }
  if (res?.is400) {
    res.status(400).json({ error: true, message: res.message });
  }
  res.status(200).json(res.data);
  next();
};

exports.responseMiddleware = responseMiddleware;
