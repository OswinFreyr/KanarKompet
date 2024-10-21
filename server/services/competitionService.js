const { Canard, Race, Commentaire, Competition, Localisation, Utilisateur, Admin } = require('../models/associations.js');

async function createCompetition(competition) {
    return await Competition.create(competition);
}

async function getAllCompetitions(criterias = {}) {
    const where = {};
    const offset = 0;
    const limit = 10;
    if (criterias.titre) {
        where.titre = criterias.titre;
    }
    if (criterias.lieu) {
        where.lieu = criterias.lieu;
    }
    if (criterias.date) {
        where.date = criterias.date;
    }
    if (criterias.recompense) {
        where.recompense = criterias.recompense;
    }
    if (criterias.max_participants) {
        where.max_participants = criterias.max_participants;
    }
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const competitions = await Competition.findAll({
        where,
        include: {
            model: Race,
            model: Commentaire,
            model: Canard,
            model: Utilisateur,
        },
        limit,
        offset
    });
    if (competitions) {
        return competitions;
    }
    else {
        return null;
    }
}

async function getLimitedCanards(criterias = {}, pageId, itemsPerPage) {
    const where = {};
    const offset = (pageId - 1) * itemsPerPage;
    if (criterias.titre) {
        where.titre = criterias.titre;
    }
    if (criterias.lieu) {
        where.lieu = criterias.lieu;
    }
    if (criterias.date) {
        where.date = criterias.date;
    }
    if (criterias.recompense) {
        where.recompense = criterias.recompense;
    }
    if (criterias.max_participants) {
        where.max_participants = criterias.max_participants;
    }
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const {count, rows} = await Competition.findAndCountAll({
        where,
        include: {
            model: Race,
            model: Commentaire,
            model: Canard,
            model: Utilisateur,
        },
        limit: itemsPerPage,
        offset,
    });
    return {
        competitions: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function getCompetitionById(id) {
    const competition = await Competition.findByPk(id, {
        include: {
            model: Race,
            model: Commentaire,
            model: Canard,
            model: Utilisateur,
        }
    });
    if (competition) {
        return competition.toJSON();
    }
    else {
        return null;
    }
}

async function addAdminToCompetition(idAdmin, competitionId) {
    const competition = await Competition.findByPk(competitionId);
    const isAdmin = await Admin.findByPk(idAdmin)
    if (isAdmin) {
        // verifier si Competition et Admin deja associés
        const isAdminCompetition = await Competition.findAll({ where: { id: competitionId }, include: { model: Admin, where: { id: idAdmin } } });
        if (isAdminCompetition.lenght > 0) {
            return null;
        }
        else {
            return competition.addAdmin(idAdmin);
        }
    }
}

async function addCommentaireToCompetition(idCommentaire, competitionId) {
    const competition = await Competition.findByPk(competitionId);
    const isCommentaire = await Commentaire.findByPk(idCommentaire)
    if (isCommentaire) {
        // verifier si Competition et Commentaire deja associés
        const isCommentaireCompetition = await Competition.findAll({ where: { id: competitionId }, include: { model: Commentaire, where: { id: idCommentaire } } });
        if (isCommentaireCompetition.lenght > 0) {
            return null;
        }
        else {
            return competition.addCommentaire(idCommentaire);
        }
    }
}

async function addLocalisationToCompetition(idLocalisation, competitionId) {
    const competition = await Competition.findByPk(competitionId);
    const isLocalisation = await Localisation.findByPk(idLocalisation)
    if (isLocalisation) {
        // verifier si Competition et Localisation deja associés
        const isLocalisationCompetition = await Competition.findAll({ where: { id: competitionId }, include: { model: Localisation, where: { id: idLocalisation } } });
        if (isLocalisationCompetition.lenght > 0) {
            return null;
        }
        else {
            return competition.addLocalisation(idLocalisation);
        }
    }
}

async function addUtilisateurToCompetition(idUtilisateur, competitionId) {
    const competition = await Competition.findByPk(competitionId);
    const isUtilisateur = await Utilisateur.findByPk(idUtilisateur)
    if (isUtilisateur) {
        // verifier si Utilisateur et Competition deja associés
        const isUtilisateurCompetition = await Competition.findAll({ where: { id: competitionId }, include: { model: Utilisateur, where: { id: idUtilisateur } } });
        if (isUtilisateurCompetition.lenght > 0) {
            return null;
        }
        else {
            return competition.addUtilisateur(idUtilisateur);
        }
    }
}

async function addCanardToCompetition(idCanard, competitionId) {
    const competition = await Competition.findByPk(competitionId);
    const isCanard = await Canard.findByPk(idCanard)
    if (isCanard) {
        // verifier si Canard et Competition deja associés
        const isCanardCompetition = await Competition.findAll({ where: { id: competitionId }, include: { model: Canard, where: { id: idCanard } } });
        if (isCanardCompetition.lenght > 0) {
            return null;
        }
        else {
            return competition.addCanard(idCanard);
        }
    }
}

async function updateCompetition(id) {

}

async function deleteCompetition(id) {

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

module.exports = { createCompetition, getAllCompetitions, getLimitedCanards, getCompetitionById, addAdminToCompetition, addCommentaireToCompetition, addUtilisateurToCompetition, addCanardToCompetition, addLocalisationToCompetition, updateCompetition, deleteCompetition, createAllFestivals }