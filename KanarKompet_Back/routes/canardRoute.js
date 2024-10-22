const express = require("express");
const router = express.Router()

const canardController = require("../controllers/canardController");

router.get("/", canardController.getAllCanards);
router.post("/", canardController.createCanard);

router.get("/:id", canardController.getCanardById);

module.exports = router;