const { successResponse } = require("../services/responseHandler");
const checkImage = require("../services/imagesCheck");
const { unlinkSync } = require("fs");
const path = require("path");

const { PrismaClient } = require("@prisma/client");
const createError = require("http-errors");
const prisma = new PrismaClient();

/**
 * @description get all sliders data
 * @method GET
 * @route  /api/v1/slider
 * @access public
 */

const getAllSlider = async (req, res, next) => {
  try {
    // find all slider data
    const result = await prisma.slider.findMany({
      orderBy: {
        index: "asc",
      },
    });

    // check slider data
    if (result.length < 1) {
      throw createError(200, "Could not found any slider data!");
    }

    // success response
    successResponse(res, {
      statusCode: 200,
      message: "All slider data",
      payload: {
        data: result,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    prisma.$disconnect();
  }
};

/**
 * @description get single slider data
 * @method GET
 * @route  /api/v1/slider/:id
 * @access private
 */

const findSliderById = async (req, res, next) => {
  try {
    // find slider data by id
    const result = await prisma.slider.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    // check slider data
    if (!result) {
      throw createError(400, "Could not found any slider data!");
    }
    //success response send
    successResponse(res, {
      statusCode: 200,
      message: "Single slider data",
      payload: {
        data: result,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    prisma.$disconnect();
  }
};

/**
 * @description add slider data
 * @method POST
 * @route  /api/v1/slider
 * @access private
 */

const addSlider = async (req, res, next) => {
  try {
    // if title is empty
    if (!req.body.title) throw createError(400, "Title is required!");

    /// if image is empty
    if (!req.file) throw createError(400, "Slider image is required!");

    // create slider data
    const result = await prisma.slider.create({
      data: {
        ...req.body,
        slider_photo: req?.file?.filename,
      },
    });

    // success response send
    successResponse(res, {
      statusCode: 201,
      message: "Successfully added a new slider data.",
      payload: {
        data: result,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    prisma.$disconnect();
  }
};

/**
 * @description delete single slider data
 * @method DELETE
 * @route  /api/v1/slider
 * @access private
 */

const deleteSliderById = async (req, res) => {
  try {
    //  find slider data by id
    const sliderData = await prisma.slider.findUnique({
      where: {
        id: req.params.id,
      },
    });

    // check slider check
    if (!sliderData) {
      throw createError(400, "Could not found any slider data!");
    }

    // delete slider data
    const result = await prisma.slider.delete({
      where: {
        id: +req.params.id,
      },
    });

    // find image in folder & delete
    checkImage("sliders").find((image) => image === sliderData?.slider_photo) &&
      unlinkSync(
        path.join(
          __dirname,
          `../public/images/sliders/${sliderData?.slider_photo}`
        )
      );

    // send success response
    successResponse(res, {
      statusCode: 200,
      message: "Successfully deleted a slider data.",
      payload: {
        data: result,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    prisma.$disconnect();
  }
};

/**
 * @description update single slider data
 * @method PUT/PATCH
 * @route  /api/v1/slider
 * @access private
 */

const updateSliderById = async (req, res, next) => {
  try {
    // find slider data by id
    const slider = await prisma.slider.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    // check slider check
    if (!slider) {
      throw createError(400, "Could not found any slider data!");
    }

    const result = await prisma.slider.update({
      where: {
        id: +req.params.id,
      },
      data: {
        ...req.body,
        slider_photo: req?.file?.filename,
      },
    });

    // find image in folder & update
    if (result && req?.file) {
      checkImage("sliders").find((image) => image === slider?.slider_photo) &&
        unlinkSync(
          path.join(
            __dirname,
            `../public/images/sliders/${slider?.slider_photo}`
          )
        );
    }

    // send success response
    successResponse(res, {
      statusCode: 200,
      message: "Successfully updated a slider.",
      payload: {
        data: result,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    prisma.$disconnect();
  }
};

module.exports = {
  getAllSlider,
  findSliderById,
  addSlider,
  deleteSliderById,
  updateSliderById,
};
