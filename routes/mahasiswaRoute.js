"use strict";

const router = require("express").Router();
const upload = require("../utils/cloudStorage");
const MahasiswaController = require("../controllers/mahasiswaController");
const authentication = require("../middlewares/authentication");
const authorizationAdmin = require("../middlewares/authorizationAdmin");
router.post("/", authentication, MahasiswaController.addMahasiswa);
router.get(
  "/",
  authentication,
  authorizationAdmin,
  MahasiswaController.getAllMahasiswa
);
router.get(
  "/:id",
  authentication,
  authorizationAdmin,
  MahasiswaController.getOneMahasiswa
);
router.get(
  "/profile/:nim",
  authentication,
  MahasiswaController.getProfileMahasiswa
);
router.put(
  "/:id",
  authentication,
  authorizationAdmin,
  upload.single("image"),
  MahasiswaController.editMahasiswa
);

module.exports = router;
