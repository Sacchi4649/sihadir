"use strict";

const router = require("express").Router();
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.get("/", authentication, UserController.getAllUser);
router.get("/:username", UserController.getOneUser);
router.post("/", UserController.addUser);
router.post("/login", UserController.login);
router.put("/:id", UserController.editUser);
router.delete("/:username", UserController.deleteUser);

module.exports = router;
