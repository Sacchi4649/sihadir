"use strict";

const router = require("express").Router();
const MatkulController = require("../controllers/matkulController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post("/", authentication, authorization, MatkulController.addMatkul);
router.get("/", authentication, authorization, MatkulController.getAllMatkul);
router.put("/:id", authentication, authorization, MatkulController.editMatkul);

module.exports = router;
