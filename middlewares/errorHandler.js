const { errorResponse } = require("../services/responseHandler");

const errorHandler = (err, req, res, next) => {
 
  errorResponse(res, {
    statusCode: err.status || 500,
    message: err.message || "Unknown Server Error",
  });
};

module.exports = errorHandler;
