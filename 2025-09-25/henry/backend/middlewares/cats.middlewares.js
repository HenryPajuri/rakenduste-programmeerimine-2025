const { body, param } = require("express-validator");

const catsRouteMiddleware = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};

const catsGetRouteMiddleware = (req, res, next) => {
  console.log("GET middleware");
  next();
};

const validateCreateCat = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
];

const validateUpdateCat = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
];

const validateCatId = [
  param("id").isUUID().withMessage("Invalid cat ID format"),
];

module.exports = {
  catsRouteMiddleware,
  catsGetRouteMiddleware,
  validateCreateCat,
  validateUpdateCat,
  validateCatId,
};