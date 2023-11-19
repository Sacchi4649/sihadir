"use strict";

const router = require("express").Router();
const upload = require("../utils/cloudStorage");
const PresensiController = require("../controllers/presensiController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.get("/", authentication, authorization, PresensiController.getPresensi);
router.post("/", authentication, authorization, PresensiController.isiPresensi);
router.post(
  "/alpha",
  authentication,
  authorization,
  PresensiController.isiAlphaMahasiswa
);
router.put(
  "/",
  authentication,
  authorization,
  upload.single("surat"),
  PresensiController.koreksiPresensi
);
router.post(
  "/dosen",
  authentication,
  authorization,
  PresensiController.isiPresensiDosen
);
module.exports = router;
