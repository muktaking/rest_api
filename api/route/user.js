const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const authenticate = require("../middlewire/authenticate");

//router config
//router.post("/");
router.post("/register", userController.registerController);
router.post("/login", userController.loginController);
router.get("/", authenticate ,userController.getAllUser);

//router.get("/user")

module.exports = router;