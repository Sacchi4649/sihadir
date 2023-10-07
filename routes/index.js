"use strict";

const router = require("express").Router();
const MahasiswaRoute = require("./mahasiswaRoute");
const DosenRoute = require("./dosenRoute");
const userRoute = require("./userRoute");

router.use("/mahasiswa", MahasiswaRoute);
router.use("/dosen", DosenRoute);
router.use("/", userRoute);

module.exports = router;
