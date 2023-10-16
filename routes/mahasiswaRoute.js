"use strict";

const router = require("express").Router();
const upload = require("../utils/cloudStorage");
const MahasiswaController = require("../controllers/mahasiswaController");
const authentication = require("../middlewares/authentication");
router.post("/", authentication, MahasiswaController.addMahasiswa);
router.get("/", authentication, MahasiswaController.getAllMahasiswa);
router.get("/:id", authentication, MahasiswaController.getOneMahasiswa);
router.put(
  "/:id",
  authentication,
  upload.single("image"),
  MahasiswaController.editMahasiswa
);

module.exports = router;
