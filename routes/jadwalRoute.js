"use strict";

const router = require("express").Router();
const JadwalController = require("../controllers/jadwalController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post("/", JadwalController.addJadwal);
router.get("/", authentication, authorization, JadwalController.getAllJadwal);
router.put("/:id", JadwalController.editJadwal);

module.exports = router;
