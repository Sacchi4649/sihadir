"use strict";

const router = require("express").Router();
const upload = require("../utils/cloudStorage");
const DosenController = require("../controllers/dosenController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post("/", authentication, DosenController.addDosen);
router.get("/", authentication, DosenController.getAllDosen);
router.get("/:id", authentication, DosenController.getOneDosen);
router.put(
  "/:id",
  authentication,
  upload.single("image"),
  DosenController.editDosen
);

module.exports = router;
