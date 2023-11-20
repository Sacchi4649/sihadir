"use strict";

const router = require("express").Router();
const upload = require("../utils/cloudStorage");
const DosenController = require("../controllers/dosenController");
const authentication = require("../middlewares/authentication");
const authorizationAdmin = require("../middlewares/authorizationAdmin");

router.post("/", authentication, authorizationAdmin, DosenController.addDosen);
router.get("/", authentication, DosenController.getAllDosen);
router.get(
  "/:id",
  authentication,
  authorizationAdmin,
  DosenController.getOneDosen
);
router.put(
  "/:id",
  authentication,
  authorizationAdmin,
  upload.single("image"),
  DosenController.editDosen
);

module.exports = router;
