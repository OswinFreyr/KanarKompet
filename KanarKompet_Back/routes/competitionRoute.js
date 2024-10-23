const express = require("express");
const router = express.Router()

const competitionController = require("../controllers/competitionController");

router.get("/", competitionController.getAllCompetitions);
router.get("/limit", competitionController.getLimitedCompetitions);
router.get("/:id", competitionController.getCompetitionById);

router.post("/", competitionController.createCompetition);
router.post("/:idCompetition/:idCanard", competitionController.addCanardToCompetition);
router.post("/:idCompetition/:idAdmin", competitionController.addAdminToCompetition);
router.post("/:idCompetition/:idLocalisation", competitionController.addLocalisationToCompetition);
router.post("/:idCompetition/:idCommentaireCompetition", competitionController.addCommentaireCompetitionToCompetition);

router.patch("/update/:id", competitionController.updateCompetition);

router.delete("/:id", competitionController.deleteCompetition)

module.exports = router;