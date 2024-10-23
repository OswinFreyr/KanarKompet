const express = require("express");
const router = express.Router()

const raceController = require("../controllers/raceController");

router.get("/", raceController.getAllRaces);
router.get("/limit", raceController.getLimitedRaces);
router.get("/:id", raceController.getRaceById);

router.post("/", raceController.createRace);
router.post("/:idRace/:idCanard", raceController.addCanardToRace);

router.patch("/update/:id", raceController.updateRace);

router.delete("/:id", raceController.deleteRace)

module.exports = router;