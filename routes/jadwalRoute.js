"use strict";

const router = require("express").Router();
const JadwalController = require("../controllers/jadwalController");
const authentication = require("../middlewares/authentication");
const authorizationAdmin = require("../middlewares/authorizationAdmin");

router.post("/", authentication, JadwalController.addJadwal);
router.get("/", authentication, JadwalController.getAllJadwal);
router.put(
  "/:id",
  authentication,
  authorizationAdmin,
  JadwalController.editJadwal
);

module.exports = router;
