const express = require("express");
const router = express.Router()

const adminController = require("../controllers/adminController");

router.get("/", adminController.getAllAdmins);
router.get("/limit", adminController.getLimitedAdmins);
router.get("/:id", adminController.getAdminById);

router.post("/", adminController.createAdmin);
router.post("/:idAdmin/:idCompetition", adminController.addCompetitionToAdmin);
router.post("/:idAdmin/:idCommentaireCompetition", adminController.addCommentaireCompetitionToAdmin);

router.update("/update/:id", adminController.updateAdmin);


module.exports = router;