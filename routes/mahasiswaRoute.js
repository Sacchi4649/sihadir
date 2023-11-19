"use strict";

const router = require("express").Router();
const upload = require("../utils/cloudStorage");
const MahasiswaController = require("../controllers/mahasiswaController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
router.post("/", authentication, MahasiswaController.addMahasiswa);
router.get(
  "/",
  authentication,
  authorization,
  MahasiswaController.getAllMahasiswa
);
router.get(
  "/:id",
  authentication,
  authorization,
  MahasiswaController.getOneMahasiswa
);
router.put(
  "/:id",
  authentication,
  upload.single("image"),
  MahasiswaController.editMahasiswa
);

module.exports = router;
