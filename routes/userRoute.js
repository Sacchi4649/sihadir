"use strict";

const router = require("express").Router();
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.get("/", authentication, UserController.getAllUser);
router.get("/:id", authentication, UserController.getOneUser);
router.post("/", authentication, UserController.addUser);
router.post("/login", UserController.login);
router.put("/:id", authentication, UserController.editUser);
router.delete("/:id", authentication, UserController.deleteUser);

module.exports = router;
