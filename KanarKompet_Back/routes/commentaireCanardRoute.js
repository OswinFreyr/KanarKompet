const express = require("express");
const router = express.Router()

const commentaireCanardController = require("../controllers/commentaireCanardController");

router.get("/", commentaireCanardController.getAllCommentairesCanard);
router.get("/limit", commentaireCanardController.getLimitedCommentairesCanard);
router.get("/:id", commentaireCanardController.getCommentaireCanardById);

router.post("/", commentaireCanardController.createCommentaireCanard);
// router.post("/commentaireCanardUtilisateur/:idCommentaireCanard/:idUtilisateur", commentaireCanardController.addUtilisateurToCommentaireCanard);
// router.post("/commentaireCanardCanard/:idCommentaireCanard/:idCanard", commentaireCanardController.addCanardToCommentaireCanard);

router.delete("/:idCommentaireCanard", commentaireCanardController.deleteCommentaireCanard)

module.exports = router;