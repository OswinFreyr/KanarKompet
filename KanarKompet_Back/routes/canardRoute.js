const express = require("express");
const router = express.Router()

const canardController = require("../controllers/canardController");

router.get("/", canardController.getAllCanards);
router.get("/limit", canardController.getLimitedCanards);
router.get("/:id", canardController.getCanardById);

router.post("/", canardController.createCanard);
router.post("/:idCanard/:idRace", canardController.addRaceToCanard);
router.post("/:idCanard/:idUtilisateur", canardController.addUtilisateurToCanard);
router.post("/:idCanard/:idCompetition", canardController.addCompetitionToCanard);
router.post("/:idCanard/:idCommentaireCanard", canardController.addCommentaireCanardToCanard);

router.patch("/update/:id", canardController.updateCanard);

router.delete("/:id", canardController.deleteCanard)

module.exports = router;