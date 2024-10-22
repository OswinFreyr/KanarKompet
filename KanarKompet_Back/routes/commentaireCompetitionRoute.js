const express = require("express");
const router = express.Router()

const commentaireCompetitionController = require("../controllers/commentaireCompetitionController");

router.get("/", commentaireCompetitionController.getAllCommentairesCompetition);
router.get("/limit", commentaireCompetitionController.getLimitedCommentairesCompetition);
router.get("/:id", commentaireCompetitionController.getCommentaireCompetitionById);

router.post("/", commentaireCompetitionController.createCommentaireCompetition);
router.post("/:idCompetition/:idUtilisateur", commentaireCompetitionController.addUtilisateurToCommentaireCompetition);
router.post("/:idcommentaireCompetition/:idCompetition", commentaireCompetitionController.addCompetitionToCommentaireCompetition);

router.delete("/:id", commentaireCompetitionController.deletecommentaireCompetition)

module.exports = router;