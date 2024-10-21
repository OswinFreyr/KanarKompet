const { Utilisateur, Competition, Canard, Commentaire } = require('../models/associations.js');

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
            model: Commentaire,
            model: Canard,
            model: Competition,
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
            model: Commentaire,
            model: Canard,
            model: Competition,
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
            model: Commentaire,
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

async function addCommentaireToUtilisateur(idCommentaire, utilisateurId) {
    const utilisateur = await Utilisateur.findByPk(utilisateurId);
    const isCommentaire = await Commentaire.findByPk(idCommentaire)
    if (isCommentaire) {
        // verifier si Utilisateur et Commentaire deja associés
        const isCommentaireUtilisateur = await Utilisateur.findAll({ where: { id: utilisateurId }, include: { model: Commentaire, where: { id: idCommentaire } } });
        if (isCommentaireUtilisateur.lenght > 0) {
            return null;
        }
        else {
            return utilisateur.addCommentaire(idCommentaire);
        }
    }
}

async function addCompetitionToUtilisateur(idCompetition, utilisateurId) {
    const utilisateur = await Utilisateur.findByPk(utilisateurId);
    const isCompetition = await Competition.findByPk(idCompetition)
    if (isCompetition) {
        // verifier si Utilisateur et Competition deja associés
        const isCompetitionUtilisateur = await Utilisateur.findAll({ where: { id: utilisateurId }, include: { model: Competition, where: { id: idCompetition } } });
        if (isCompetitionUtilisateur.lenght > 0) {
            return null;
        }
        else {
            return utilisateur.addCompetition(idCompetition);
        }
    }
}

async function updateUtilisateur(id) {

}

async function deleteUtilisateur(id) {

}


module.exports = { createUtilisateur, getAllUtilisateurs, getLimitedUtilisateurs, getUtilisateurById, addCanardToUtilisateur, addCommentaireToUtilisateur, addCompetitionToUtilisateur, updateUtilisateur, deleteUtilisateur }