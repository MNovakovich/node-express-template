export const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  if (
    err.name === 'SequelizeValidationError' ||
    err.name === 'SequelizeUniqueConstraintError'
  ) {
    const errors = err.errors;

    const errorList = errors.map((e) => {
      // let obj: any = {};
      // obj.field = e.path;
      // obj.message = e.message;
      return `${e.path} - ${e.message}`;
    });
    return res.status(400).json({
      success: false,
      msg: 'Bad Request',
      type: 'db_validation',
      errors: errorList,
    });
  } else if (err.name === 'SequelizeDatabaseError') {
    return res.status(400).json({
      success: false,
      errors: [{ message: err.original.sqlMessage }],
    });
  }
  return res.status(err.status).json({
    msg: err.message,
    success: false,
    type: 'standard',
  });
};
