const competitionService = require('../services/competitionService');
const commentaireCompetitionService = require('../services/commentaireCompetitionService');

async function createCompetition(req, res) {
    try {
        const competition = await competitionService.createCompetition(req.body);
        res.json(competition);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getAllCompetitions(req, res) {
    try{
        const { offset, limit, nom, prenom, e_mail} = req.query;
        const competitions = await competitionService.getAllCompetitions({ offset, limit, titre, lieu, date, recompense, max_participants, });
        res.json(competitions);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getLimitedCompetitions(req, res) {
    try{
        const { pageId: pageId1, itemsPerPage: itemsPerPage1, offset, limit, nom, prenom, e_mail } = req.query;
        const pageId = parseInt(pageId1) || 1;
        const itemsPerPage = parseInt(itemsPerPage1) || 10;
        
        const paginationData = await competitionService.getLimitedCompetitions({ offset, limit, titre, lieu, date, recompense, max_participants, }, pageId, itemsPerPage);
        const baseUri = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`

        let queryParams = "";
        queryParams += itemsPerPage ? `&itemsPerPage=${itemsPerPage}` : itemsPerPage1;
        queryParams += titre ? `&titre=${titre}` : "";
        queryParams += lieu ? `&lieu=${lieu}` : "";
        queryParams += date ? `&date=${date}` : "";
        queryParams += recompense ? `&recompense=${recompense}` : "";
        queryParams += max_participants ? `&max_participants=${max_participants}` : "";

        const previousUrl = pageId > 1 ? `${baseUri}?pageId=${pageId - 1}${queryParams}` : null;
        const nextUrl = paginationData.hasMore ? `${baseUri}?pageId=${pageId + 1}${queryParams}` : null;
        res.json({data: paginationData.competitions, count: paginationData.count, previousUrl, nextUrl});    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getCompetitionById(req, res) {
    try {
        const id = req.params.id;
        const competition = await competitionService.getCompetitionById(id);
        if(competition){
            res.json(competition);
        }
        else {
            res.json({"error": `competition ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function addAdminToCompetition(req, res) {
    try {
        const idCompetition = req.params.idCompetition;
        const idAdmin = req.params.idAdmin;
        const CompetitionAdmin = await adminService.addCompetitionToAdmin(idCompetition, idAdmin);
        const adminCompetition = await competitionService.addAdminToCompetition(idAdmin, idCompetition);
        res.json({CompetitionAdmin: CompetitionAdmin, adminCompetition: adminCompetition} );

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function addCommentaireCompetitionToCompetition(req, res){
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

async function addLocalisationToCompetition (req, res){
    try {
        const idCompetition = req.params.idCompetition;
        const idLocalisation = req.params.idLocalisation;
        const localisationCompetition = await localisationService.addCompetitionToLocalisation(idCompetition,idLocalisation);
        const competitionLocalisation = await competitionService.addLocalisationToCompetition(idLocalisation, idCompetition);
        res.json({localisationCompetition: localisationCompetition, competitionLocalisation: competitionLocalisation});
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
};

async function addCanardToCompetition (req, res){
    try {
        const idCompetition = req.params.idCompetition;
        const idCanard = req.params.idCanard;
        const competitionCanard = await canardService.addCompetitionToCanard(idCompetition, idCanard);
        const canardCompetition = await competitionService.addCanardToCompetition(idCanard, idCompetition);
        res.json({competitionCanard: competitionCanard,canardCompetition: canardCompetition} );
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function updateCompetition (req, res){
    try {
        const idCompetition = req.params.idCompetition;
        const competition = await competitionService.updateCompetition(idCompetition, req.body);
        res.json(competition);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


async function deleteCompetition (req, res){
    try {
        const idCompetition = req.params.idCompetition;
        const competition = await competitionService.deleteCompetition(idCompetition);
        res.json(competition);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { createCompetition, getAllCompetitions, getLimitedCompetitions, getCompetitionById, addAdminToCompetition, addCommentaireCompetitionToCompetition, addLocalisationToCompetition, addCanardToCompetition, updateCompetition, deleteCompetition, }