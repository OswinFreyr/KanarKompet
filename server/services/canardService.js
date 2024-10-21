const { Canard, Race, Commentaire, Competition, Localisation, Utilisateur } = require('../models/associations.js');

async function createCanard(canard) {
    return await Canard.create(canard);
}

async function getAllCanards(criterias = {}) {
    const where = {};
    const offset = 0;
    const limit = 10;
    if (criterias.nom) {
        where.nom = criterias.nom;
    }
    if (criterias.age) {
        where.age = criterias.age;
    }
    if (criterias.titre) {
        where.titre = criterias.titre;
    }
    if (criterias.genre) {
        where.genre = criterias.genre;
    }
    if (criterias.poids) {
        where.poids = criterias.poids;
    }
    if (criterias.vitesse_moy) {
        where.vitesse_moy = criterias.vitesse_moy;
    }
    if (criterias.vitesse_max) {
        where.vitesse_max = criterias.vitesse_max;
    }
    if (criterias.nb_participations) {
        where.nb_participations = criterias.nb_participations;
    }
    if (criterias.nb_victoires) {
        where.nb_victoires = criterias.nb_victoires;
    }
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const canards = await Canard.findAll({
        where,
        include: {
            model: Race,
            model: Commentaire,
            model: Competition,
            model: Utilisateur,
        },
        limit,
        offset
    });
    if (canards) {
        return canards;
    }
    else {
        return null;
    }
}

async function getLimitedCanards(criterias = {}, pageId, itemsPerPage) {
    const where = {};
    const offset = (pageId - 1) * itemsPerPage;
    if (criterias.genre) {
        where.genre = criterias.genre;
    }
    if (criterias.age) {
        where.age = criterias.age;
    }
    if (criterias.poids) {
        where.poids = criterias.poids;
    }
    if (criterias.vitesse_moy) {
        where.vitesse_moy = criterias.vitesse_moy;
    }
    if (criterias.vitesse_max) {
        where.vitesse_max = criterias.vitesse_max;
    }
    if (criterias.nb_participations) {
        where.nb_participations = criterias.nb_participations;
    }
    if (criterias.nb_victoires) {
        where.nb_victoires = criterias.nb_victoires;
    }
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
        const {count, rows} = await Canard.findAndCountAll({
            where,
            include: {
                model: Race,
                model: Commentaire,
                model: Competition,
                model: Utilisateur,
            },
            limit: itemsPerPage,
            offset,
        });
    return {
        canards: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function getCanardById(id) {
    const canard = await Canard.findByPk(id, {
        include: {
            model: Race,
            model: Commentaire,
            model: Competition,
            model: Utilisateur,
        }
    });
    if (canard) {
        return canard.toJSON();
    }
    else {
        return null;
    }
}

async function addRaceToCanard(idRace, canardId) {
    const canard = await Canard.findByPk(canardId);
    const isRace = await Race.findByPk(idRace)
    if (isRace) {
        // verifier si Canard et Race deja associés
        const isRaceCanard = await Canard.findAll({ where: { id: canardId }, include: { model: Race, where: { id: idRace } } });
        if (isRaceCanard.lenght > 0) {
            return null;
        }
        else {
            return canard.addRace(idRace);
        }
    }
}

async function addCommentaireToCanard(idCommentaire, canardId) {
    const canard = await Canard.findByPk(canardId);
    const isCommentaire = await Commentaire.findByPk(idCommentaire)
    if (isCommentaire) {
        // verifier si Canard et Commentaire deja associés
        const isCommentaireCanard = await Canard.findAll({ where: { id: canardId }, include: { model: Commentaire, where: { id: idCommentaire } } });
        if (isCommentaireCanard.lenght > 0) {
            return null;
        }
        else {
            return canard.addCommentaire(idCommentaire);
        }
    }
}

async function addUtilisateurToCanard(idUtilisateur, canardId) {
    const canard = await Canard.findByPk(canardId);
    const isUtilisateur = await Utilisateur.findByPk(idUtilisateur)
    if (isUtilisateur) {
        // verifier si Canard et Utilisateur deja associés
        const isUtilisateurCanard = await Canard.findAll({ where: { id: canardId }, include: { model: Utilisateur, where: { id: idUtilisateur } } });
        if (isUtilisateurCanard.lenght > 0) {
            return null;
        }
        else {
            return canard.addUtilisateur(idUtilisateur);
        }
    }
}

async function addCompetitionToCanard(idCompetition, canardId) {
    const canard = await Canard.findByPk(canardId);
    const isCompetition = await Competition.findByPk(idCompetition)
    if (isCompetition) {
        // verifier si Canard et Competition deja associés
        const isCompetitionCanard = await Canard.findAll({ where: { id: canardId }, include: { model: Competition, where: { id: idCompetition } } });
        if (isCompetitionCanard.lenght > 0) {
            return null;
        }
        else {
            return canard.addCompetition(idCompetition);
        }
    }
}

async function updateCanard(id) {

}

async function deleteCanard(id) {

}

async function createAllFestivals(festivals, regions, communes, disciplines, envergures, localisations, mois) {
    try {

        const tabFestivals = [];
        festivals.forEach(async festivalData => {
            const festivalMoisIds = [];
            festivalData.periode_mois?.forEach(el => {
                festivalMoisIds.push(mois[el])
            });

            tabFestivals.push({
                identifiant: festivalData.identifiant,
                nom: festivalData.nom_du_festival,
                site_internet: festivalData.site_internet_du_festival,
                e_mail: festivalData.adresse_e_mail,
                sous_categorie: festivalData.sous_categorie,
                regionId: regions[festivalData.region_principale_de_deroulement],
                communeId: communes[festivalData.commune_principale_de_deroulement],
                disciplineId: disciplines[festivalData.discipline_dominante],
                envergureId: envergures[festivalData.envergure_territoriale],
                localisationId: localisations[festivalData.geocodage_xy?.lat + "; " + festivalData.geocodage_xy?.lon],
                mois: festivalMoisIds
            })
        });

        festivals = await Festival.bulkCreate(tabFestivals, {ignoreDuplicates: true })

        for (const festival of festivals) {
            let moisList = tabFestivals.filter(el => el.identifiant === festival.identifiant)[0].mois
            await festival.addMois(moisList)
        }
        
        console.log('Tous les festivals ont été créés avec succès.');

    } catch (err) {
        console.error('Erreur lors de la création des festivals :', err);
    }
}

module.exports = { createCanard, getAllCanards, getLimitedCanards, getCanardById, addRaceToCanard, addCommentaireToCanard, addUtilisateurToCanard, addCompetitionToCanard, updateCanard, deleteCanard, createAllFestivals }