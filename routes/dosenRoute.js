"use strict";

const router = require("express").Router();
const DosenController = require("../controllers/dosenController");

router.post("/", DosenController.addDosen);
router.get("/", DosenController.getAllDosen);
router.get("/:id", DosenController.getOneDosen);

module.exports = router;
