const { Canard, CommentaireCompetition, Competition, Localisation, Utilisateur, Admin } = require('../models/associations.js');

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
            model: Admin,
            model: CommentaireCompetition,
            model: Canard,
            model: Utilisateur,
            model: Localisation,
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

async function getLimitedCompetitions(criterias = {}, pageId, itemsPerPage) {
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
            model: Admin,
            model: CommentaireCompetition,
            model: Canard,
            model: Utilisateur,
            model: Localisation,
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
            model: Admin,
            model: CommentaireCompetition,
            model: Canard,
            model: Utilisateur,
            model: Localisation,
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

async function addCommentaireCompetitionToCompetition(idCommentaireCompetition, competitionId) {
    const competition = await Competition.findByPk(competitionId);
    const isCommentaireCompetition = await CommentaireCompetition.findByPk(idCommentaireCompetition)
    if (isCommentaireCompetition) {
        // verifier si Competition et CommentaireCompetition deja associés
        const isCommentaireCompetitionCompetition = await Competition.findAll({ where: { id: competitionId }, include: { model: CommentaireCompetition, where: { id: idCommentaireCompetition } } });
        if (isCommentaireCompetitionCompetition.lenght > 0) {
            return null;
        }
        else {
            return competition.addCommentaireCompetition(idCommentaireCompetition);
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

async function updateCompetition(competitionId, updatedData) {
    const competition = await Competition.findByPk(competitionId);
    if (competition) {
        if (updatedData.adminId) {
            const admin = await Admin.findByPk(updatedData.adminId);
            if (admin) {
                await competition.setAdmin(admin);
            } else {
                return { success: false, message: "Admin not found" };
            }
        }

        if (updatedData.localisationId) {
            const localisation = await Localisation.findByPk(updatedData.localisationId);
            if (localisation) {
                await competition.setLocalisation(localisation);
            } else {
                return { success: false, message: "Localisation not found" };
            }
        }

        if (updatedData.commentaireCompetitionIds && Array.isArray(updatedData.commentaireCompetitionIds)) {
            const commentairesCompetition = await CommentaireCompetition.findAll({
                where: { id: updatedData.commentaireCompetitionIds }
            });
            await competition.setCommentaireCompetitions(commentairesCompetition);
        }

        if (updatedData.canardIds && Array.isArray(updatedData.canardIds)) {
            const canards = await Canard.findAll({
                where: { id: updatedData.canardIds }
            });
            await competition.setCanards(canards);
        }
        return competition.update(updatedData);
    }
    else {
        return null;
    }
}

async function deleteCompetition(competitionId) {
    const competition = await Competition.findByPk(competitionId);
    if (competition) {
        return competition.destroy();
    }
    else {
        return null;
    }
}


module.exports = { createCompetition, getAllCompetitions, getLimitedCompetitions, getCompetitionById, addAdminToCompetition, addCommentaireCompetitionToCompetition, addUtilisateurToCompetition, addCanardToCompetition, addLocalisationToCompetition, updateCompetition, deleteCompetition, }