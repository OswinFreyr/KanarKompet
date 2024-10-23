const { Competition } = require('../models/associations.js');
const { Localisation } = require('../models/associations.js');

async function createLocalisation(localisation) {
    return await Localisation.create(localisation);
}

async function getAllLocalisations(criterias = {}) {
    const where = {}
    if (criterias.latitude) {
        where.latitude = criterias.latitude;
    }
    if (criterias.longitude) {
        where.longitude = criterias.longitude;
    }
    const localisations = await Localisation.findAll({
        where,
        include: {
            model: Competition,
        }
    });
    if(localisations) {
        return localisations;
    }
    else {
        return null;
    }
}

async function getLocalisationById(id) {
    const localisation = await Localisation.findByPk(id, {
        include: {
            model: Competition,
        }
    });
    if (localisation) {
        return localisation.toJSON();
    }
    else {
        return null;
    }
}

async function addCompetitionToLocalisation(idCompetitions, localisationId) {
    const localisation = await Localisation.findByPk(localisationId);
    const tabIdCompetitions = idCompetitions.ids
    tabIdCompetitions.forEach(async competitionId => {
        const isCompetition = await Competition.findByPk(competitionId)
        if (isCompetition) {
            // verifier si Competition et Localisation deja associés
            const isLocalisationCompetition = await Localisation.findAll({ where: { id: localisationId } , include: { model: Competition, where: { id: competitionId } } });
            if (isLocalisationCompetition.lenght > 0) {
                return null;
            }
            else {
                return localisation.addCompetition(competitionId);
            }
        }
    })
}

async function updateLocalisation(localisationId, updatedData) {
    const localisation = await Localisation.findByPk(localisationId);
    if (localisation) {
        if (updatedData.competitionIds && Array.isArray(updatedData.competitionIds)) {
            const competitions = await Competition.findAll({
                where: { id: updatedData.competitionIds }
            });
            await localisation.setCompetitions(competitions);
        }
        return localisation.update(updatedData);
    }
    else {
        return null;
    }
}

async function deleteLocalisation(localisationId) {
    const localisation = await Localisation.findByPk(localisationId);
    if (localisation) {
        return localisation.destroy();
    }
    else {
        return null;
    }
}

module.exports = { createLocalisation, getAllLocalisations, addCompetitionToLocalisation, getLocalisationById, updateLocalisation, deleteLocalisation, }