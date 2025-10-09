const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares/auth.middlewares");

router.post("/login", authController.login);
router.get("/ping", verifyToken, authController.ping);

module.exports = router;
