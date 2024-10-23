const express = require("express");
const router = express.Router()

const commentaireCanardController = require("../controllers/commentaireCanardController");

router.get("/", commentaireCanardController.getAllCommentairesCanard);
router.get("/limit", commentaireCanardController.getLimitedCommentairesCanard);
router.get("/:id", commentaireCanardController.getCommentaireCanardById);

router.post("/", commentaireCanardController.createCommentaireCanard);
router.post("/:idCanard/:idUtilisateur", commentaireCanardController.addUtilisateurToCommentaireCanard);
router.post("/:idCommentaireCanard/:idCanard", commentaireCanardController.addCanardToCommentaireCanard);

router.delete("/:id", commentaireCanardController.deleteCommentaireCanard)

module.exports = router;