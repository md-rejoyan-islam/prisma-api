const {
  getAllSlider,
  findSliderById,
  deleteSliderById,
  addSlider,
  updateSliderById,
} = require("../controllers/slider.controller");
const { sliderMulter } = require("../utils/multer");
const express = require("express");
const sliderRouter = express.Router();

// const { authorization } = require("../middlewares/authorization");
// const { isLoggedIn } = require("../middlewares/verify");
// const { sliderMulter } = require("../utils/multer.js");

// routes
sliderRouter.route("/").get(getAllSlider).post(
  // isLoggedIn,
  // authorization("admin", "superAdmin"),
  sliderMulter,
  addSlider
);

sliderRouter
  .route("/:id")
  //   .get(isLoggedIn, singleSlider)
  //   .delete(isLoggedIn, authorization("admin", "superAdmin"), deleteSlider)
  .get(findSliderById)
  .delete(deleteSliderById)
  .patch(
    // isLoggedIn,
    // authorization("admin", "superAdmin"),
    sliderMulter,
    updateSliderById
  );

//export router
module.exports = sliderRouter;
