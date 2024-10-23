const { Canard } = require('../models/associations.js');
const { Race } = require('../models/associations.js');

async function createRace(race) {
    return await Race.create(race);
}

async function getAllRaces(criterias = {}) {
    const where = {}
    const offset = 0;
    const limit = 10;
    if (criterias.nom) {
        where.nom = criterias.nom;
    }
    if (criterias.origine) {
        where.origine = criterias.origine;
    }
    const races = await Race.findAll({
        where,
        include: {
            model: Canard,
        },
        limit,
        offset
    });
    if(races) {
        return races;
    }
    else {
        return null;
    }
}

async function getLimitedRaces(criterias = {}, pageId, itemsPerPage) {
    const where = {};
    const offset = (pageId - 1) * itemsPerPage;
    if (criterias.nom) {
        where.nom = criterias.nom;
    }
    if (criterias.origine) {
        where.origine = criterias.origine;
    }
    const {count, rows} = await Commentaire.findAndCountAll({
        where,
        include: {
            model: Canard,
        },
        limit: itemsPerPage,
        offset,
    });
    return {
        races: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function getRaceById(id) {
    const race = await Race.findByPk(id, {
        include: {
            model: Canard,
        }
    });
    if (race) {
        return race.toJSON();
    }
    else {
        return null;
    }
}

async function addCanardToRace(idCanards, raceId) {
    const race = await Race.findByPk(raceId);
    const tabIdCanards = idCanards.ids
    tabIdCanards.forEach(async CanardId => {
        const isCanard = await Canard.findByPk(CanardId)
        if (isCanard) {
            // verifier si Canard et Race deja associés
            const isRaceCanard = await Race.findAll({ where: { id: raceId } , include: { model: Canard, where: { id: CanardId } } });
            if (isRaceCanard.lenght > 0) {
                return null;
            }
            else {
                return race.addCanard(CanardId);
            }
        }
    })
}

async function updateRace(raceId, updatedData) {
    const race = await Race.findByPk(raceId);
    if (race) {
        if (updatedData.canardIds && Array.isArray(updatedData.canardIds)) {
            const canards = await Canard.findAll({
                where: { id: updatedData.canardIds }
            });
            await race.setCanards(canards); // Updates related ducks
        }
        return race.update(updatedData);
    }
    else {
        return null;
    }
}

async function deleteRace(raceId) {
    const race = await Race.findByPk(raceId);
    if (race) {
        return race.destroy();
    }
    else {
        return null;
    }
}


module.exports = { createRace, getAllRaces, addCanardToRace, getRaceById, updateRace, deleteRace,getLimitedRaces }