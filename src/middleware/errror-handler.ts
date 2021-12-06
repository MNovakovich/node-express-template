export const errorHandlerMiddleware = (err, req, res, next) => {
  if (
    err.name === 'SequelizeValidationError' ||
    err.name === 'SequelizeUniqueConstraintError'
  ) {
    const errors = err.errors;

    const errorList = errors.map((e) => {
      let obj: any = {};
      obj.field = e.path;
      obj.message = e.message;
      return obj;
    });
    return res.status(400).json({
      success: false,
      errors: errorList,
    });
  } else if (err.name === 'SequelizeDatabaseError') {
    return res.status(400).json({
      success: false,
      errors: [{ message: err.original.sqlMessage }],
    });
  }
  return res.status(500).json({ msg: err, success: false });
};
