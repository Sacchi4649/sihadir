"use strict";

const router = require("express").Router();
const UserController = require("../controllers/userController");

router.get("/", UserController.getAllUser);
router.post("/createUser", UserController.createUser);
router.post("/login", UserController.login);

module.exports = router;
