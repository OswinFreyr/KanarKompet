const express = require("express");
const router = express.Router()

const utilisateurController = require("../controllers/utilisateurController");

router.get("/", utilisateurController.getAllUtilisateurs);
router.get("/limit", utilisateurController.getLimitedUtilisateurs);
router.get("/:id", utilisateurController.getUtilisateurById);

router.post("/", utilisateurController.createUtilisateur);
router.post("/utilisateurCanard/:idUtilisateur/:idCanard", utilisateurController.addCanardToUtilisateur);
router.post("/utilisateurCommentaireCompetition/:idUtilisateur/:idCommentaireCompetition", utilisateurController.addCommentaireCompetitionToUtilisateur);
router.post("/utilisateurCommentaireCanard/:idUtilisateur/:idCommentaireCanard", utilisateurController.addCommentaireCanardToUtilisateur);

router.patch("/update/:id", utilisateurController.updateUtilisateur);

router.delete("/:id", utilisateurController.deleteUtilisateur);

module.exports = router;