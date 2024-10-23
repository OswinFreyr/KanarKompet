const localisationService = require('../services/localisationService');

async function createLocalisation(req, res) {
    try {
        const localisation = await localisationService.createLocalisation(req.body);
        res.json(localisation);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getAllLocalisation(req, res) {
    try{
        const { latitude, longitude, } = req.query;
        const localisation = await localisationService.getAllLocalisations({ latitude, longitude, });
        res.json(localisation);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getLocalisationById(req, res) {
    try {
        const id = req.params.id;
        const localisation = await localisationService.getLocalisationById(id);
        if(localisation){
            res.json(localisation);
        }
        else {
            res.json({"error": `localisation ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};


async function addCompetitionToLocalisation (req, res){
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

module.exports = { createLocalisation, getAllLocalisation, getLocalisationById, addCompetitionToLocalisation, }