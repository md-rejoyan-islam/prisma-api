const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
// const corsOptions = require("./config/corsSetup.js");
// const connectDB = require("./config/db.js");
// const userRouter = require("./routes/user.route.js");
// const authRouter = require("./routes/auth.route.js");
// const ecRouter = require("./routes/ec.route.js");
// const programRouter = require("./routes/program.route.js");
// const subscriberRouter = require("./routes/subscriber.route.js");
// const advisorRouter = require("./routes/advisors.route.js");
// const imagesRouter = require("./routes/images.route.js");
// const postRouter = require("./routes/post.route.js");
const sliderRouter = require("./routes/slider.route.js");
const errorHandler = require("./middlewares/errorHandler.js");
const { successResponse } = require("./services/responseHandler.js");
const e = require("express");
const { restart } = require("nodemon");
// const orgRouter = require("./routes/org.route.js");

// port
const PORT = process.env.PORT || 8080;

// express app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());
// app.use(cors(corsOptions));

// static files
app.use("/public", express.static("./public"));

// routes
// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/ec", ecRouter);
// app.use("/api/v1/programs", programRouter);
// app.use("/api/v1/subscribers", subscriberRouter);
// app.use("/api/v1/advisors", advisorRouter);
app.use("/api/v1/sliders", sliderRouter);
// // images routes
// app.use("/api/v1/images", imagesRouter);
// //post routes
// app.use("/api/v1/posts", postRouter);
// // org
// app.use("/api/v1/org-members", orgRouter);

// invalid route handler
app.get("/", (req, res) => {
  // send success response
  successResponse(res, {
    statusCode: 200,
    message: "Welcome to the KIN API",
  });
});

// invalid route handler
app.use((req, res, next) => {
  next(createError(404, "Could'nt found this route!"));
});


// error handler
app.use(errorHandler);

// server listen
app.listen(PORT, () => {
  console.log(
    "\n" + `Server is running on http://localhost:${PORT}`.bgYellow.bold + "\n"
  );
});



// unhandled promise rejection for asynchronous exception
process.on("unhandledRejection", async (error, promise,res) => {
  console.log(error);
});



// uncaught exception error handler for  synchronous exception
process.on("uncaughtException", async (error, promise,res) => {
  console.log(error);
});
