const canardService = require('../services/canardService');
const commentaireCanardService = require('../services/commentaireCanardService');
const utilisateurService = require('../services/utilisateurService');
const competitionService = require('../services/competitionService');

async function createCanard(req, res) {
    try {
        const canard = await canardService.createCanard(req.body);
        res.json(canard);
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function getAllCanards(query) {
    try {
        const { offset, limit, nom, age, titre, genre, poids, vitesse_moy, vitesse_max, nb_participations, nb_victoires } = query;
        const canards = await canardService.getAllCanards({ offset, limit, nom, age, titre, genre, poids, vitesse_moy, vitesse_max, nb_participations, nb_victoires });
        return {
            code: 200,
            data: canards,
        };
    }
    catch (err) {
        return {
            code: 500,
            data: err.message,
        }
    }
};

async function getLimitedCanards(req, res) {
    try {
        const { pageId: pageId1, itemsPerPage: itemsPerPage1, offset, limit, nom, age, titre, genre, poids, vitesse_moy, vitesse_max, nb_participations, nb_victoires } = req.query;
        const pageId = parseInt(pageId1) || 1;
        const itemsPerPage = parseInt(itemsPerPage1) || 10;

        const paginationData = await canardService.getLimitedCanards({ offset, limit, nom, age, titre, genre, poids, vitesse_moy, vitesse_max, nb_participations, nb_victoires }, pageId, itemsPerPage);
        const baseUri = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`

        let queryParams = "";
        queryParams += itemsPerPage ? `&itemsPerPage=${itemsPerPage}` : itemsPerPage1;
        queryParams += genre ? `&genre=${genre}` : "";
        queryParams += nom ? `&nom=${nom}` : "";
        queryParams += titre ? `&titre=${titre}` : "";
        queryParams += age ? `&age=${age}` : "";
        queryParams += poids ? `&poids=${poids}` : "";
        queryParams += vitesse_moy ? `&vitesse_moy=${vitesse_moy}` : "";
        queryParams += vitesse_max ? `&vitesse_max=${vitesse_max}` : "";
        queryParams += nb_participations ? `&nb_participations=${nb_participations}` : "";
        queryParams += nb_victoires ? `&nb_victoires=${nb_victoires}` : "";

        const previousUrl = pageId > 1 ? `${baseUri}?pageId=${pageId - 1}${queryParams}` : null;
        const nextUrl = paginationData.hasMore ? `${baseUri}?pageId=${pageId + 1}${queryParams}` : null;
        res.json({ data: paginationData.canards, count: paginationData.count, previousUrl, nextUrl });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

async function getCanardById(req, res) {
    const id = req.params.id;
    const canard = await canardService.getCanardById(id);
    if (canard) {
        res.json(canard);
    }
    else {
        res.json({ "error": `canard ${id} not found :(` });
    }
}
};

async function addRaceToCanard(req, res) {
    try {
        const idCanard = req.params.idCanard;
        const idRace = req.params.idRace;
        const raceCanard = await canardService.addRaceToCanard(idRace, idCanard);
        const canardRace = await raceService.addCanardToRace(idCanard, idRace);
        res.json({ canardRace: canardRace, raceCanard: raceCanard });

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function addCommentaireCanardToCanard(req, res) {
    try {
        const idCanard = req.params.idCanard;
        const idCommentaireCanard = req.params.idCommentaireCanard;
        const commentaireCanardCanard = await canardService.addCommentaireCanardToCanard(idCommentaireCanard, idCanard);
        const canardCommentaireCanard = await commentaireCanardService.addCanardToCommentaireCanard(idCanard, idCommentaireCanard);
        res.json({ commentaireCanardCanard: commentaireCanardCanard, canardCommentaireCanard: canardCommentaireCanard });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function addUtilisateurToCanard(req, res) {
    try {
        const idUtilisateur = req.params.idUtilisateur;
        const idCanard = req.params.idCanard;
        const utilisateurCanard = await canardService.addUtilisateurToCanard(idUtilisateur, idCanard);
        const canardUtilisateur = await utilisateurService.addCanardToUtilisateur(idCanard, idUtilisateur);
        res.json({ utilisateurCanard: utilisateurCanard, canardUtilisateur: canardUtilisateur });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function addCompetitionToCanard(req, res) {
    try {
        const idCompetition = req.params.idCompetition;
        const idCanard = req.params.idCanard;
        const competitionCanard = await canardService.addCompetitionToCanard(idCompetition, idCanard);
        const canardCompetition = await competitionService.addCanardToCompetition(idCanard, idCompetition);
        res.json({ competitionCanard: competitionCanard, canardCompetition: canardCompetition });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function updateCanard(req, res) {
    try {
        const idCanard = req.params.idCanard;
        const canard = await canardService.updateCanard(idCanard, req.body);
        res.json(canard);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


async function deleteCanard(req, res) {
    try {
        const idCanard = req.params.idCanard;
        const canard = await canardService.deleteCanard(idCanard);
        res.json(canard);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createCanard, updateCanard, deleteCanard, getAllCanards, getCanardById, addCompetitionToCanard, addUtilisateurToCanard, addCommentaireCanardToCanard, addRaceToCanard, getLimitedCanards }