"use strict";

const router = require("express").Router();
const upload = require("../utils/cloudStorage");
const PresensiController = require("../controllers/presensiController");
const authentication = require("../middlewares/authentication");
const authorizationMahasiswa = require("../middlewares/authorizationMahasiswa");
const authorizationDosen = require("../middlewares/authorizationDosen");

router.get("/", authentication, PresensiController.getPresensi);
router.post(
  "/mahasiswa",
  authentication,
  authorizationMahasiswa,
  PresensiController.isiPresensiMahasiswa
);
router.post(
  "/alpha",
  authentication,
  authorizationDosen,
  PresensiController.isiAlphaMahasiswa
);
router.post(
  "/dosen",
  authentication,
  authorizationDosen,
  PresensiController.isiPresensiDosen
);
router.put(
  "/",
  authentication,
  authorizationMahasiswa,
  upload.single("surat"),
  PresensiController.koreksiPresensi
);
module.exports = router;
