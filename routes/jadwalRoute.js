"use strict";

const router = require("express").Router();
const JadwalController = require("../controllers/jadwalController");

router.post("/", JadwalController.addJadwal);
router.get("/", JadwalController.getAllJadwal);
router.put("/:id", JadwalController.editJadwal);

module.exports = router;
