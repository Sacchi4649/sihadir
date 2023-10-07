"use strict";

const router = require("express").Router();
const DosenController = require("../controllers/dosenController");

router.post("/addDosen", DosenController.addDosen);

module.exports = router;
