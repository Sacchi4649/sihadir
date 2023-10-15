"use strict";

const router = require("express").Router();
const MahasiswaController = require("../controllers/mahasiswaController");

router.post("/", MahasiswaController.addMahasiswa);
router.get("/", MahasiswaController.getAllMahasiswa);
router.get("/:id", MahasiswaController.getOneMahasiswa);

module.exports = router;
