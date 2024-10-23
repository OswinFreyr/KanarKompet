const express = require("express");
const router = express.Router()

const canardController = require("../controllers/canardController");

router.get("/", canardController.getAllCanards);
router.get("/limit", canardController.getLimitedCanards);
router.get("/:id", canardController.getCanardById);

router.post("/", canardController.createCanard);
router.post("/canardRace/:idCanard/:idRace", canardController.addRaceToCanard);
// router.post("/canardUtilisateur/:idCanard/:idUtilisateur", canardController.addUtilisateurToCanard);
// router.post("/canardCompetition/:idCanard/:idCompetition", canardController.addCompetitionToCanard);
router.post("/canardCommentaireCanard/:idCanard/:idCommentaireCanard", canardController.addCommentaireCanardToCanard);

router.patch("/update/:idCanard", canardController.updateCanard);

router.delete("/:idCanard", canardController.deleteCanard)

module.exports = router;