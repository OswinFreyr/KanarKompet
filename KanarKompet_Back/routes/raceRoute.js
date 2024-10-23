const express = require("express");
const router = express.Router()

const raceController = require("../controllers/raceController");

router.get("/", raceController.getAllRaces);
router.get("/limit", raceController.getLimitedRaces);
router.get("/:id", raceController.getRaceById);

router.post("/", raceController.createRace);
router.post("/raceCanard/:idRace/:idCanard", raceController.addCanardToRace);

router.patch("/update/:idRace", raceController.updateRace);

router.delete("/:idRace", raceController.deleteRace)

module.exports = router;