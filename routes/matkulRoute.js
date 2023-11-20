"use strict";

const router = require("express").Router();
const MatkulController = require("../controllers/matkulController");
const authentication = require("../middlewares/authentication");
const authorizationAdmin = require("../middlewares/authorizationAdmin");

router.get("/", authentication, MatkulController.getAllMatkul);
router.post(
  "/",
  authentication,
  authorizationAdmin,
  MatkulController.addMatkul
);
router.put(
  "/:id",
  authentication,
  authorizationAdmin,
  MatkulController.editMatkul
);

module.exports = router;
