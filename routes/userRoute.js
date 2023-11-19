"use strict";

const router = require("express").Router();
const upload = require("../utils/cloudStorage");
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.get("/", authentication, authorization, UserController.getAllUser);
router.get("/:id", authentication, authorization, UserController.getOneUser);
router.post("/", authentication, authorization, UserController.addUser);
router.post("/login", UserController.login);
router.put(
  "/:id",
  authentication,
  authorization,
  upload.single("image"),
  UserController.editUser
);
router.patch(
  "/changepassword",
  authentication,
  authorization,
  UserController.changePassword
);
router.delete("/:id", authentication, authorization, UserController.deleteUser);

module.exports = router;
