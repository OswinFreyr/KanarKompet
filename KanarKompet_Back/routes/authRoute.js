const express = require("express");
const router = express.Router()

const adminController = require("../controllers/adminController");
const utilisateurController = require("../controllers/utilisateurController");

router.post("/admin", adminController.loginAdmin);
router.post("/utilisateur", utilisateurController.loginUtilisateur);

module.exports = router