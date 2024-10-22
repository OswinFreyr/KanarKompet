const { Utilisateur, Canard, CommentaireCanard, CommentaireCompetition } = require('../models/associations.js');

async function createUtilisateur(utilisateur) {
    return await Utilisateur.create(utilisateur);
}

async function getAllUtilisateurs(criterias = {}) {
    const where = {};
    const offset = 0;
    const limit = 10;
    if (criterias.nom) {
        where.nom = criterias.nom;
    }
    if (criterias.prenom) {
        where.prenom = criterias.prenom;
    }
    if (criterias.e_mail) {
        where.e_mail = criterias.e_mail;
    }
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const utilisateurs = await Utilisateur.findAll({
        where,
        include: {
            model: CommentaireCanard,
            model: CommentaireCompetition,
            model: Canard,
        },
        limit,
        offset
    });
    if (utilisateurs) {
        return utilisateurs;
    }
    else {
        return null;
    }
}

async function getLimitedUtilisateurs(criterias = {}, pageId, itemsPerPage) {
    const where = {};
    const offset = (pageId - 1) * itemsPerPage;
    if (criterias.nom) {
        where.nom = criterias.nom;
    }
    if (criterias.prenom) {
        where.prenom = criterias.prenom;
    }
    if (criterias.e_mail) {
        where.e_mail = criterias.e_mail;
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
            model: CommentaireCanard,
            model: CommentaireCompetition,
            model: Canard,
        },
        limit: itemsPerPage,
        offset,
    });
    return {
        utilisateurs: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function getUtilisateurById(id) {
    const utilisateur = await utilisateur.findByPk(id, {
        include: {
            model: CommentaireCanard,
            model: Canard,
            model: Competition,
        }
    });
    if (utilisateur) {
        return utilisateur.toJSON();
    }
    else {
        return null;
    }
}

async function addCanardToUtilisateur(idCanard, utilisateurId) {
    const utilisateur = await Utilisateur.findByPk(utilisateurId);
    const isCanard = await Canard.findByPk(idCanard)
    if (isCanard) {
        // verifier si Utilisateur et Canard deja associés
        const isCanardUtilisateur = await Utilisateur.findAll({ where: { id: utilisateurId }, include: { model: Canard, where: { id: idCanard } } });
        if (isCanardUtilisateur.lenght > 0) {
            return null;
        }
        else {
            return utilisateur.addCanard(idCanard);
        }
    }
}

async function addCommentaireCanardToUtilisateur(idCommentaireCanard, utilisateurId) {
    const utilisateur = await Utilisateur.findByPk(utilisateurId);
    const isCommentaireCanard = await CommentaireCanard.findByPk(idCommentaireCanard)
    if (isCommentaireCanard) {
        // verifier si Utilisateur et CommentaireCanard deja associés
        const isCommentaireCanardUtilisateur = await Utilisateur.findAll({ where: { id: utilisateurId }, include: { model: CommentaireCanard, where: { id: idCommentaireCanard } } });
        if (isCommentaireCanardUtilisateur.lenght > 0) {
            return null;
        }
        else {
            return utilisateur.addCommentaireCanard(idCommentaireCanard);
        }
    }
}

async function addCommentaireCompetitionToUtilisateur(idCommentaireCompetition, utilisateurId) {
    const utilisateur = await Utilisateur.findByPk(utilisateurId);
    const isCommentaireCompetition = await CommentaireCompetition.findByPk(idCommentaireCompetition)
    if (isCommentaireCompetition) {
        // verifier si Utilisateur et CommentaireCompetition deja associés
        const isCommentaireCompetitionUtilisateur = await Utilisateur.findAll({ where: { id: utilisateurId }, include: { model: CommentaireCompetition, where: { id: idCommentaireCompetition } } });
        if (isCommentaireCompetitionUtilisateur.lenght > 0) {
            return null;
        }
        else {
            return utilisateur.addCommentaireCompetition(idCommentaireCompetition);
        }
    }
}

async function updateUtilisateur(id) {

}

async function deleteUtilisateur(id) {

}


module.exports = { createUtilisateur, getAllUtilisateurs, getLimitedUtilisateurs, getUtilisateurById, addCanardToUtilisateur, addCommentaireCanardToUtilisateur, addCommentaireCompetitionToUtilisateur, updateUtilisateur, deleteUtilisateur }