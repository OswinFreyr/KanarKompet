const adminService = require('../services/adminService');
const utilisateurService = require('../services/utilisateurService');


async function loginAdmin(req, res){
    try {
        const login = await adminService.loginAdmin(req.body);
        res.json(login);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function loginUtilisateur(req, res){
    try {
        const login = await utilisateurService.loginUtilisateur(req.body);
        res.json(login);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { loginAdmin, loginUtilisateur, }