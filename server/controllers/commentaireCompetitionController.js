const commentaireCompetitionService = require('../services/commentaireCompetitionService');
const competitionService = require('../services/competitionService');

async function createCommentaireCompetition(req, res) {
    try {
        const commentaireCompetition = await commentaireCompetitionService.createCommentaireCompetition(req.body);
        res.json(commentaireCompetition);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getAllCommentairesCompetition(req, res) {
    try{
        const { offset, limit, } = req.query;
        const commentairesCompetition = await commentaireCompetitionService.getAllCommentairesCompetition({ offset, limit, note});
        res.json(commentairesCompetition);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getLimitedCommentairesCompetition(req, res) {
    try{
        const { pageId: pageId1, itemsPerPage: itemsPerPage1, offset, limit, note } = req.query;
        const pageId = parseInt(pageId1) || 1;
        const itemsPerPage = parseInt(itemsPerPage1) || 10;
        
        const paginationData = await commentaireCompetitionService.getLimitedCommentairesCompetition({ offset, limit, note }, pageId, itemsPerPage);
        const baseUri = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`

        let queryParams = "";
        queryParams += itemsPerPage ? `&itemsPerPage=${itemsPerPage}` : itemsPerPage1;
        queryParams += note ? `&note=${note}` : "";

        const previousUrl = pageId > 1 ? `${baseUri}?pageId=${pageId - 1}${queryParams}` : null;
        const nextUrl = paginationData.hasMore ? `${baseUri}?pageId=${pageId + 1}${queryParams}` : null;
        res.json({data: paginationData.commentairesCompetition, count: paginationData.count, previousUrl, nextUrl});    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getCommentaireCompetitionById(req, res) {
    try {
        const id = req.params.id;
        const commentaireCompetition = await commentaireCompetitionService.getCommentaireCompetitionById(id);
        if(commentaireCompetition){
            res.json(commentaireCompetition);
        }
        else {
            res.json({"error": `commentaireCompetition ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};



async function addCompetitionToCommentaireCompetition(req, res){
    try {
        const idCompetition = req.params.idCompetition;
        const idCommentaireCompetition = req.params.idCommentaireCompetition;
        const competitionCommentaireCompetition = await commentaireCompetitionService.addCompetitionToCommentaireCompetition(idCompetition, idCommentaireCompetition);
        const commentaireCompetitionCompetition = await competitionService.addCommentaireCompetitionToCompetition(idCommentaireCompetition,idCompetition);
        res.json({competitionCommentaireCompetition: competitionCommentaireCompetition, commentaireCompetitionCompetition: commentaireCompetitionCompetition});
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function addUtilisateurToCommentaireCompetition (req, res){
    try {
        const idUtilisateur = req.params.idUtilisateur;
        const idCommentaireCompetition = req.params.idCommentaireCompetition;
        const utilisateurCommentaireCompetition = await commentaireCompetitionService.addUtilisateurToCommentaireCompetition(idUtilisateur,idCommentaireCompetition);
        const commentaireCompetitionUtilisateur = await utilisateurService.addCommentaireCompetitionToUtilisateur(idCommentaireCompetition,idUtilisateur);
        res.json({utilisateurCommentaireCompetition: utilisateurCommentaireCompetition,commentaireCompetitionUtilisateur: commentaireCompetitionUtilisateur});
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function addAdminToCommentaireCompetition (req, res){
    try {
        const idAdmin = req.params.idAdmin;
        const idCommentaireCompetition = req.params.idCommentaireCompetition;
        const adminCommentaireCompetition = await commentaireCompetitionService.addAdminToCommentaireCompetition(idAdmin,idCommentaireCompetition);
        const commentaireCompetitionAdmin = await adminService.addCommentaireCompetitionToAdmin(idCommentaireCompetition,idAdmin);
        res.json({adminCommentaireCompetition: adminCommentaireCompetition, commentaireCompetitionAdmin: commentaireCompetitionAdmin});
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}


async function deletecommentaireCompetition (req, res){
    try {
        const idCommentaireCompetition = req.params.idCommentaireCompetition;
        const commentaireCompetition = await commentaireCompetitionService.deleteCommentaireCompetition(idCommentaireCompetition);
        res.json(commentaireCompetition )
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {createCommentaireCompetition, getAllCommentairesCompetition, getLimitedCommentairesCompetition,getCommentaireCompetitionById, getCommentaireCompetitionById, addCompetitionToCommentaireCompetition, addUtilisateurToCommentaireCompetition, addAdminToCommentaireCompetition, deletecommentaireCompetition}