"use strict";

const router = require("express").Router();
const PresensiController = require("../controllers/presensiController");
const authentication = require("../middlewares/authentication");

router.get("/", PresensiController.getPresensi);
router.post("/", authentication, PresensiController.isiPresensi);
// router.patch("/:id", PresensiController.editPresensi);

module.exports = router;
