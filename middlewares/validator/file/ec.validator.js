
const {body} = require("express-validator");

 const ECValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.Please provide a name.")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long."),

  body("year")
    .trim()
    .notEmpty()
    .withMessage("Year is required.Please provide a year.")
    .isLength({ min: 4 })
    .withMessage("Year must be at least 4 characters long."),
];

 const AddECMemberValidator = [
  body("user")
    .trim()
    .notEmpty()
    .withMessage("User Id is required.Please provide a user id."),

  body("index")
    .trim()
    .notEmpty()
    .withMessage("Index is required.Please provide a index."),

  body("designation")
    .trim()
    .notEmpty()
    .withMessage("Designation is required.Please provide a designation."),
];


module.exports = { ECValidator, AddECMemberValidator };