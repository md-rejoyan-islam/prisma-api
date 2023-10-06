const { validationResult } = require("express-validator");
const { errorResponse } = require("../../services/responseHandler");


const runValidation = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errorResponse(res, {
        statusCode: 422,
        message: errors.array()[0].msg,
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = runValidation;
