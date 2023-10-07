"use strict";

const router = require("express").Router();
const MahasiswaRoute = require("./mahasiswaRoute");
const DosenRoute = require("./dosenRoute");

router.use("/mahasiswa", MahasiswaRoute);
router.use("/dosen", DosenRoute);

module.exports = router;
