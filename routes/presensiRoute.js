"use strict";

const router = require("express").Router();
const upload = require("../utils/cloudStorage");
const PresensiController = require("../controllers/presensiController");
const authentication = require("../middlewares/authentication");

router.get("/", authentication, PresensiController.getPresensi);
router.post("/", authentication, PresensiController.isiPresensi);
router.post("/alpha", authentication, PresensiController.isiAlphaMahasiswa);
router.put(
  "/",
  authentication,
  upload.single("surat"),
  PresensiController.koreksiPresensi
);
router.post("/dosen", authentication, PresensiController.isiPresensiDosen);
module.exports = router;
