"use strict";

const router = require("express");
const MahasiswaRoute = require("./mahasiswaRoute");

router.request("/mahasiswa", MahasiswaRoute);

module.exports = router;
