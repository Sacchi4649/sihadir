"use strict";

const router = require("express").Router();
const UserController = require("../controllers/userController");

router.get("/", UserController.getAllUser);
router.get("/:username", UserController.getOneUser);
router.post("/addUser", UserController.addUser);
router.post("/login", UserController.login);
router.put("/editUser/:id", UserController.editUser);
router.delete("/deleteUser/:username", UserController.deleteUser);

module.exports = router;
