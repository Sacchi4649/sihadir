"use strict";

const router = require("express").Router();
const MahasiswaController = require("../controllers/mahasiswaController");

router.post("/addMahasiswa", MahasiswaController.addMahasiswa);
router.get("/", MahasiswaController.getAllMahasiswa);

module.exports = router;
