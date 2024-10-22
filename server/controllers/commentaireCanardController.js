const commentaireCanardService = require('../services/commentaireCanardService');
const canardService = require('../services/canardService');

async function createCommentaireCanard(req, res) {
    try {
        const commentaireCanard = await commentaireCanardService.createCommentaireCanard(req.body);
        res.json(commentaireCanard);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getAllCommentairesCanard(req, res) {
    try{
        const { offset, limit, note} = req.query;
        const commentairesCanard = await commentaireCanardService.getAllCommentairesCanard({ offset, limit, note});
        res.json(commentairesCanard);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getLimitedCommentairesCanard(req, res) {
    try{
        const { pageId: pageId1, itemsPerPage: itemsPerPage1, offset, limit, note } = req.query;
        const pageId = parseInt(pageId1) || 1;
        const itemsPerPage = parseInt(itemsPerPage1) || 10;
        
        const paginationData = await commentaireCanardService.getLimitedCommentairesCanard({ offset, limit, note }, pageId, itemsPerPage);
        const baseUri = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`

        let queryParams = "";
        queryParams += itemsPerPage ? `&itemsPerPage=${itemsPerPage}` : itemsPerPage1;
        queryParams += note ? `&note=${note}` : "";

        const previousUrl = pageId > 1 ? `${baseUri}?pageId=${pageId - 1}${queryParams}` : null;
        const nextUrl = paginationData.hasMore ? `${baseUri}?pageId=${pageId + 1}${queryParams}` : null;
        res.json({data: paginationData.commentairesCanard, count: paginationData.count, previousUrl, nextUrl});    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getCommentaireCanardById(req, res) {
    try {
        const id = req.params.id;
        const commentaireCanard = await commentaireCanardService.getCommentaireCanardById(id);
        if(commentaireCanard){
            res.json(commentaireCanard);
        }
        else {
            res.json({"error": `commentaireCanard ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};



async function addCanardToCommentaireCanard(req, res){
    try {
        const idCanard = req.params.idCanard;
        const idCommentaireCanard = req.params.idCommentaireCanard;
        const canardCommentaireCanard = await commentaireCanardService.addCanardToCommentaireCanard(idCanard, idCommentaireCanard);
        const commentaireCanardCanard = await canardService.addCommentaireCanardToCanard(idCommentaireCanard,idCanard);
        res.json({canardCommentaireCanard: canardCommentaireCanard, commentaireCanardCanard: commentaireCanardCanard});
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function addUtilisateurToCommentaireCanard (req, res){
    try {
        const idUtilisateur = req.params.idUtilisateur;
        const idCommentaireCanard = req.params.idCommentaireCanard;
        const utilisateurCommentaireCanard = await commentaireCanardService.addUtilisateurToCommentaireCanard(idUtilisateur,idCommentaireCanard);
        const commentaireCanardUtilisateur = await utilisateurService.addCommentaireCanardToUtilisateur(idCommentaireCanard,idUtilisateur);
        res.json({utilisateurCommentaireCanard: utilisateurCommentaireCanard,commentaireCanardUtilisateur: commentaireCanardUtilisateur});
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}


async function deletecommentaireCanard (req, res){
    try {
        const idCommentaireCanard = req.params.idCommentaireCanard;
        const commentaireCanard = await commentaireCanardService.deleteCommentaireCanard(idCommentaireCanard);
        res.json(commentaireCanard )
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {createCommentaireCanard, getAllCommentairesCanard, getLimitedCommentairesCanard, getCommentaireCanardById, getCommentaireCanardById, addCanardToCommentaireCanard, addUtilisateurToCommentaireCanard, deletecommentaireCanard}