const { Canard } = require('../models/associations.js');
const { Race } = require('../models/associations.js');

async function createRace(Race) {
    return await Race.create(Race);
}

async function getAllRaces(criterias = {}) {
    const where = {}
    if (criterias.nom) {
        where.nom = criterias.nom;
    }
    if (criterias.origine) {
        where.origine = criterias.origine;
    }
    const Races = await Race.findAll({
        where,
        include: {
            model: Canard,
        }
    });
    if(Races) {
        return Races;
    }
    else {
        return null;
    }
}

async function getRaceById(id) {
    const Race = await Race.findByPk(id, {
        include: {
            model: Canard,
        }
    });
    if (Race) {
        return Race.toJSON();
    }
    else {
        return null;
    }
}

async function addCanardToRace(idCanards, RaceId) {
    const Race = await Race.findByPk(RaceId);
    const tabIdCanards = idCanards.ids
    tabIdCanards.forEach(async CanardId => {
        const isCanard = await Canard.findByPk(CanardId)
        if (isCanard) {
            // verifier si Canard et Race deja associés
            const isRaceCanard = await Race.findAll({ where: { id: RaceId } , include: { model: Canard, where: { id: CanardId } } });
            if (isRaceCanard.lenght > 0) {
                return null;
            }
            else {
                return Race.addCanard(CanardId);
            }
        }
    })
}

async function updateRace(id) {

}

async function deleteRace(id) {

}


module.exports = { createRace, getAllRaces, addCanardToRace, getRaceById, }