"use strict";

const router = require("express").Router();
const UserController = require("../controllers/userController");

router.get("/", UserController.getAllUser);
router.get("/:id", UserController.getOneUser);
router.post("/addUser", UserController.createUser);
router.post("/login", UserController.login);

module.exports = router;
