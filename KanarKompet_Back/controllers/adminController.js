const adminService = require('../services/adminService');
const competitionService = require('../services/competitionService');
const commentaireCompetitionService = require('../services/commentaireCompetitionService');

async function createAdmin(req, res) {
    try {
        const admin = await adminService.createAdmin(req.body);
        res.json(admin);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getAllAdmins(req, res) {
    try{
        const { offset, limit, nom, prenom, e_mail} = req.query;
        const admins = await adminService.getAllAdmins({ offset, limit, nom, prenom, e_mail});
        res.json(admins);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getLimitedAdmins(req, res) {
    try{
        const { pageId: pageId1, itemsPerPage: itemsPerPage1, offset, limit, nom, prenom, e_mail } = req.query;
        const pageId = parseInt(pageId1) || 1;
        const itemsPerPage = parseInt(itemsPerPage1) || 10;
        
        const paginationData = await adminService.getLimitedAdmins({ offset, limit, nom, prenom, e_mail }, pageId, itemsPerPage);
        const baseUri = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`

        let queryParams = "";
        queryParams += itemsPerPage ? `&itemsPerPage=${itemsPerPage}` : itemsPerPage1;
        queryParams += nom ? `&nom=${nom}` : "";
        queryParams += prenom ? `&prenom=${prenom}` : "";
        queryParams += e_mail ? `&e_mail=${e_mail}` : "";

        const previousUrl = pageId > 1 ? `${baseUri}?pageId=${pageId - 1}${queryParams}` : null;
        const nextUrl = paginationData.hasMore ? `${baseUri}?pageId=${pageId + 1}${queryParams}` : null;
        res.json({data: paginationData.admins, count: paginationData.count, previousUrl, nextUrl});    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getAdminById(req, res) {
    try {
        const id = req.params.id;
        const admin = await adminService.getAdminById(id);
        if(admin){
            res.json(admin);
        }
        else {
            res.json({"error": `admin ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};


async function addCommentaireCompetitionToAdmin(req, res){
    try {
        const idAdmin = req.params.idAdmin;
        const idCommentaireCompetition = req.params.idCommentaireCompetition;
        const commentaireCompetitionAdmin = await adminService.addCommentaireCompetitionToAdmin(idCommentaireCompetition, idAdmin);
        res.json({ commentaireCompetitionAdmin: commentaireCompetitionAdmin, });
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function addCompetitionToAdmin(req, res){
    try {
        const idCompetition = req.params.idCompetition;
        const idAdmin = req.params.idAdmin;
        const competitionAdmin = await adminService.addCompetitionToAdmin(idCompetition, idAdmin);
        res.json({ competitionAdmin: competitionAdmin, });
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function updateAdmin (req, res){
    try {
        const idAdmin = req.params.idAdmin;
        const admin = await adminService.updateAdmin(idAdmin, req.body);
        res.json(admin);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


module.exports = {createAdmin, getAllAdmins,getLimitedAdmins,getAdminById,addCommentaireCompetitionToAdmin,addCompetitionToAdmin,updateAdmin, }