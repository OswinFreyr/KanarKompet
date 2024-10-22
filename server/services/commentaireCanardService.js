const { CommentaireCanard, Canard, Utilisateur, } = require('../models/associations.js');

async function createCommentaireCanard(commentaireCanard) {
    return await CommentaireCanard.create(commentaireCanard);
}

async function getAllCommentairesCanard(criterias = {}) {
    const where = {};
    const offset = 0;
    const limit = 10;
    if (criterias.note) {
        where.note = criterias.note;
    }
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const commentairesCanard = await CommentaireCanard.findAll({
        where,
        include: {
            model: Canard,
            model: Utilisateur,
        },
        limit,
        offset
    });
    if (commentairesCanard) {
        return commentairesCanard;
    }
    else {
        return null;
    }
}

async function getLimitedCommentairesCanard(criterias = {}, pageId, itemsPerPage) {
    const where = {};
    const offset = (pageId - 1) * itemsPerPage;
    if (criterias.note) {
        where.note = criterias.note;
    }
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const {count, rows} = await Commentaire.findAndCountAll({
        where,
        include: {
            model: Canard,
            model: Utilisateur,
        },
        limit: itemsPerPage,
        offset,
    });
    return {
        commentairesCanard: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function getCommentaireCanardById(id) {
    const commentaireCanard = await CommentaireCanard.findByPk(id, {
        include: {
            model: Canard,
            model: Utilisateur,
        }
    });
    if (commentaireCanard) {
        return commentaireCanard.toJSON();
    }
    else {
        return null;
    }
}

async function addCanardToCommentaireCanard(idCanard, commentaireCanardId) {
    const commentaireCanard = await CommentaireCanard.findByPk(commentaireCanardId);
    const isCanard = await Canard.findByPk(idCanard)
    if (isCanard) {
        // verifier si CommentaireCanard et Canard deja associés
        const isCanardCommentaireCanard = await CommentaireCanard.findAll({ where: { id: commentaireCanardId }, include: { model: Canard, where: { id: idCanard } } });
        if (isCanardCommentaireCanard.lenght > 0) {
            return null;
        }
        else {
            return commentaireCanard.addCanard(idCanard);
        }
    }
}

async function addUtilisateurToCommentaireCanard(idUtilisateur, commentaireCanardId) {
    const commentaireCanard = await CommentaireCanard.findByPk(commentaireCanardId);
    const isUtilisateur = await Utilisateur.findByPk(idUtilisateur)
    if (isUtilisateur) {
        // verifier si CommentaireCanard et Utilisateur deja associés
        const isUtilisateurCommentaireCanard = await CommentaireCanard.findAll({ where: { id: commentaireCanardId }, include: { model: Utilisateur, where: { id: idUtilisateur } } });
        if (isUtilisateurCommentaireCanard.lenght > 0) {
            return null;
        }
        else {
            return commentaireCanard.addUtilisateur(idUtilisateur);
        }
    }
}


async function deleteCommentaireCanard(commentaireCanardId) {
    const commentaireCanard = await CommentaireCanard.findByPk(commentaireCanardId);
    if (commentaireCanard) {
        return commentaireCanard.destroy();
    }
    else {
        return null;
    }
}

module.exports = { createCommentaireCanard, getAllCommentairesCanard, getLimitedCommentairesCanard, getCommentaireCanardById, addCanardToCommentaireCanard, addUtilisateurToCommentaireCanard, deleteCommentaireCanard, }