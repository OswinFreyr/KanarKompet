const { CommentaireCompetition, Canard, Utilisateur, Competition, Admin } = require('../models/associations.js');

async function createCommentaireCompetition(commentaireCompetition) {
    return await CommentaireCompetition.create(commentaireCompetition);
}

async function getAllCommentairesCompetition(criterias = {}) {
    const where = {};
    const offset = 0;
    const limit = 10;
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const commentairesCompetition = await CommentaireCompetition.findAll({
        where,
        include: {
            model: Utilisateur,
            model: Competition,
            model: Admin,
        },
        limit,
        offset
    });
    if (commentairesCompetition) {
        return commentairesCompetition;
    }
    else {
        return null;
    }
}

async function getLimitedCommentairesCompetition(criterias = {}, pageId, itemsPerPage) {
    const where = {};
    const offset = (pageId - 1) * itemsPerPage;
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const {count, rows} = await CommentaireCompetition.findAndCountAll({
        where,
        include: {
            model: Utilisateur,
            model: Competition,
            model: Admin,
        },
        limit: itemsPerPage,
        offset,
    });
    return {
        commentairesCompetition: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function getCommentaireCompetitionById(id) {
    const commentaireCompetition = await CommentaireCompetition.findByPk(id, {
        include: {
            model: Utilisateur,
            model: Competition,
            model: Admin,
        }
    });
    if (commentaireCompetition) {
        return commentaireCompetition.toJSON();
    }
    else {
        return null;
    }
}

async function addUtilisateurToCommentaireCompetition(idUtilisateur, CommentaireCompetitionId) {
    const commentaireCompetition = await CommentaireCompetition.findByPk(CommentaireCompetitionId);
    const isUtilisateur = await Utilisateur.findByPk(idUtilisateur)
    if (isUtilisateur) {
        // verifier si CommentaireCompetition et Utilisateur deja associés
        const isUtilisateurCommentaireCompetition = await CommentaireCompetition.findAll({ where: { id: CommentaireCompetitionId }, include: { model: Utilisateur, where: { id: idUtilisateur } } });
        if (isUtilisateurCommentaireCompetition.lenght > 0) {
            return null;
        }
        else {
            return commentaireCompetition.addUtilisateur(idUtilisateur);
        }
    }
}

async function addCompetitionToCommentaireCompetition(idCompetition, CommentaireCompetitionId) {
    const commentaireCompetition = await CommentaireCompetition.findByPk(CommentaireCompetitionId);
    const isCompetition = await Competition.findByPk(idCompetition)
    if (isCompetition) {
        // verifier si CommentaireCompetition et Competition deja associés
        const isCompetitionCommentaireCompetition = await CommentaireCompetition.findAll({ where: { id: CommentaireCompetitionId }, include: { model: Competition, where: { id: idCompetition } } });
        if (isCompetitionCommentaireCompetition.lenght > 0) {
            return null;
        }
        else {
            return commentaireCompetition.addCompetition(idCompetition);
        }
    }
}

async function addAdminToCommentaireCompetition(idAdmin, CommentaireCompetitionId) {
    const commentaireCompetition = await CommentaireCompetition.findByPk(CommentaireCompetitionId);
    const isAdmin = await Admin.findByPk(idAdmin)
    if (isAdmin) {
        // verifier si CommentaireCompetition et Admin deja associés
        const isAdminCommentaireCompetition = await CommentaireCompetition.findAll({ where: { id: CommentaireCompetitionId }, include: { model: Admin, where: { id: idAdmin } } });
        if (isAdminCommentaireCompetition.lenght > 0) {
            return null;
        }
        else {
            return commentaireCompetition.addAdmin(idAdmin);
        }
    }
}

async function deleteCommentaireCompetition(commentaireCompetitionId) {
    const commentaireCompetition = await CommentaireCompetition.findByPk(commentaireCompetitionId);
    if (commentaireCompetition) {
        return commentaireCompetition.destroy();
    }
    else {
        return null;
    }
}



module.exports = { createCommentaireCompetition, getAllCommentairesCompetition, getLimitedCommentairesCompetition, getCommentaireCompetitionById, addUtilisateurToCommentaireCompetition, addCompetitionToCommentaireCompetition, addAdminToCommentaireCompetition, deleteCommentaireCompetition, }