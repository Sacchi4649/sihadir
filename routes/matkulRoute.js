"use strict";

const router = require("express").Router();
const MatkulController = require("../controllers/matkulController");

router.post("/", MatkulController.addMatkul);
router.get("/", MatkulController.getAllMatkul);
router.put("/:id", MatkulController.editMatkul);

module.exports = router;
