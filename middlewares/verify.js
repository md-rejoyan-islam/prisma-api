const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { jwtLoginTokenSecret } = require("../secret.js");
const User = require("../model/user.model.js");
const { errorResponse } = require("../services/responseHandler.js");

const isLoggedIn = asyncHandler(async (req, res, next) => {

//     const authHeader = req.headers.authorization || req.headers.Authorization;
// console.log(authHeader);
//     const authToken = req?.cookies?.accessToken;
//     const token = authHeader?.split(" ")[1] || authToken;
// console.log(authHeader);

  const token = req?.cookies?.accessToken;



  if (!token) {
    throw createError(
      401,
      "Unauthorized, Access token not found. Please login."
    );
  }

  jwt.verify(token, jwtLoginTokenSecret, async (err, decode) => {
    if (err) {
      errorResponse(res, {
        statusCode: 400,
        message: "Unauthorized, Invalid access token.Please login again",
      });
    }
    const loginUser = await User.findOne({ email: decode.email });

    req.me = loginUser;
    next();
  });
});

const isLoggedOut = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  const authToken = req?.cookies?.accessToken;
  const token = authHeader?.split(" ")[1] || authToken;

  if (token) {
    throw createError(400, "User is already logged in");
  }

  next();
});

module.exports = { isLoggedIn, isLoggedOut };
