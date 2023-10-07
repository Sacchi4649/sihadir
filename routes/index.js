"use strict";

const router = require("express").Router();
const MahasiswaRoute = require("./mahasiswaRoute");

router.use("/mahasiswa", MahasiswaRoute);

module.exports = router;
