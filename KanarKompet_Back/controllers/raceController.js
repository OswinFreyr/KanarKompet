const raceService = require('../services/raceService');
const canardService = require('../services/canardService');


async function createRace(req, res) {
    try {
        const race = await raceService.createRace(req.body);
        res.json(race);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getAllRaces(req, res) {
    try{
        const { offset, limit, nom, origine} = req.query;
        const races = await raceService.getAllRaces({ offset, limit, nom, origine});
        res.json(races);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getLimitedRaces(req, res) {
    try{
        const { pageId: pageId1, itemsPerPage: itemsPerPage1, offset, limit, nom, origine } = req.query;
        const pageId = parseInt(pageId1) || 1;
        const itemsPerPage = parseInt(itemsPerPage1) || 10;
        
        const paginationData = await raceService.getLimitedRaces({ offset, limit, nom, origine }, pageId, itemsPerPage);
        const baseUri = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`

        let queryParams = "";
        queryParams += itemsPerPage ? `&itemsPerPage=${itemsPerPage}` : itemsPerPage1;
        queryParams += nom ? `&nom=${nom}` : "";
        queryParams += origine ? `&origine=${origine}` : "";

        const previousUrl = pageId > 1 ? `${baseUri}?pageId=${pageId - 1}${queryParams}` : null;
        const nextUrl = paginationData.hasMore ? `${baseUri}?pageId=${pageId + 1}${queryParams}` : null;
        res.json({data: paginationData.races, count: paginationData.count, previousUrl, nextUrl});    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getRaceById(req, res) {
    try {
        const id = req.params.id;
        const race = await raceService.getRaceById(id);
        if(race){
            res.json(race);
        }
        else {
            res.json({"error": `race ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function addCanardToRace(req, res){
    try {
        const idCanard = req.params.idCanard;
        const idRace = req.params.idRace;
        const canardRace = await raceService.addCanardToRace(idCanard, idRace);
        res.json({ canardRace: canardRace, });
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}


async function updateRace (req, res){
    try {
        const idRace = req.params.idRace;
        const race = await raceService.updateRace(idRace, req.body);
        res.json(race);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


async function deleteRace (req, res){
    try {
        const idRace = req.params.idRace;
        const race = await raceService.deleteRace(idRace);
        res.json(race);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {createRace, updateRace, deleteRace, getAllRaces, getRaceById, addCanardToRace,getLimitedRaces}