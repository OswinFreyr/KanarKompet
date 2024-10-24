const utilisateurService = require('../services/utilisateurService');
const canardService  = require('../services/canardService');
const commentaireCanardService = require('../services/commentaireCanardService');
const commentaireCompetitionService = require('../services/commentaireCompetitionService');

async function createUtilisateur(req, res) {
    try {
        const utilisateur = await utilisateurService.createUtilisateur(req.body);
        res.json(utilisateur);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getAllUtilisateurs(req, res) {
    try{
        const { offset, limit, nom, prenom, e_mail} = req.query;
        const utilisateurs = await utilisateurService.getAllUtilisateurs({ offset, limit, nom, prenom, e_mail});
        res.json(utilisateurs);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getLimitedUtilisateurs(req, res) {
    try{
        const { pageId: pageId1, itemsPerPage: itemsPerPage1, offset, limit, nom, prenom, e_mail } = req.query;
        const pageId = parseInt(pageId1) || 1;
        const itemsPerPage = parseInt(itemsPerPage1) || 10;
        
        const paginationData = await utilisateurService.getLimitedUtilisateurs({ offset, limit, nom, prenom, e_mail }, pageId, itemsPerPage);
        const baseUri = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`

        let queryParams = "";
        queryParams += itemsPerPage ? `&itemsPerPage=${itemsPerPage}` : itemsPerPage1;
        queryParams += nom ? `&nom=${nom}` : "";
        queryParams += prenom ? `&prenom=${prenom}` : "";
        queryParams += e_mail ? `&e_mail=${e_mail}` : "";

        const previousUrl = pageId > 1 ? `${baseUri}?pageId=${pageId - 1}${queryParams}` : null;
        const nextUrl = paginationData.hasMore ? `${baseUri}?pageId=${pageId + 1}${queryParams}` : null;
        res.json({data: paginationData.utilisateurs, count: paginationData.count, previousUrl, nextUrl});    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getUtilisateurById(req, res) {
    try {
        const id = req.params.id;
        const utilisateur = await utilisateurService.getUtilisateurById(id);
        if(utilisateur){
            res.json(utilisateur);
        }
        else {
            res.json({"error": `utilisateur ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};


async function addCommentaireCanardToUtilisateur(req, res){
    try {
        const idUtilisateur = req.params.idUtilisateur;
        const idCommentaireCanard = req.params.idCommentaireCanard;
        const commentaireCanardUtilisateur = await utilisateurService.addCommentaireCanardToUtilisateur(idCommentaireCanard, idUtilisateur);
        res.json({ commentaireCanardUtilisateur: commentaireCanardUtilisateur, });
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function addCommentaireCompetitionToUtilisateur(req, res){
    try {
        const idUtilisateur = req.params.idUtilisateur;
        const idCommentaireCompetition = req.params.idCommentaireCompetition;
        const commentaireCompetitionUtilisateur = await utilisateurService.addCommentaireCompetitionToUtilisateur(idCommentaireCompetition, idUtilisateur);
        res.json({ commentaireCompetitionUtilisateur: commentaireCompetitionUtilisateur, });
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function addCanardToUtilisateur(req, res){
    try {
        const idCanard = req.params.idCanard;
        const idUtilisateur = req.params.idUtilisateur;
        const canardUtilisateur = await utilisateurService.addCanardToUtilisateur(idCanard, idUtilisateur);
        res.json({canardUtilisateur: canardUtilisateur, });
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function updateUtilisateur (req, res){
    try {
        const idUtilisateur = req.params.idUtilisateur;
        const utilisateur = await utilisateurService.updateUtilisateur(idUtilisateur, req.body);
        res.json(utilisateur);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


async function deleteUtilisateur (req, res){
    try {
        const idUtilisateur = req.params.idUtilisateur;
        const utilisateur = await utilisateurService.deleteUtilisateur(idUtilisateur, req.body);
        res.json(utilisateur);        
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

module.exports = { createUtilisateur, getAllUtilisateurs, getLimitedUtilisateurs, getUtilisateurById, addCommentaireCompetitionToUtilisateur, addCommentaireCanardToUtilisateur, addCanardToUtilisateur, updateUtilisateur, deleteUtilisateur, loginUtilisateur, }