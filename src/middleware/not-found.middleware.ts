export const notFoundMiddleware = (req, res, next) =>
  res.status(404).send({
    msg: 'Route does not exist',
    success: false,
    type: 'not_found',
  });
