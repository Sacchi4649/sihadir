"use strict";

const router = require("express").Router();
const mahasiswaRoute = require("./mahasiswaRoute");
const dosenRoute = require("./dosenRoute");
const userRoute = require("./userRoute");
const matkulRoute = require("./matkulRoute");
const jadwalRoute = require("./jadwalRoute");

router.use("/mahasiswa", mahasiswaRoute);
router.use("/dosen", dosenRoute);
router.use("/user", userRoute);
router.use("/matakuliah", matkulRoute);
router.use("/jadwal", jadwalRoute);

module.exports = router;
