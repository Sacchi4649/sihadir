"use strict";

const router = require("express").Router();
const upload = require("../utils/cloudStorage");
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const authorizationAdmin = require("../middlewares/authorizationAdmin");

router.post("/login", UserController.login);
router.post("/", authentication, authorizationAdmin, UserController.addUser);
router.get("/", authentication, authorizationAdmin, UserController.getAllUser);
router.get(
  "/:id",
  authentication,
  authorizationAdmin,
  UserController.getOneUser
);
router.put(
  "/:id",
  authentication,
  upload.single("image"),
  UserController.editUser
);
router.patch("/changepassword", authentication, UserController.changePassword);
router.delete(
  "/:id",
  authentication,
  authorizationAdmin,
  UserController.deleteUser
);

module.exports = router;
