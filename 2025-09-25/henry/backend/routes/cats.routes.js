const express = require("express");
const router = express.Router();
const catsController = require("../controllers/cats.controller");
const {
  catsRouteMiddleware,
  catsGetRouteMiddleware,
  validateCreateCat,
  validateUpdateCat,
  validateCatId,
} = require("../middlewares/cats.middlewares");

router.use(catsRouteMiddleware);

router.get("/", catsGetRouteMiddleware, catsController.read);
router.get("/:id", validateCatId, catsController.readOne);
router.post("/", validateCreateCat, catsController.create);
router.put("/:id", validateCatId, validateUpdateCat, catsController.update);
router.delete("/:id", validateCatId, catsController.delete);

module.exports = router;