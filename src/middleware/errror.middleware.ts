export const errorHandlerMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  if (
    err.name === 'SequelizeValidationError' ||
    err.name === 'SequelizeUniqueConstraintError'
  ) {
    const errors = err.errors;

    const errorList = errors.map((e) => {
      return `${e.path} - ${e.message}`;
    });
    return res.status(400).json({
      success: false,
      msg: message,
      type: 'db_validation',
      errors: errorList,
    });
  } else if (err.name === 'SequelizeDatabaseError') {
    return res.status(400).json({
      success: false,
      msg: message,
      errors: [{ message: err.original.sqlMessage }],
    });
  }
  return res.status(status).json({
    msg: message,
    success: false,
    type: 'standard',
  });
};
