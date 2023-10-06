const errorResponse = (
  res,
  { statusCode = 500, message = "Unknown Server Error" }
) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      status: statusCode,
      message,
    },
  });
};

const successResponse = (
  res,
  { statusCode = 200, message = "Success", payload }
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...payload,
  });
};

module.exports = {
  errorResponse,
  successResponse,
};
