const express = require("express");
const router = express.Router()

const adminController = require("../controllers/adminController");

router.get("/", adminController.getAllAdmins);
router.get("/limit", adminController.getLimitedAdmins);
router.get("/:id", adminController.getAdminById);

router.post("/", adminController.createAdmin);
router.post("/adminCompetition/:idAdmin/:idCompetition", adminController.addCompetitionToAdmin);
router.post("/adminCommentaireCompetition/:idAdmin/:idCommentaireCompetition", adminController.addCommentaireCompetitionToAdmin);
router.post("/login", adminController.loginAdmin);

router.patch("/update/:idAdmin", adminController.updateAdmin);


module.exports = router;