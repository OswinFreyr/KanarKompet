const express = require("express");
const router = express.Router()

const commentaireCompetitionController = require("../controllers/commentaireCompetitionController");

router.get("/", commentaireCompetitionController.getAllCommentairesCompetition);
router.get("/limit", commentaireCompetitionController.getLimitedCommentairesCompetition);
router.get("/:id", commentaireCompetitionController.getCommentaireCompetitionById);

router.post("/", commentaireCompetitionController.createCommentaireCompetition);
// router.post("/commentaireCompetitionUtilisateur/:idCommentaireCompetition/:idUtilisateur", commentaireCompetitionController.addUtilisateurToCommentaireCompetition);
// router.post("/commentaireCompetitionCompetition/:idCommentaireCompetition/:idCompetition", commentaireCompetitionController.addCompetitionToCommentaireCompetition);
// router.post("/commentaireCompetitionAdmin/:idCommentaireCompetition/:idAdmin", commentaireCompetitionController.addAdminToCommentaireCompetition);

router.delete("/:id", commentaireCompetitionController.deleteCommentaireCompetition)

module.exports = router;